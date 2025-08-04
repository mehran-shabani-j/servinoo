"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { completeProfile } from "./actions"

export default function CompleteProfilePage() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")

  const handleSubmit = async (formData: FormData) => {
    if (phone) {
      formData.append("phone", phone)
    }

    startTransition(async () => {
      const result = await completeProfile(formData)
      if (result && !result.success) {
        toast({ title: "خطا", description: result.message, variant: "destructive" })
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>تکمیل پروفایل</CardTitle>
          <CardDescription>فقط چند گام دیگر تا شروع باقی مانده است.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">نام</Label>
                <Input id="first-name" name="first-name" placeholder="علی" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">نام خانوادگی</Label>
                <Input id="last-name" name="last-name" placeholder="رضایی" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" name="email" type="email" placeholder="ali.rezaei@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "در حال ایجاد حساب..." : "ایجاد حساب کاربری"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
