import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    "https://vgbbiambvdfqrkuxrkdf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnYmJpYW1idmRmcXJrdXhya2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODg0OTAsImV4cCI6MjA2OTg2NDQ5MH0.w-R0YFoOqmwygJBzLgUu4V0uioawd8qEdYawmeT1XXQ",
  )
}
