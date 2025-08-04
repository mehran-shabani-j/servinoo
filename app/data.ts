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

// تابعی برای دریافت لیست خدمات به صورت ساختار درختی
export async function getServices(): Promise<ServiceWithSubServices[]> {
  noStore()

  const supabase = createClient()
  const { data, error } = await supabase.from("services").select("*").order("id")

  if (error) {
    console.error("Database Error (getServices):", error)
    throw new Error("Failed to fetch services")
  }

  const services: Service[] = data || []
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

  return rootServices
}

// تابعی برای دریافت لیست تمام شهرها و استان‌ها
export async function getLocations(): Promise<Location[]> {
  noStore()

  const supabase = createClient()
  const { data, error } = await supabase.from("locations").select("*").order("province")

  if (error) {
    console.error("Database Error (getLocations):", error)
    throw new Error("Failed to fetch locations")
  }

  return (data as Location[]) || []
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
export async function searchProviders(
  serviceId?: string,
  locationId?: string,
  query?: string,
): Promise<ProviderSearchResult[]> {
  noStore()

  const supabase = createClient()

  const { data, error } = await supabase.rpc("search_providers", {
    p_service_id: serviceId || null,
    p_location_id: locationId || null,
    p_search_query: query || null,
  })

  if (error) {
    console.error("Database Error (searchProviders):", error)
    throw new Error("Failed to search providers")
  }

  return data || []
}

export async function getProviderById(id: string) {
  noStore()

  const supabase = createClient()

  const { data, error } = await supabase.rpc("get_provider_details", { provider_id: id }).single()

  if (error) {
    console.error("Database Error (getProviderById):", error)
    throw new Error("Failed to fetch provider details")
  }

  return data
}

export async function getProvidersByService(serviceId: string) {
  noStore()

  const supabase = createClient()

  const { data, error } = await supabase
    .from("providers")
    .select(`
      *,
      services!inner(id, name),
      locations(id, name)
    `)
    .eq("services.id", serviceId)
    .eq("is_active", true)
    .order("rating", { ascending: false })

  if (error) {
    console.error("Database Error (getProvidersByService):", error)
    throw new Error("Failed to fetch providers by service")
  }

  return data || []
}
