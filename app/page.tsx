import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, ArrowLeft, Sparkles, Users, Shield } from "lucide-react"
import Link from "next/link"
import { LandingSearchForm } from "@/components/landing-search-form"
import { getServices, getLocations } from "./data"

export default async function Home() {
  // این خط باعث می‌شود که loading.tsx نمایش داده شود تا داده‌ها بارگذاری شوند
  const [services, locations] = await Promise.all([getServices(), getLocations()])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                سرویسو
              </h1>
              <Sparkles className="w-6 h-6 text-primary mr-2" />
            </div>
            <nav className="flex space-x-6 space-x-reverse">
              <Link 
                href="/login" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                ورود
              </Link>
              <Link 
                href="/register"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all duration-200 hover-lift font-medium"
              >
                ثبت نام
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative gradient-primary text-white py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              بهترین متخصصان را
              <br />
              <span className="text-white/90">پیدا کنید</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران
              <br />
              <span className="text-lg">سریع، مطمئن و با کیفیت</span>
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-12 animate-slide-up">
              <div className="text-center">
                <div className="text-3xl font-bold">250+</div>
                <div className="text-white/80">متخصص</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-white/80">مشتری راضی</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-white/80">رضایت</div>
              </div>
            </div>
          </div>

          <div className="animate-scale-in">
            <LandingSearchForm services={services} locations={locations} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl font-bold mb-4">چرا سرویسو؟</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تجربه‌ای متفاوت در ارائه و دریافت خدمات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift border-none shadow-soft bg-gradient-to-br from-card to-card/50 animate-slide-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">متخصصان تایید شده</h4>
                <p className="text-muted-foreground leading-relaxed">
                  تمامی متخصصان ما احراز هویت شده و دارای تخصص لازم هستند
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-none shadow-soft bg-gradient-to-br from-card to-card/50 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">ضمانت کیفیت</h4>
                <p className="text-muted-foreground leading-relaxed">
                  کیفیت کار و رضایت شما برای ما در اولویت است
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-none shadow-soft bg-gradient-to-br from-card to-card/50 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">تجربه آسان</h4>
                <p className="text-muted-foreground leading-relaxed">
                  رابط کاربری ساده و فرآیند سریع برای دسترسی به خدمات
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl font-bold mb-4">خدمات محبوب</h3>
            <p className="text-xl text-muted-foreground">
              دسته‌بندی‌های پرطرفدار خدمات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover-lift border-none shadow-soft bg-gradient-to-br from-card to-muted/10 animate-slide-up">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between group-hover:text-primary transition-colors">
                  خدمات منزل
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    120+ متخصص
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  تعمیرات، نظافت، باغبانی و سایر خدمات منزل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full group bg-primary hover:bg-primary/90 shadow-medium">
                  <Link href="/search?service=home" className="flex items-center justify-center gap-2">
                    مشاهده متخصصان
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-none shadow-soft bg-gradient-to-br from-card to-muted/10 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between group-hover:text-primary transition-colors">
                  خدمات آموزشی
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    85+ مدرس
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  تدریس خصوصی، آموزش زبان، موسیقی و هنر
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full group bg-primary hover:bg-primary/90 shadow-medium">
                  <Link href="/search?service=education" className="flex items-center justify-center gap-2">
                    مشاهده مدرسان
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-none shadow-soft bg-gradient-to-br from-card to-muted/10 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between group-hover:text-primary transition-colors">
                  خدمات پزشکی
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    45+ متخصص
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  پرستاری، فیزیوتراپی و مراقبت در منزل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full group bg-primary hover:bg-primary/90 shadow-medium">
                  <Link href="/search?service=medical" className="flex items-center justify-center gap-2">
                    مشاهده متخصصان
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl font-bold mb-4">متخصصان برتر</h3>
            <p className="text-xl text-muted-foreground">
              بهترین متخصصان با بالاترین امتیاز
            </p>
          </div>

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
              <Card key={index} className="hover-lift border-none shadow-soft bg-gradient-to-b from-card to-card/50 animate-slide-up group" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{provider.name}</h4>
                  <p className="text-muted-foreground mb-3 text-sm">{provider.service}</p>
                  <div className="flex items-center justify-center mb-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 ml-1" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center justify-center bg-amber-50 dark:bg-amber-950/20 rounded-lg p-2">
                    <Star className="w-4 h-4 text-amber-500 fill-current ml-1" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <span className="text-sm text-muted-foreground mr-1">({provider.reviews})</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  سرویسو
                </h4>
                <Sparkles className="w-6 h-6 text-primary mr-2" />
              </div>
              <p className="text-slate-300 leading-relaxed">
                پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران
              </p>
            </div>

            <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <h4 className="text-lg font-semibold mb-6">خدمات</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="/search?service=home" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                    خدمات منزل
                  </Link>
                </li>
                <li>
                  <Link href="/search?service=education" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                    خدمات آموزشی
                  </Link>
                </li>
                <li>
                  <Link href="/search?service=medical" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                    خدمات پزشکی
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h4 className="text-lg font-semibold mb-6">شرکت</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                    شرایط استفاده
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <h4 className="text-lg font-semibold mb-6">تماس با ما</h4>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center hover:text-white transition-colors">
                  <Phone className="w-5 h-5 ml-3 text-primary" />
                  <span>021-12345678</span>
                </div>
                <div className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-5 h-5 ml-3 text-primary" />
                  <span>info@servinoo.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 animate-fade-in">
            <p>&copy; 1403 سرویسو. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
