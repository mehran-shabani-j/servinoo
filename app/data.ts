// Mock data for v0 environment - no database connection needed

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

export interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  avatar_url: string | null
  is_provider: boolean
}

// Mock services data
const mockServices: ServiceWithSubServices[] = [
  {
    id: 1,
    name: "تعمیرات لوازم خانگی",
    sub_services: [
      { id: 11, name: "تعمیر یخچال و فریزر", description: null, parent_id: 1 },
      { id: 12, name: "تعمیر ماشین لباسشویی و ظرفشویی", description: null, parent_id: 1 },
      { id: 13, name: "تعمیر تلویزیون و سیستم صوتی", description: null, parent_id: 1 },
      { id: 14, name: "تعمیر کولر گازی و اسپلیت", description: null, parent_id: 1 },
      { id: 15, name: "تعمیر اجاق گاز و فر", description: null, parent_id: 1 },
      { id: 16, name: "تعمیر جاروبرقی و مایکروویو", description: null, parent_id: 1 },
    ],
  },
  {
    id: 2,
    name: "خدمات نظافتی",
    sub_services: [
      { id: 21, name: "نظافت منزل و راه‌پله", description: null, parent_id: 2 },
      { id: 22, name: "قالیشویی و مبل‌شویی در محل", description: null, parent_id: 2 },
      { id: 23, name: "نماشویی ساختمان", description: null, parent_id: 2 },
    ],
  },
  {
    id: 3,
    name: "خدمات ساختمانی و تاسیسات",
    sub_services: [
      { id: 31, name: "لوله‌کشی آب و فاضلاب", description: null, parent_id: 3 },
      { id: 32, name: "برق‌کاری و سیم‌کشی", description: null, parent_id: 3 },
      { id: 33, name: "نقاشی ساختمان", description: null, parent_id: 3 },
      { id: 34, name: "کلیدسازی و قفل", description: null, parent_id: 3 },
      { id: 35, name: "نصب و تعمیر پکیج و آبگرمکن", description: null, parent_id: 3 },
    ],
  },
  {
    id: 4,
    name: "خدمات دیجیتال و کامپیوتر",
    sub_services: [
      { id: 41, name: "تعمیر کامپیوتر و لپ‌تاپ", description: null, parent_id: 4 },
      { id: 42, name: "تعمیر موبایل و تبلت", description: null, parent_id: 4 },
      { id: 43, name: "نصب ویندوز و نرم‌افزار", description: null, parent_id: 4 },
    ],
  },
  {
    id: 5,
    name: "خدمات مراقبتی و سلامتی",
    sub_services: [
      { id: 51, name: "پرستار سالمند در منزل", description: null, parent_id: 5 },
      { id: 52, name: "پرستار کودک در منزل", description: null, parent_id: 5 },
      { id: 53, name: "فیزیوتراپی در منزل", description: null, parent_id: 5 },
    ],
  },
  {
    id: 6,
    name: "خدمات خودرو",
    sub_services: [
      { id: 61, name: "تعمیر خودرو در محل", description: null, parent_id: 6 },
      { id: 62, name: "باتری سازی سیار", description: null, parent_id: 6 },
      { id: 63, name: "یدک‌کش و امداد خودرو", description: null, parent_id: 6 },
    ],
  },
  {
    id: 7,
    name: "خدمات باغبانی و فضای سبز",
    sub_services: [
      { id: 71, name: "باغبانی و نگهداری گیاهان", description: null, parent_id: 7 },
      { id: 72, name: "طراحی و اجرای فضای سبز", description: null, parent_id: 7 },
      { id: 73, name: "هرس درختان", description: null, parent_id: 7 },
    ],
  },
]

// Mock locations data
const mockLocations: Location[] = [
  { id: 1, province: "تهران", city: "تهران" },
  { id: 2, province: "اصفهان", city: "اصفهان" },
  { id: 3, province: "فارس", city: "شیراز" },
  { id: 4, province: "خراسان رضوی", city: "مشهد" },
  { id: 5, province: "آذربایجان شرقی", city: "تبریز" },
  { id: 6, province: "خوزستان", city: "اهواز" },
  { id: 7, province: "البرز", city: "کرج" },
  { id: 8, province: "گیلان", city: "رشت" },
  { id: 9, province: "مازندران", city: "ساری" },
  { id: 10, province: "کرمان", city: "کرمان" },
  { id: 11, province: "یزد", city: "یزد" },
  { id: 12, province: "سمنان", city: "سمنان" },
  { id: 13, province: "قم", city: "قم" },
  { id: 14, province: "مرکزی", city: "اراک" },
  { id: 15, province: "قزوین", city: "قزوین" },
  { id: 16, province: "گلستان", city: "گرگان" },
  { id: 17, province: "کردستان", city: "سنندج" },
  { id: 18, province: "همدان", city: "همدان" },
  { id: 19, province: "زنجان", city: "زنجان" },
  { id: 20, province: "لرستان", city: "خرم‌آباد" },
]

// تابعی برای دریافت لیست خدمات به صورت ساختار درختی
export async function getServices(): Promise<ServiceWithSubServices[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockServices
}

// تابعی برای دریافت لیست تمام شهرها و استان‌ها
export async function getLocations(): Promise<Location[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockLocations
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

// Mock providers data
const mockProviders: ProviderSearchResult[] = [
  {
    id: "1",
    first_name: "احمد",
    last_name: "محمدی",
    avatar_url: "/placeholder.svg?height=100&width=100&text=احمد",
    service_name: "تعمیر یخچال و فریزر",
    city: "تهران",
    province: "تهران",
    avg_rating: 4.8,
    rating_count: 127,
    is_sponsored: true,
  },
  {
    id: "2",
    first_name: "فاطمه",
    last_name: "احمدی",
    avatar_url: "/placeholder.svg?height=100&width=100&text=فاطمه",
    service_name: "نظافت منزل و راه‌پله",
    city: "تهران",
    province: "تهران",
    avg_rating: 4.9,
    rating_count: 89,
    is_sponsored: false,
  },
  {
    id: "3",
    first_name: "علی",
    last_name: "رضایی",
    avatar_url: "/placeholder.svg?height=100&width=100&text=علی",
    service_name: "برق‌کاری و سیم‌کشی",
    city: "اصفهان",
    province: "اصفهان",
    avg_rating: 4.7,
    rating_count: 156,
    is_sponsored: false,
  },
  {
    id: "4",
    first_name: "مریم",
    last_name: "کریمی",
    avatar_url: "/placeholder.svg?height=100&width=100&text=مریم",
    service_name: "تعمیر کامپیوتر و لپ‌تاپ",
    city: "شیراز",
    province: "فارس",
    avg_rating: 4.6,
    rating_count: 203,
    is_sponsored: true,
  },
  {
    id: "5",
    first_name: "حسن",
    last_name: "موسوی",
    avatar_url: "/placeholder.svg?height=100&width=100&text=حسن",
    service_name: "لوله‌کشی آب و فاضلاب",
    city: "مشهد",
    province: "خراسان رضوی",
    avg_rating: 4.5,
    rating_count: 78,
    is_sponsored: false,
  },
  {
    id: "6",
    first_name: "زهرا",
    last_name: "حسینی",
    avatar_url: "/placeholder.svg?height=100&width=100&text=زهرا",
    service_name: "پرستار سالمند در منزل",
    city: "تبریز",
    province: "آذربایجان شرقی",
    avg_rating: 4.9,
    rating_count: 145,
    is_sponsored: false,
  },
]

// تابعی برای جستجوی متخصصان با فیلترهای خاص
export async function searchProviders(
  serviceId?: string,
  locationId?: string,
  query?: string,
): Promise<ProviderSearchResult[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredProviders = [...mockProviders]

  // Filter by service
  if (serviceId) {
    const serviceIdNum = Number.parseInt(serviceId)
    // Find the service name
    let serviceName = ""
    for (const service of mockServices) {
      const subService = service.sub_services.find((sub) => sub.id === serviceIdNum)
      if (subService) {
        serviceName = subService.name
        break
      }
    }
    if (serviceName) {
      filteredProviders = filteredProviders.filter((p) => p.service_name === serviceName)
    }
  }

  // Filter by location
  if (locationId) {
    const locationIdNum = Number.parseInt(locationId)
    const location = mockLocations.find((loc) => loc.id === locationIdNum)
    if (location) {
      filteredProviders = filteredProviders.filter((p) => p.city === location.city)
    }
  }

  // Filter by search query
  if (query) {
    const searchTerm = query.toLowerCase()
    filteredProviders = filteredProviders.filter(
      (p) =>
        p.first_name.toLowerCase().includes(searchTerm) ||
        p.last_name.toLowerCase().includes(searchTerm) ||
        p.service_name.toLowerCase().includes(searchTerm),
    )
  }

  // Sort by sponsored first, then by rating
  return filteredProviders.sort((a, b) => {
    if (a.is_sponsored && !b.is_sponsored) return -1
    if (!a.is_sponsored && b.is_sponsored) return 1
    return b.avg_rating - a.avg_rating
  })
}

export async function getProviderProfile(id: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const provider = mockProviders.find((p) => p.id === id)
  if (!provider) {
    return null
  }

  return {
    profile: {
      id: provider.id,
      first_name: provider.first_name,
      last_name: provider.last_name,
      avatar_url: provider.avatar_url,
      is_provider: true,
    },
    details: {
      bio: `متخصص ${provider.service_name} با بیش از 5 سال تجربه در این زمینه. ارائه خدمات با کیفیت و قیمت مناسب در ${provider.city}.`,
      iban: null,
      is_sponsored: provider.is_sponsored,
      sponsored_expires_at: null,
    },
    services: [
      {
        id: 1,
        name: provider.service_name,
      },
    ],
    locations: [
      {
        id: 1,
        city: provider.city,
        province: provider.province,
      },
    ],
    ratings: {
      avg_rating: provider.avg_rating,
      rating_count: provider.rating_count,
    },
  }
}

export async function getProviderById(id: string) {
  return getProviderProfile(id)
}

export async function getProvidersByService(serviceId: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockProviders.filter((provider) => {
    // Simple mock filtering - in real app this would be more sophisticated
    return true
  })
}

import { createClient } from "@/lib/supabase/server"

export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profileData, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching profile:", error.message)
    // Fallback to auth user data if profile doesn't exist yet
    return {
      id: user.id,
      email: user.email || null,
      first_name: null,
      last_name: null,
      avatar_url: null,
      is_provider: false,
    }
  }

  return {
    ...profileData,
    email: user.email || null,
  }
}
