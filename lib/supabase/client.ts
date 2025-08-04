import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  // نکته: این متغیرها باید در محیط پروژه شما تعریف شوند.
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
