"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")
  const [otp, setOtp] = useState("")

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController()
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otpCredential) => {
          if (otpCredential) {
            setOtp(otpCredential.code)
            // Automatically submit the form
            // TODO: Implement server action to verify OTP
            console.log("Auto-submitting OTP:", otpCredential.code)
            router.push("/complete-profile")
          }
        })
        .catch((err) => {
          console.error(err)
        })
      return () => ac.abort()
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement server action to verify OTP
    console.log("Verifying OTP:", otp)
    // On success, check if user is new or existing.
    // If new, redirect to complete-profile. If existing, redirect to dashboard.
    router.push("/complete-profile")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>کد تایید را وارد کنید</CardTitle>
          <CardDescription>یک کد ۵ رقمی به شماره {phone} ارسال شد. لطفاً آن را در کادر زیر وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <InputOTP maxLength={5} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" className="w-full">
              تایید
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
