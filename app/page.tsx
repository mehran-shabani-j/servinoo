import { getServices, getLocations } from "@/app/data"
import { LandingSearchForm } from "@/components/landing-search-form"

export default async function HomePage() {
  let services = []
  let locations = []

  try {
    services = await getServices()
    locations = await getLocations()
  } catch (error) {
    console.error("Error loading data:", error)
    // Data functions now have fallbacks, so this shouldn't happen
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">سرویس‌نو</h1>
          <p className="text-xl text-gray-600 mb-8">پلتفرم جامع ارائه خدمات محلی</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            بهترین متخصصان محلی را برای انجام کارهای روزمره‌تان پیدا کنید. از تعمیرات منزل تا آموزش و خدمات پزشکی.
          </p>
        </div>

        <LandingSearchForm services={services} locations={locations} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">جستجوی آسان</h3>
              <p className="text-gray-600">متخصصان مورد نیازتان را به راحتی پیدا کنید</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">کیفیت تضمینی</h3>
              <p className="text-gray-600">تمام متخصصان بررسی و تأیید شده‌اند</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">سرویس سریع</h3>
              <p className="text-gray-600">دریافت خدمات در کمترین زمان ممکن</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
