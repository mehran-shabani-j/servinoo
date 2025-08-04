"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { verifyOtp } from "./actions"
import { useToast } from "@/components/ui/use-toast"

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")
  const { toast } = useToast()
  const [otp, setOtp] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || otp.length < 5) return

    startTransition(async () => {
      const result = await verifyOtp(phone, otp)
      if (result && !result.success) {
        toast({ title: "خطا", description: result.message, variant: "destructive" })
      }
    })
  }

  // Auto-submit when OTP is filled
  useEffect(() => {
    if (otp.length === 5 && phone) {
      startTransition(async () => {
        const result = await verifyOtp(phone, otp)
        if (result && !result.success) {
          toast({ title: "خطا", description: result.message, variant: "destructive" })
        }
      })
    }
  }, [otp, phone, toast])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>کد تایید را وارد کنید</CardTitle>
          <CardDescription>یک کد ۵ رقمی به شماره {phone} ارسال شد. لطفاً آن را در کادر زیر وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <InputOTP maxLength={5} value={otp} onChange={setOtp} dir="ltr">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" className="w-full" disabled={isPending || otp.length < 5}>
              {isPending ? "در حال بررسی..." : "تایید"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
