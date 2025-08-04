import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { getProfile } from "@/app/data"
import { redirect } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getProfile()

  if (!profile) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100" dir="rtl">
        <DashboardSidebar profile={profile} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
