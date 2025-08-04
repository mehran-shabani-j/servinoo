import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // این بررسی ضروری است. کد به درستی تشخیص می‌دهد که متغیرهای محیطی
  // لازم برای اتصال به دیتابیس وجود ندارند.
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "متغیرهای محیطی Supabase (URL و Anon Key) تعریف نشده‌اند. لطفاً به بخش Settings > Integrations در پروژه Vercel خود بروید و مطمئن شوید که Supabase به درستی متصل شده است.",
    )
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
        }
      },
    },
  })
}
