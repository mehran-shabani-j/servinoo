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

// تابعی برای تست اتصال به دیتابیس
export async function testConnection() {
  try {
    const supabase = createClient()
    console.log("Testing database connection...")

    const { data, error } = await supabase.from("services").select("count", { count: "exact", head: true })

    if (error) {
      console.error("Connection test failed:", error)
      return false
    }

    console.log("Connection test successful, services count:", data)
    return true
  } catch (error) {
    console.error("Connection test error:", error)
    return false
  }
}

// تابعی برای دریافت لیست خدمات به صورت ساختار درختی
export async function getServices(): Promise<ServiceWithSubServices[]> {
  noStore()

  console.log("Fetching services from database...")

  try {
    const supabase = createClient()

    // ابتدا تست کنیم که آیا جدول services وجود دارد
    const { data: tableExists } = await supabase.from("services").select("id").limit(1)

    console.log("Services table check result:", tableExists)

    const { data, error } = await supabase.from("services").select("*").order("id")

    if (error) {
      console.error("Database Error (getServices):", error)
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      throw new Error(`خطا در دریافت لیست خدمات: ${error.message}`)
    }

    console.log("Raw services data:", data)

    const services: Service[] = data || []

    if (services.length === 0) {
      console.warn("No services found in database")
      return []
    }

    const serviceMap = new Map<number, ServiceWithSubServices>()
    const rootServices: ServiceWithSubServices[] = []

    // ابتدا همه سرویس‌ها را در map قرار می‌دهیم
    services.forEach((service) => {
      serviceMap.set(service.id, {
        id: service.id,
        name: service.name,
        sub_services: [],
      })
    })

    // سپس روابط والد-فرزند را برقرار می‌کنیم
    services.forEach((service) => {
      if (service.parent_id) {
        const parent = serviceMap.get(service.parent_id)
        const currentService = serviceMap.get(service.id)
        if (parent && currentService) {
          const subServiceToAdd: Service = {
            id: currentService.id,
            name: currentService.name,
            description: service.description,
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

    console.log("Processed services:", rootServices)
    return rootServices
  } catch (error) {
    console.error("Failed to fetch services:", error)
    throw error
  }
}

// تابعی برای دریافت لیست تمام شهرها و استان‌ها
export async function getLocations(): Promise<Location[]> {
  noStore()

  console.log("Fetching locations from database...")

  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("locations").select("*").order("province")

    if (error) {
      console.error("Database Error (getLocations):", error)
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      throw new Error(`خطا در دریافت لیست شهرها: ${error.message}`)
    }

    console.log("Raw locations data:", data)
    return (data as Location[]) || []
  } catch (error) {
    console.error("Failed to fetch locations:", error)
    throw error
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
}): Promise<ProviderSearchResult[]> {
  noStore()

  console.log("Searching providers with filters:", filters)

  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("search_providers", {
      service_id_filter: filters.serviceId || null,
      location_id_filter: filters.locationId || null,
    })

    if (error) {
      console.error("RPC Error (getProviders):", error)
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      throw new Error(`خطا در جستجوی متخصصان: ${error.message}`)
    }

    console.log("Providers search result:", data)
    return (data as ProviderSearchResult[]) || []
  } catch (error) {
    console.error("Failed to search providers:", error)
    throw error
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
export async function getProviderProfile(id: string): Promise<ProviderProfileDetails | null> {
  noStore()

  console.log("Fetching provider profile for ID:", id)

  try {
    const supabase = createClient()
    const { data, error } = await supabase.rpc("get_provider_details", {
      provider_id_input: id,
    })

    if (error) {
      console.error("RPC Error fetching provider details:", error)
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      return null
    }

    console.log("Provider profile result:", data)
    return data as ProviderProfileDetails
  } catch (error) {
    console.error("Failed to fetch provider profile:", error)
    return null
  }
}
