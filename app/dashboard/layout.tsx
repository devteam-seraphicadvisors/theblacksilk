"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Calendar,
  Users,
  BookOpen,
  Bell,
  Settings,
  CreditCard,
  MessageSquare,
  Menu,
  LogOut,
  Home,
  ChevronLeft,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "My Events",
    href: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Committees",
    href: "/dashboard/committees",
    icon: Users,
  },
  {
    title: "Publications",
    href: "/dashboard/publications",
    icon: BookOpen,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Membership",
    href: "/dashboard/membership",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* User Profile Section */}
      <div className="p-4 lg:p-6 border-b bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 lg:h-14 lg:w-14 border-2 border-white/20 shadow-lg">
            <AvatarImage
              src={session?.user?.image || "/images/avatar-placeholder.jpg"}
              alt="User"
            />
            <AvatarFallback className="bg-white/20 text-white font-semibold">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate text-sm lg:text-base">
              {session?.user?.name || "User"}
            </p>
            <p className="text-sm text-white/80 truncate">
              {session?.user?.email}
            </p>
            <Badge className="mt-2 bg-white/20 text-white text-xs border-white/20 hover:bg-white/30">
              Professional Member
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center px-3 py-2.5 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-neutral-900 text-white shadow-md"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 lg:p-4 border-t bg-neutral-50 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-600 hover:bg-neutral-100"
          asChild
        >
          <Link href="/">
            <Home className="mr-3 h-4 w-4" />
            Back to Website
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-neutral-200 shadow-sm">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 shadow-lg">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64 xl:pl-72">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-40">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-neutral-100"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">TBS</span>
            </div>
            <h1 className="text-lg font-semibold text-neutral-900">
              Dashboard
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-100"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Page Content */}
        <main className="flex-1 min-h-screen bg-neutral-50">{children}</main>
      </div>
    </div>
  );
}
