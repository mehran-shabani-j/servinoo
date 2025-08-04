import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/complete-profile")
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>خوش آمدید، {profile.first_name}!</CardTitle>
          <CardDescription>خلاصه‌ای از وضعیت حساب کاربری شما.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>شما می‌توانید پروفایل خود را مدیریت کرده و تاریخچه خدماتتان را از منوی کنار مشاهده کنید.</p>
        </CardContent>
      </Card>

      {profile.is_provider ? (
        <Card>
          <CardHeader>
            <CardTitle>داشبورد متخصص</CardTitle>
            <CardDescription>خدمات، قیمت‌گذاری و درآمدهای خود را مدیریت کنید.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">اطلاعات تسویه حساب</h3>
              <p className="text-sm text-muted-foreground">
                لطفاً برای دریافت وجه، اطلاعات بانکی خود را به‌روز نگه دارید.
              </p>
              {/* 
                TODO: Implement proper 16-17 digit IBAN (Sheba) validation as per banking standards.
                This is a placeholder for where the provider would input their payout details.
              */}
              <div className="mt-2 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p className="font-bold">نکته در مورد اعتبارسنجی شماره شبا:</p>
                <p>منطق اعتبارسنجی شماره شبای ۱۶ تا ۱۷ رقمی باید بررسی و پیاده‌سازی شود.</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/dashboard/services">مدیریت خدمات من</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>متخصص شوید</CardTitle>
            <CardDescription>آیا می‌خواهید خدمات خود را در سروینو ارائه دهید؟ همین امروز شروع کنید.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/profile">رفتن به تنظیمات پروفایل</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>سیستم پرداخت</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">پرداخت‌ها به صورت امن از طریق پلتفرم ما انجام می‌شود.</p>
          {/* TODO: This is a placeholder for the BitPay integration. */}
          <Button disabled>پرداخت با بیت‌پی (در انتظار پیاده‌سازی)</Button>
        </CardContent>
      </Card>
    </div>
  )
}
