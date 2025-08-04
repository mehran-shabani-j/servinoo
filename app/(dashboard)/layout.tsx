import type React from "react"
import { AppSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Protect this route. Redirect to /login if not authenticated.
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen bg-gray-100/40">
        <AppSidebar />
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
