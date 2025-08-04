import { createClient } from "@/lib/supabase/server"
import { unstable_noStore as noStore } from "next/cache"

// تعریف نوع داده‌ها برای استفاده در کامپوننت‌ها
export type Service = {
  id: number
  name: string
  description: string | null
  parent_id: number | null
}

export type ServiceWithSubServices = {
  id: number
  name: string
  sub_services: Service[]
}

export type Location = {
  id: number
  province: string
  city: string
}

// Define a consistent response type for all data fetching functions
type DataResponse<T> = {
  data: T | null
  error: string | null
}

// تابعی برای دریافت لیست خدمات به صورت ساختار درختی
export async function getServices(): Promise<DataResponse<ServiceWithSubServices[]>> {
  noStore()
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("services").select("*")

    if (error) {
      console.error("Database Error (getServices):", error)
      throw new Error("خطا در دریافت لیست خدمات.")
    }

    const services: Service[] = data || []
    const serviceMap = new Map<number, ServiceWithSubServices>()
    const rootServices: ServiceWithSubServices[] = []

    services.forEach((service) => {
      serviceMap.set(service.id, { id: service.id, name: service.name, sub_services: [] })
    })

    services.forEach((service) => {
      if (service.parent_id) {
        const parent = serviceMap.get(service.parent_id)
        const currentService = serviceMap.get(service.id)
        if (parent && currentService) {
          const subServiceToAdd: Service = {
            id: currentService.id,
            name: currentService.name,
            description: null,
            parent_id: service.parent_id,
          }
          parent.sub_services.push(subServiceToAdd)
        }
      } else {
        const rootService = serviceMap.get(service.id)
        if (rootService) {
          rootServices.push(rootService)
        }
      }
    })

    return { data: rootServices, error: null }
  } catch (e) {
    const error = e as Error
    console.error("Caught Exception in getServices:", error.message)
    return { data: null, error: error.message }
  }
}

// تابعی برای دریافت لیست تمام شهرها و استان‌ها
export async function getLocations(): Promise<DataResponse<Location[]>> {
  noStore()
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("locations").select("*").order("province")

    if (error) {
      console.error("Database Error (getLocations):", error)
      throw new Error("خطا در دریافت لیست شهرها.")
    }

    return { data: (data as Location[]) || [], error: null }
  } catch (e) {
    const error = e as Error
    console.error("Caught Exception in getLocations:", error.message)
    return { data: null, error: error.message }
  }
}

// نوع جستجوی متخصصان
export type ProviderSearchResult = {
  id: string
  first_name: string
  last_name: string
  avatar_url: string | null
  service_name: string
  city: string
  province: string
  avg_rating: number
  rating_count: number
  is_sponsored: boolean
}

// تابعی برای جستجوی متخصصان با فیلترهای خاص
export async function getProviders(filters: {
  serviceId?: number
  locationId?: number
}): Promise<DataResponse<ProviderSearchResult[]>> {
  noStore()
  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("search_providers", {
      service_id_filter: filters.serviceId || null,
      location_id_filter: filters.locationId || null,
    })

    if (error) {
      console.error("RPC Error (getProviders):", error)
      throw new Error("خطا در جستجوی متخصصان.")
    }

    return { data: (data as ProviderSearchResult[]) || [], error: null }
  } catch (e) {
    const error = e as Error
    console.error("Caught Exception in getProviders:", error.message)
    return { data: null, error: error.message }
  }
}

// نوع Profile
export type Profile = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  phone_number: string | null
  is_provider: boolean | null
  avatar_url: string | null
  created_at: string
}

// نوع جزئیات پروفایل متخصص
export type ProviderProfileDetails = {
  profile: Profile
  details: {
    bio: string | null
    iban: string | null
    is_sponsored: boolean
    sponsored_expires_at: string | null
  } | null
  services: { id: number; name: string }[]
  locations: { id: number; city: string; province: string }[]
  ratings: {
    avg_rating: number
    rating_count: number
  }
}

// تابع جدید برای دریافت اطلاعات کامل پروفایل یک متخصص
export async function getProviderProfile(id: string): Promise<DataResponse<ProviderProfileDetails>> {
  noStore()
  try {
    const supabase = createClient()
    const { data, error } = await supabase.rpc("get_provider_details", {
      provider_id_input: id,
    })

    if (error) {
      console.error("RPC Error fetching provider details:", error)
      return { data: null, error: "متخصص مورد نظر یافت نشد." }
    }

    return { data: data as ProviderProfileDetails, error: null }
  } catch (e) {
    const error = e as Error
    console.error("Caught Exception in getProviderProfile:", error.message)
    return { data: null, error: error.message }
  }
}
