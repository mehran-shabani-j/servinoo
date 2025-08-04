import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CompleteProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تکمیل پروفایل</CardTitle>
          <CardDescription>لطفاً اطلاعات خود را تکمیل کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">نام</Label>
              <Input id="firstName" name="firstName" type="text" required className="text-right" dir="rtl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">نام خانوادگی</Label>
              <Input id="lastName" name="lastName" type="text" required className="text-right" dir="rtl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل (اختیاری)</Label>
              <Input id="email" name="email" type="email" className="text-right" dir="rtl" />
            </div>

            <Button type="submit" className="w-full">
              تکمیل پروفایل
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
