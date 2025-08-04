"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [phone, setPhone] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const phoneParam = searchParams.get("phone")
    if (phoneParam) {
      setPhone(phoneParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (otp === "123456") {
        setMessage("ورود موفقیت‌آمیز بود")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        setMessage("کد تایید اشتباه است. کد صحیح: 123456")
      }
    } catch (error) {
      setMessage("خطا در تایید کد. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setMessage("کد تایید مجدداً ارسال شد")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تایید کد</CardTitle>
          <CardDescription>کد ارسال شده به شماره {phone} را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">کد تایید</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 text-center">برای تست، کد 123456 را وارد کنید</p>
            </div>

            {message && (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "در حال تایید..." : "تایید"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={handleResendOtp} className="text-sm text-blue-600 hover:underline">
              ارسال مجدد کد
            </button>
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => router.push("/login")} className="text-sm text-gray-600 hover:underline">
              بازگشت به صفحه ورود
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
