import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyOtp } from "../actions"

export default function VerifyOtp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تایید کد</CardTitle>
          <CardDescription>کد ارسال شده به شماره موبایل خود را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={verifyOtp} className="space-y-4">
            <input type="hidden" name="phone" value="" />
            <div className="space-y-2">
              <Label htmlFor="token">کد تایید</Label>
              <Input
                id="token"
                name="token"
                type="text"
                placeholder="123456"
                required
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>
            <Button type="submit" className="w-full">
              تایید
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
