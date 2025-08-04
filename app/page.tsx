import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { LandingSearchForm } from "@/components/landing-search-form"
import { getServices, getLocations } from "./data"

export default async function Home() {
  // این خط باعث می‌شود که loading.tsx نمایش داده شود تا داده‌ها بارگذاری شوند
  const [services, locations] = await Promise.all([getServices(), getLocations()])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">سرویسو</h1>
            </div>
            <nav className="flex space-x-8 space-x-reverse">
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                ورود
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600">
                ثبت نام
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">بهترین متخصصان را پیدا کنید</h2>
          <p className="text-xl mb-8">پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران</p>

          <LandingSearchForm services={services} locations={locations} />
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">خدمات محبوب</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  خدمات منزل
                  <Badge variant="secondary">120+ متخصص</Badge>
                </CardTitle>
                <CardDescription>تعمیرات، نظافت، باغبانی و سایر خدمات منزل</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/search?service=home">مشاهده متخصصان</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  خدمات آموزشی
                  <Badge variant="secondary">85+ مدرس</Badge>
                </CardTitle>
                <CardDescription>تدریس خصوصی، آموزش زبان، موسیقی و هنر</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/search?service=education">مشاهده مدرسان</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  خدمات پزشکی
                  <Badge variant="secondary">45+ متخصص</Badge>
                </CardTitle>
                <CardDescription>پرستاری، فیزیوتراپی و مراقبت در منزل</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/search?service=medical">مشاهده متخصصان</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">متخصصان برتر</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "احمد محمدی",
                service: "تعمیرات لوازم خانگی",
                location: "تهران",
                rating: 4.9,
                reviews: 127,
                image: "/placeholder-user.jpg",
              },
              {
                name: "فاطمه احمدی",
                service: "نظافت منزل",
                location: "تهران",
                rating: 4.8,
                reviews: 89,
                image: "/placeholder-user.jpg",
              },
              {
                name: "علی رضایی",
                service: "تدریس ریاضی",
                location: "اصفهان",
                rating: 4.7,
                reviews: 156,
                image: "/placeholder-user.jpg",
              },
              {
                name: "مریم کریمی",
                service: "آموزش زبان انگلیسی",
                location: "شیراز",
                rating: 4.9,
                reviews: 203,
                image: "/placeholder-user.jpg",
              },
            ].map((provider, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h4 className="font-semibold text-lg mb-2">{provider.name}</h4>
                  <p className="text-gray-600 mb-2">{provider.service}</p>
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 ml-1" />
                    <span className="text-sm text-gray-600">{provider.location}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <span className="text-sm text-gray-600 mr-1">({provider.reviews})</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">سرویسو</h4>
              <p className="text-gray-300">پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">خدمات</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/search?service=home" className="hover:text-white">
                    خدمات منزل
                  </Link>
                </li>
                <li>
                  <Link href="/search?service=education" className="hover:text-white">
                    خدمات آموزشی
                  </Link>
                </li>
                <li>
                  <Link href="/search?service=medical" className="hover:text-white">
                    خدمات پزشکی
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">شرکت</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    شرایط استفاده
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">تماس با ما</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 ml-2" />
                  <span>021-12345678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 ml-2" />
                  <span>info@servinoo.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 1403 سرویسو. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
