import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables are not configured")
    throw new Error(
      "متغیرهای محیطی Supabase تعریف نشده‌اند. لطفاً NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY را تنظیم کنید.",
    )
  }

  try {
    return createBrowserClient(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error("Failed to create Supabase browser client:", error)
    throw error
  }
}
