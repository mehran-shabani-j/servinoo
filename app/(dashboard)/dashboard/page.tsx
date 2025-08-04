"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BarChart3, Users, Star, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
            <Button variant="outline" onClick={handleLogout}>
              خروج
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">خوش آمدید!</h2>
          <p className="text-gray-600">به پنل کاربری سرویسو خوش آمدید</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">درخواست‌های جدید</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 از هفته گذشته</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">پروژه‌های فعال</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+1 از هفته گذشته</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">امتیاز کلی</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">از 23 نظر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">درآمد این ماه</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450,000</div>
              <p className="text-xs text-muted-foreground">تومان</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>درخواست‌های اخیر</CardTitle>
              <CardDescription>آخرین درخواست‌های دریافت شده</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تعمیر یخچال</p>
                  <p className="text-sm text-muted-foreground">تهران، پونک</p>
                </div>
                <Badge>جدید</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">نظافت منزل</p>
                  <p className="text-sm text-muted-foreground">تهران، ونک</p>
                </div>
                <Badge variant="secondary">در انتظار</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تدریس ریاضی</p>
                  <p className="text-sm text-muted-foreground">تهران، سعادت آباد</p>
                </div>
                <Badge variant="outline">تایید شده</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>پیام‌های جدید</CardTitle>
              <CardDescription>آخرین پیام‌های دریافت شده</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">احمد محمدی</p>
                <p className="text-sm text-muted-foreground">سلام، چه زمانی می‌تونید برای تعمیر یخچال بیاید؟</p>
                <p className="text-xs text-muted-foreground">2 ساعت پیش</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">فاطمه احمدی</p>
                <p className="text-sm text-muted-foreground">ممنون از خدمات عالی‌تون. امتیاز کامل دادم.</p>
                <p className="text-xs text-muted-foreground">5 ساعت پیش</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
