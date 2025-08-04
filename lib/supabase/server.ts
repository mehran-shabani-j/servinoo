import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  const supabaseUrl = "https://vgbbiambvdfqrkuxrkdf.supabase.co"
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnYmJpYW1idmRmcXJrdXhya2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODg0OTAsImV4cCI6MjA2OTg2NDQ5MH0.w-R0YFoOqmwygJBzLgUu4V0uioawd8qEdYawmeT1XXQ"

  console.log("Creating Supabase client with URL:", supabaseUrl)

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          console.log("Cookie set error (can be ignored):", error)
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          console.log("Cookie remove error (can be ignored):", error)
        }
      },
    },
  })
}
