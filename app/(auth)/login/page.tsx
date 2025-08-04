"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement server action to send OTP
    console.log("Sending OTP to:", phoneNumber)
    // On success, navigate to the OTP verification page
    router.push(`/verify-otp?phone=${phoneNumber}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ورود یا ثبت‌نام</CardTitle>
          <CardDescription>برای دریافت کد تایید، شماره تلفن همراه خود را وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن همراه</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              ارسال کد
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
