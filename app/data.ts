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

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// تابعی برای دریافت لیست خدمات به صورت ساختار درختی
export async function getServices(): Promise<ServiceWithSubServices[]> {
  noStore()

  // Return mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning mock services data")
    return [
      {
        id: 1,
        name: "خدمات منزل",
        sub_services: [
          { id: 11, name: "تعمیرات لوازم خانگی", description: null, parent_id: 1 },
          { id: 12, name: "نظافت منزل", description: null, parent_id: 1 },
        ],
      },
      {
        id: 2,
        name: "خدمات آموزشی",
        sub_services: [
          { id: 21, name: "تدریس خصوصی", description: null, parent_id: 2 },
          { id: 22, name: "آموزش زبان", description: null, parent_id: 2 },
        ],
      },
    ]
  }

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

    return rootServices
  } catch (error) {
    console.error("Failed to fetch services:", error)
    // Return mock data as fallback
    return [
      {
        id: 1,
        name: "خدمات منزل",
        sub_services: [
          { id: 11, name: "تعمیرات لوازم خانگی", description: null, parent_id: 1 },
          { id: 12, name: "نظافت منزل", description: null, parent_id: 1 },
        ],
      },
      {
        id: 2,
        name: "خدمات آموزشی",
        sub_services: [
          { id: 21, name: "تدریس خصوصی", description: null, parent_id: 2 },
          { id: 22, name: "آموزش زبان", description: null, parent_id: 2 },
        ],
      },
    ]
  }
}

// تابعی برای دریافت لیست تمام شهرها و استان‌ها
export async function getLocations(): Promise<Location[]> {
  noStore()

  // Return mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning mock locations data")
    return [
      { id: 1, province: "تهران", city: "تهران" },
      { id: 2, province: "تهران", city: "کرج" },
      { id: 3, province: "اصفهان", city: "اصفهان" },
      { id: 4, province: "فارس", city: "شیراز" },
    ]
  }

  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("locations").select("*").order("province")

    if (error) {
      console.error("Database Error (getLocations):", error)
      throw new Error("خطا در دریافت لیست شهرها.")
    }

    return (data as Location[]) || []
  } catch (error) {
    console.error("Failed to fetch locations:", error)
    // Return mock data as fallback
    return [
      { id: 1, province: "تهران", city: "تهران" },
      { id: 2, province: "تهران", city: "کرج" },
      { id: 3, province: "اصفهان", city: "اصفهان" },
      { id: 4, province: "فارس", city: "شیراز" },
    ]
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

  // Return mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning mock providers data")
    return [
      {
        id: "1",
        first_name: "احمد",
        last_name: "محمدی",
        avatar_url: null,
        service_name: "تعمیرات لوازم خانگی",
        city: "تهران",
        province: "تهران",
        avg_rating: 4.5,
        rating_count: 23,
        is_sponsored: true,
      },
      {
        id: "2",
        first_name: "فاطمه",
        last_name: "احمدی",
        avatar_url: null,
        service_name: "نظافت منزل",
        city: "تهران",
        province: "تهران",
        avg_rating: 4.8,
        rating_count: 45,
        is_sponsored: false,
      },
    ]
  }

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

    return (data as ProviderSearchResult[]) || []
  } catch (error) {
    console.error("Failed to search providers:", error)
    // Return mock data as fallback
    return [
      {
        id: "1",
        first_name: "احمد",
        last_name: "محمدی",
        avatar_url: null,
        service_name: "تعمیرات لوازم خانگی",
        city: "تهران",
        province: "تهران",
        avg_rating: 4.5,
        rating_count: 23,
        is_sponsored: true,
      },
      {
        id: "2",
        first_name: "فاطمه",
        last_name: "احمدی",
        avatar_url: null,
        service_name: "نظافت منزل",
        city: "تهران",
        province: "تهران",
        avg_rating: 4.8,
        rating_count: 45,
        is_sponsored: false,
      },
    ]
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

  // Return mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning mock provider profile data")
    return {
      profile: {
        id: id,
        first_name: "احمد",
        last_name: "محمدی",
        email: "ahmad@example.com",
        phone_number: "09123456789",
        is_provider: true,
        avatar_url: null,
        created_at: new Date().toISOString(),
      },
      details: {
        bio: "متخصص تعمیرات لوازم خانگی با ۱۰ سال سابقه",
        iban: null,
        is_sponsored: true,
        sponsored_expires_at: null,
      },
      services: [{ id: 11, name: "تعمیرات لوازم خانگی" }],
      locations: [{ id: 1, city: "تهران", province: "تهران" }],
      ratings: {
        avg_rating: 4.5,
        rating_count: 23,
      },
    }
  }

  try {
    const supabase = createClient()
    const { data, error } = await supabase.rpc("get_provider_details", {
      provider_id_input: id,
    })

    if (error) {
      console.error("RPC Error fetching provider details:", error)
      return null
    }

    return data as ProviderProfileDetails
  } catch (error) {
    console.error("Failed to fetch provider profile:", error)
    return null
  }
}
