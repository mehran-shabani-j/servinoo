import { Button } from "@/components/ui/button"
import { Wrench, SprayCan, Stethoscope } from "lucide-react"
import Link from "next/link"
import { getServices, getLocations } from "./data"
import { LandingSearchForm } from "@/components/landing-search-form"

export default async function LandingPage() {
  const services = await getServices()
  const locations = await getLocations()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">سروینو</h1>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/search">جستجوی خدمات</Link>
          </Button>
          <Button asChild>
            <Link href="/login">ورود / ثبت‌نام</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <section className="w-full max-w-4xl py-12 md:py-24">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            بهترین ارائه‌دهندگان خدمات محلی را پیدا کنید
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            از تعمیرات و نظافت تا خدمات پرستاری، با متخصصان معتمد شهر خود در ارتباط باشید.
          </p>
          <LandingSearchForm services={services} locations={locations} />
        </section>

        <section className="w-full bg-white py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-center text-gray-800">خدمات محبوب</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <Wrench className="h-12 w-12 text-blue-500" />
                <h4 className="mt-4 text-lg font-semibold">تعمیرات منزل</h4>
                <p className="mt-2 text-gray-600">خدمات لوله‌کشی، برق‌کاری و تعمیرات عمومی.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <SprayCan className="h-12 w-12 text-green-500" />
                <h4 className="mt-4 text-lg font-semibold">خدمات نظافت</h4>
                <p className="mt-2 text-gray-600">متخصصان نظافت منازل و شرکت‌ها.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <Stethoscope className="h-12 w-12 text-red-500" />
                <h4 className="mt-4 text-lg font-semibold">مراقبت در منزل</h4>
                <p className="mt-2 text-gray-600">پرستاران و مراقبان تایید شده برای پشتیبانی در منزل.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 سروینو. تمام حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  )
}
