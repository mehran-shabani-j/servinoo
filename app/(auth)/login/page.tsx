"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function Login() {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      // Simulate sending OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage("کد تایید به شماره شما ارسال شد")

      // Redirect to OTP verification page
      setTimeout(() => {
        router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`)
      }, 2000)
    } catch (error) {
      setMessage("خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ورود به سرویسو</CardTitle>
          <CardDescription>شماره موبایل خود را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-right"
                dir="rtl"
              />
            </div>

            {message && (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{" "}
              <button onClick={() => router.push("/register")} className="text-blue-600 hover:underline">
                ثبت نام کنید
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
