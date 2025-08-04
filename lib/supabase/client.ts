import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // این بررسی برای سمت کلاینت نیز ضروری است.
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "متغیرهای محیطی Supabase (URL و Anon Key) در سمت کلاینت تعریف نشده‌اند. لطفاً تنظیمات پروژه Vercel خود را بررسی کنید.",
    )
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
