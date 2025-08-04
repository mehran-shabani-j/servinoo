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

// Mock data for fallback when database is not available
const mockServices: ServiceWithSubServices[] = [
  {
    id: 1,
    name: "خدمات منزل",
    sub_services: [
      { id: 11, name: "تعمیرات لوازم خانگی", description: null, parent_id: 1 },
      { id: 12, name: "نظافت منزل", description: null, parent_id: 1 },
      { id: 13, name: "باغبانی", description: null, parent_id: 1 },
    ],
  },
  {
    id: 2,
    name: "خدمات آموزشی",
    sub_services: [
      { id: 21, name: "تدریس خصوصی", description: null, parent_id: 2 },
      { id: 22, name: "آموزش زبان", description: null, parent_id: 2 },
      { id: 23, name: "آموزش موسیقی", description: null, parent_id: 2 },
    ],
  },
  {
    id: 3,
    name: "خدمات پزشکی",
    sub_services: [
      { id: 31, name: "پرستاری", description: null, parent_id: 3 },
      { id: 32, name: "فیزیوتراپی", description: null, parent_id: 3 },
    ],
  },
]

const mockLocations: Location[] = [
  { id: 1, province: "تهران", city: "تهران" },
  { id: 2, province: "تهران", city: "کرج" },
  { id: 3, province: "تهران", city: "ورامین" },
  { id: 4, province: "اصفهان", city: "اصفهان" },
  { id: 5, province: "اصفهان", city: "کاشان" },
  { id: 6, province: "فارس", city: "شیراز" },
  { id: 7, province: "فارس", city: "مرودشت" },
  { id: 8, province: "خراسان رضوی", city: "مشهد" },
]

// تابعی برای دریافت لیست خدمات به صورت ساختار درختی
export async function getServices(): Promise<ServiceWithSubServices[]> {
  noStore()

  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("services").select("*")

    if (error) {
      console.error("Database Error (getServices):", error)
      console.warn("Falling back to mock data")
      return mockServices
    }

    const services: Service[] = data || []

    if (services.length === 0) {
      console.warn("No services found in database, using mock data")
      return mockServices
    }

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

    return rootServices.length > 0 ? rootServices : mockServices
  } catch (error) {
    console.error("Failed to fetch services:", error)
    console.warn("Falling back to mock data")
    return mockServices
  }
}

// تابعی برای دریافت لیست تمام شهرها و استان‌ها
export async function getLocations(): Promise<Location[]> {
  noStore()

  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("locations").select("*").order("province")

    if (error) {
      console.error("Database Error (getLocations):", error)
      console.warn("Falling back to mock data")
      return mockLocations
    }

    return (data as Location[]) || mockLocations
  } catch (error) {
    console.error("Failed to fetch locations:", error)
    console.warn("Falling back to mock data")
    return mockLocations
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

const mockProviders: ProviderSearchResult[] = [
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
  {
    id: "3",
    first_name: "علی",
    last_name: "رضایی",
    avatar_url: null,
    service_name: "تدریس خصوصی",
    city: "اصفهان",
    province: "اصفهان",
    avg_rating: 4.2,
    rating_count: 18,
    is_sponsored: false,
  },
  {
    id: "4",
    first_name: "مریم",
    last_name: "کریمی",
    avatar_url: null,
    service_name: "آموزش زبان",
    city: "شیراز",
    province: "فارس",
    avg_rating: 4.9,
    rating_count: 67,
    is_sponsored: true,
  },
]

// تابعی برای جستجوی متخصصان با فیلترهای خاص
export async function getProviders(filters: {
  serviceId?: number
  locationId?: number
}): Promise<ProviderSearchResult[]> {
  noStore()

  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("search_providers", {
      service_id_filter: filters.serviceId || null,
      location_id_filter: filters.locationId || null,
    })

    if (error) {
      console.error("RPC Error (getProviders):", error)
      console.warn("Falling back to mock data")
      return mockProviders
    }

    return (data as ProviderSearchResult[]) || mockProviders
  } catch (error) {
    console.error("Failed to search providers:", error)
    console.warn("Falling back to mock data")
    return mockProviders
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
