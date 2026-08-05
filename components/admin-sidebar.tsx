"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  Settings,
  BarChart3,
  FileText,
  Shield,
  LogOut,
  ChevronUp,
  Building2,
  Mail,
  Bell,
  Database,
  Activity,
  BookOpen,
  FileSpreadsheet,
  Newspaper,
  Briefcase,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
      },
      {
        title: "System Health",
        url: "/admin/system",
        icon: Activity,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Events",
        url: "/admin/events",
        icon: Calendar,
      },
      {
        title: "Publications",
        url: "/admin/publications",
        icon: BookOpen,
      },
      {
        title: "Fact Sheets",
        url: "/admin/fact-sheets",
        icon: FileSpreadsheet,
      },
      {
        title: "Memberships",
        url: "/admin/memberships",
        icon: UserCheck,
      },
      {
        title: "Committees",
        url: "/admin/committees",
        icon: Building2,
      },
      {
        title: "Jobs",
        url: "/admin/jobs",
        icon: Briefcase,
      },
      {
        title: "Mentors",
        url: "/admin/mentors",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        title: "Messages",
        url: "/admin/messages",
        icon: Mail,
      },
      {
        title: "Committee Messages",
        url: "/admin/committee-messages",
        icon: MessageSquare,
      },
      {
        title: "Newsletter Issues",
        url: "/admin/newsletter-issues",
        icon: Newspaper,
      },
      {
        title: "Newsletter Subscribers",
        url: "/admin/newsletter",
        icon: Mail,
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Reports",
        url: "/admin/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        title: "Database",
        url: "/admin/database",
        icon: Database,
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Security",
        url: "/admin/security",
        icon: Shield,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-gray-200 bg-white w-64 h-screen"
    >
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TBS</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">The Black Silk</h2>
            <p className="text-sm text-gray-600">Legal Technology Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 overflow-y-auto">
        {navigation.map((section) => (
          <SidebarGroup key={section.title} className="mb-6">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`w-full justify-start px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center space-x-3 w-full"
                        >
                          <item.icon
                            className={`h-4 w-4 ${
                              isActive ? "text-gray-900" : "text-gray-500"
                            }`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-3 py-3 h-auto hover:bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/avatar-placeholder.jpg" />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@tbs.org</p>
                </div>
              </div>
              <ChevronUp className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
