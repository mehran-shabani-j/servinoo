import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, User, LogOut, Briefcase, History } from "lucide-react"
import Link from "next/link"
import type { Profile } from "@/app/data"

export function AppSidebar({ profile }: { profile: Profile }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 p-2" dir="rtl">
          <Avatar>
            <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=40&width=40"} alt="User avatar" />
            <AvatarFallback>{profile.first_name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{`${profile.first_name} ${profile.last_name}`}</span>
            <span className="text-xs text-muted-foreground">{profile.email}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="ml-2" />
                    <span>داشبورد</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/profile">
                    <User className="ml-2" />
                    <span>پروفایل</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/history">
                    <History className="ml-2" />
                    <span>تاریخچه خدمات</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {profile.is_provider && (
          <SidebarGroup>
            <SidebarGroupLabel>ابزارهای متخصص</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/services">
                      <Briefcase className="ml-2" />
                      <span>خدمات من</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="ml-2" />
              <span>خروج</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
