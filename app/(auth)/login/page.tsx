"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { sendOtp } from "./actions"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      // نکته: شماره موبایل باید با فرمت بین‌المللی باشد e.g., +989123456789
      const result = await sendOtp(phoneNumber)
      if (result.success) {
        toast({ title: "موفقیت", description: result.message })
        router.push(`/verify-otp?phone=${phoneNumber}`)
      } else {
        toast({ title: "خطا", description: result.message, variant: "destructive" })
      }
    })
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
                name="phone"
                placeholder="+989123456789"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                dir="ltr"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "در حال ارسال..." : "ارسال کد"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
