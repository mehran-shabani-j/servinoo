"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    phone: formData.get("phone") as string,
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: data.phone,
  })

  if (error) {
    redirect("/error")
  }

  redirect("/verify-otp")
}

export async function verifyOtp(formData: FormData) {
  const supabase = createClient()

  const data = {
    phone: formData.get("phone") as string,
    token: formData.get("token") as string,
  }

  const { error } = await supabase.auth.verifyOtp({
    phone: data.phone,
    token: data.token,
    type: "sms",
  })

  if (error) {
    redirect("/error")
  }

  redirect("/dashboard")
}
