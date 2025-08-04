"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

// توجه: در یک برنامه واقعی، شماره موبایل باید با پیش‌شماره کشور (مثلا +98) باشد.
// Supabase برای ارسال OTP به شماره‌های ایران نیاز به تنظیمات خاصی در پنل Twilio دارد.
// در اینجا ما فرآیند را شبیه‌سازی می‌کنیم.

export async function sendOtp(phone: string) {
  const supabase = createClient()

  // شماره موبایل را برای استفاده در مرحله بعد، در کوکی ذخیره می‌کنیم
  supabase.auth.setAuthCookie

  const { error } = await supabase.auth.signInWithOtp({
    phone,
  })

  if (error) {
    console.error("Error sending OTP:", error)
    return { success: false, message: "خطا در ارسال کد. لطفاً دوباره تلاش کنید." }
  }

  return { success: true, message: "کد تایید با موفقیت ارسال شد." }
}

export async function verifyOtp(phone: string, token: string) {
  const supabase = createClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  })

  if (error) {
    console.error("Error verifying OTP:", error)
    return { success: false, message: "کد وارد شده نامعتبر است." }
  }

  if (session) {
    // بررسی می‌کنیم آیا پروفایل کاربر قبلا ساخته شده است یا خیر
    const { data: profile } = await supabase.from("profiles").select("id").eq("id", session.user.id).single()

    if (profile) {
      // اگر پروفایل وجود داشت، کاربر را به داشبورد هدایت کن
      redirect("/dashboard")
    } else {
      // اگر پروفایل وجود نداشت، کاربر را به صفحه تکمیل پروفایل هدایت کن
      redirect(`/complete-profile?phone=${phone}`)
    }
  }

  return { success: false, message: "خطای ناشناخته رخ داد." }
}

export async function completeProfile(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const firstName = formData.get("first-name") as string
  const lastName = formData.get("last-name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const phone = formData.get("phone") as string

  // 1. آپدیت ایمیل و رمز عبور در auth.users
  const { error: userUpdateError } = await supabase.auth.updateUser({
    email,
    password,
  })

  if (userUpdateError) {
    console.error("Error updating user:", userUpdateError)
    return { success: false, message: "خطا در به‌روزرسانی اطلاعات کاربری." }
  }

  // 2. ایجاد پروفایل در جدول public.profiles
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phone,
  })

  if (profileError) {
    console.error("Error creating profile:", profileError)
    return { success: false, message: "خطا در ایجاد پروفایل." }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}
