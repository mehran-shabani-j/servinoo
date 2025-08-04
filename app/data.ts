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
export async function getServices() {
  noStore() // جلوگیری از کش شدن داده‌ها برای اطمینان از به‌روز بودن
  const supabase = createClient()
  const { data, error } = await supabase.from("services").select("*")

  if (error) {
    console.error("Database Error:", error)
    throw new Error("خطا در دریافت لیست خدمات.")
  }

  const services: Service[] = data || []
  const serviceMap = new Map<number, ServiceWithSubServices>()
  const rootServices: ServiceWithSubServices[] = []

  // ابتدا تمام خدمات را به نقشه اضافه می‌کنیم
  services.forEach((service) => {
    serviceMap.set(service.id, { id: service.id, name: service.name, sub_services: [] })
  })

  // حالا ساختار درختی را می‌سازیم
  services.forEach((service) => {
    if (service.parent_id) {
      const parent = serviceMap.get(service.parent_id)
      const currentService = serviceMap.get(service.id)
      if (parent && currentService) {
        // چون sub_services فقط شامل Service است، فقط آبجکت اصلی را پوش میکنیم
        const subServiceToAdd: Service = {
          id: currentService.id,
          name: currentService.name,
          description: null, // این فیلدها در اینجا لازم نیستند
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
export async function getLocations() {
  noStore()
  const supabase = createClient()
  const { data, error } = await supabase.from("locations").select("*").order("province")

  if (error) {
    console.error("Database Error:", error)
    throw new Error("خطا در دریافت لیست شهرها.")
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
export async function getProviders(filters: { serviceId?: number; locationId?: number }) {
  noStore()
  const supabase = createClient()

  const { data, error } = await supabase.rpc("search_providers", {
    service_id_filter: filters.serviceId || null,
    location_id_filter: filters.locationId || null,
  })

  if (error) {
    console.error("RPC Error:", error)
    throw new Error("خطا در جستجوی متخصصان.")
  }

  return (data as ProviderSearchResult[]) || []
}
