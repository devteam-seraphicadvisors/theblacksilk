"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  MessagesSquare,
  Menu,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

const sidebarItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "My Events", href: "/dashboard/events", icon: Calendar },
  { title: "Committees", href: "/dashboard/committees", icon: Users },
  { title: "Publications", href: "/dashboard/publications", icon: BookOpen },
  { title: "Forum", href: "/dashboard/forum", icon: MessagesSquare },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { title: "Membership", href: "/dashboard/membership", icon: CreditCard },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

const initials = (name?: string | null) =>
  (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Logo() {
  return (
    <Link href="/" className="relative block w-[120px] h-[34px]" aria-label="The Black Silk home">
      <Image src="/images/logo.png" alt="The Black Silk" fill className="object-contain" priority />
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const current =
    sidebarItems.find((item) => item.href === pathname) ??
    sidebarItems.find(
      (item) => item.href !== "/dashboard" && pathname.startsWith(item.href + "/")
    );

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/", redirect: true });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo (aligned with the header height) */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 flex-shrink-0">
        <Logo />
      </div>

      {/* User */}
      <div className="px-6 py-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 rounded-none border border-neutral-200">
            <AvatarImage
              src={session?.user?.image || undefined}
              alt={session?.user?.name || "Profile picture"}
              className="object-cover"
            />
            <AvatarFallback className="rounded-none bg-black text-white font-mono text-xs">
              {initials(session?.user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-serif text-lg text-black leading-tight truncate">
              {session?.user?.name || "Member"}
            </p>
            <p className="text-xs text-neutral-500 truncate">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Dashboard">
        {sidebarItems.map((item) => {
          const isActive = item === current;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-black !text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-neutral-200 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
        >
          <ArrowUpRight className="h-4 w-4" />
          Back to Website
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col border-r border-neutral-200 bg-white z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 rounded-none">
          <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64 xl:pl-72">
        {/* Fixed header */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-neutral-200">
          <div className="h-full flex items-center justify-between gap-4 px-4 lg:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-black hover:bg-neutral-100 cursor-pointer"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Dashboard
                </span>
                <p className="font-serif text-xl text-black leading-tight truncate">
                  {current?.title ?? "Dashboard"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
              >
                Back to Website
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/dashboard/notifications"
                className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard/settings"
                className="ml-1 flex items-center"
                aria-label="Account settings"
              >
                <Avatar className="h-9 w-9 rounded-none border border-neutral-200">
                  <AvatarImage
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || "Profile picture"}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-none bg-black text-white font-mono text-[10px]">
                    {initials(session?.user?.name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] bg-neutral-50">{children}</main>
      </div>
    </div>
  );
}
