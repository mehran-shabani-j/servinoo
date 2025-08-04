"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function CompleteProfilePage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement server action to create user account
    console.log("Creating user account...")
    // On success, navigate to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>تکمیل پروفایل</CardTitle>
          <CardDescription>فقط چند گام دیگر تا شروع باقی مانده است.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">نام</Label>
                <Input id="first-name" placeholder="علی" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">نام خانوادگی</Label>
                <Input id="last-name" placeholder="رضایی" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="ali.rezaei@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              ایجاد حساب کاربری
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
