import type React from "react"
import { AppSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    // اگر پروفایل وجود نداشت (مثلا در فرآیند ثبت‌نام مشکلی پیش آمده)،
    // کاربر را به صفحه تکمیل پروفایل هدایت کن.
    redirect("/complete-profile")
  }

  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen bg-gray-100/40">
        <AppSidebar profile={profile} />
        <main className="flex-1 p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-2xl font-bold mr-2 md:mr-0">داشبورد</h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
