import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "../actions"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ورود به سرویسو</CardTitle>
          <CardDescription>شماره موبایل خود را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="09123456789"
                required
                className="text-right"
                dir="rtl"
              />
            </div>
            <Button type="submit" className="w-full">
              ارسال کد تایید
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
