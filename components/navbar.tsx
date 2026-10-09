"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  Search,
  Bell,
  X,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  ChevronDown,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navigation = [
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Mission", href: "/about/mission" },
      { name: "Leadership", href: "/about/leadership" },
      { name: "Approach", href: "/about/approach" },
      { name: "Impact", href: "/about/impact" },
    ],
  },
  {
    name: "Community",
    href: "/community",
    children: [
      { name: "Membership", href: "/community/membership" },
      { name: "Directory", href: "/community/directory" },
      { name: "Committees", href: "/community/committees" },
    ],
  },
  {
    name: "Events",
    href: "/events",
    children: [
      { name: "All Podcasts", href: "/events" },
      { name: "Upcoming", href: "/events#upcoming" },
      { name: "Past Episodes", href: "/events#past" },
    ],
  },
  {
    name: "Knowledge Hub",
    href: "/knowledge-hub",
    children: [
      { name: "Blog", href: "/knowledge-hub/blog" },
      { name: "Fact Sheets", href: "/knowledge-hub/fact-sheets" },
      { name: "Newsletter", href: "/knowledge-hub/newsletter" },
    ],
  },
  {
    name: "Careers",
    href: "/careers",
    children: [
      { name: "Jobs", href: "/careers/jobs" },
      { name: "Mentorship", href: "/careers/mentorship" },
    ],
  },
];

const notifications = [
  {
    id: 1,
    title: "AI Ethics Symposium",
    description: "Registration now open",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    title: "Committee Meeting",
    description: "Tomorrow at 2 PM",
    time: "5h ago",
    unread: true,
  },
  {
    id: 3,
    title: "New Publication",
    description: "Digital Evidence Guidelines",
    time: "1d ago",
    unread: false,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState<
    string | null
  >(null);
  const [activeNavDropdown, setActiveNavDropdown] = React.useState<string | null>(null);
  const navTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleNavMouseEnter = (name: string) => {
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
    }
    setActiveNavDropdown(name);
  };

  const handleNavMouseLeave = () => {
    navTimeoutRef.current = setTimeout(() => {
      setActiveNavDropdown(null);
    }, 150);
  };

  const pathname = usePathname();
  const { data: session, status } = useSession();

  const unreadCount = notifications.filter((n) => n.unread).length;
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

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

  // Don't render navbar on dashboard pages, admin pages, or maintenance page
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/maintenance") ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative w-[100px] h-[28px] sm:w-[120px] sm:h-[34px] lg:w-[140px] lg:h-[40px]">
              <Image
                src="/images/logo.png"
                alt="The Black Silk Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigation.map((item) => {
              const isOpen = activeNavDropdown === item.name;
              const isActive = pathname.startsWith(item.href);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleNavMouseEnter(item.name)}
                  onMouseLeave={handleNavMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavDropdown(isOpen ? null : item.name);
                    }}
                    className={cn(
                      "h-9 px-3.5 text-sm font-medium transition-colors inline-flex items-center rounded-none cursor-pointer",
                      isActive || isOpen
                        ? "text-black bg-neutral-100 font-semibold"
                        : "text-neutral-700 hover:text-black hover:bg-neutral-100"
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        "ml-1 h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown Menu - Opens as soon as user hovers on navlink and stays open while mouse is on the menu */}
                  <div
                    className={cn(
                      "absolute top-full left-0 pt-1 z-50 transition-all duration-150",
                      isOpen
                        ? "opacity-100 visible translate-y-0 pointer-events-auto"
                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    )}
                    onMouseEnter={() => handleNavMouseEnter(item.name)}
                    onMouseLeave={handleNavMouseLeave}
                  >
                    <div className="w-52 bg-white text-black shadow-xl rounded-none">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setActiveNavDropdown(null)}
                          className={cn(
                            "block px-4 py-2 text-sm text-neutral-800 hover:bg-black hover:!text-white transition-colors",
                            pathname === child.href &&
                            "bg-neutral-100 font-semibold !text-black"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Search - Hidden on smallest screens */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "hidden sm:flex h-9 w-9 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
                searchOpen && "bg-neutral-100 text-neutral-900"
              )}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Authenticated User Actions */}
            {isAuthenticated && (
              <>
                {/* Notifications - Hidden on mobile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:flex relative h-9 w-9 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    >
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-3 border-b">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-neutral-900">
                          Notifications
                        </h4>
                        {unreadCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {unreadCount} new
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 hover:bg-neutral-50 cursor-pointer border-b last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                notification.unread
                                  ? "bg-neutral-900"
                                  : "bg-neutral-300"
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-xs text-neutral-600 mt-1">
                                {notification.description}
                              </p>
                              <p className="text-xs text-neutral-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-neutral-600 hover:text-neutral-900"
                      >
                        View all notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            session?.user?.image ||
                            "/images/avatar-placeholder.jpg"
                          }
                          alt="User"
                        />
                        <AvatarFallback className="bg-neutral-900 text-white text-sm font-semibold">
                          {session?.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center space-x-2 p-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            session?.user?.image ||
                            "/images/avatar-placeholder.jpg"
                          }
                          alt="User"
                        />
                        <AvatarFallback className="bg-neutral-900 text-white font-semibold">
                          {session?.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">
                          {session?.user?.name || "User"}
                        </p>
                        <p className="text-sm text-neutral-600 truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {(session as any)?.user?.role === "admin" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/admin"
                            className="cursor-pointer bg-black text-white hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white rounded-none flex items-center px-3 py-2"
                          >
                            <Shield className="w-4 h-4 mr-2 text-white" />
                            <span className="text-white font-mono text-xs uppercase tracking-wider font-semibold">
                              Admin Panel
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/profile"
                        className="cursor-pointer"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/messages"
                        className="cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                        {unreadCount > 0 && (
                          <Badge className="ml-auto bg-neutral-900 text-white">
                            3
                          </Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/settings"
                        className="cursor-pointer"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-700 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Auth Buttons - Show only when NOT authenticated */}
            {!isAuthenticated && !isLoading && (
              <>
                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neutral-600 hover:text-neutral-900"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="btn-primary" asChild>
                    <Link href="/community/membership">Join Us</Link>
                  </Button>
                </div>
                {/* Mobile - Only Join Us button */}
                <Button
                  size="sm"
                  className="md:hidden btn-primary text-xs px-3"
                  asChild
                >
                  <Link href="/community/membership">Join</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-9 w-9 text-neutral-600 hover:text-neutral-900"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[350px] overflow-y-auto"
              >
                <div className="flex flex-col space-y-6 mt-6 pb-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 h-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <button
                          onClick={() =>
                            setMobileDropdownOpen(
                              mobileDropdownOpen === item.name
                                ? null
                                : item.name
                            )
                          }
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-md transition-colors hover:bg-neutral-100",
                            pathname.startsWith(item.href)
                              ? "text-neutral-900 bg-neutral-50"
                              : "text-neutral-700"
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              mobileDropdownOpen === item.name && "rotate-180"
                            )}
                          />
                        </button>
                        {mobileDropdownOpen === item.name && (
                          <div className="ml-3 space-y-0.5 py-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block px-3 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors active:bg-neutral-200",
                                  pathname === child.href &&
                                  "text-neutral-900 bg-neutral-100 font-medium"
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile User Info - Show only when authenticated */}
                  {isAuthenticated && (
                    <div className="pt-4 border-t space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              session?.user?.image ||
                              "/images/avatar-placeholder.jpg"
                            }
                            alt="User"
                          />
                          <AvatarFallback className="bg-neutral-900 text-white">
                            {session?.user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-neutral-900">
                            {session?.user?.name || "User"}
                          </p>
                          <p className="text-sm text-neutral-600">
                            Premium Member
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-11"
                          asChild
                        >
                          <Link href="/dashboard">
                            <LayoutDashboard className="w-4 h-4 mr-3" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-11"
                          asChild
                        >
                          <Link href="/dashboard/profile">
                            <User className="w-4 h-4 mr-3" />
                            Profile
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={handleSignOut}
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Mobile Auth Buttons - Show only when NOT authenticated */}
                  {!isAuthenticated && !isLoading && (
                    <div className="pt-4 border-t space-y-3">
                      <Button variant="outline" className="w-full h-11" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="w-full h-11 btn-primary" asChild>
                        <Link href="/community/membership">Join Us</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t bg-white/95 backdrop-blur-sm py-3 sm:py-4 animate-fade-in">
            <div className="relative max-w-2xl mx-auto px-4 sm:px-0">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search events, articles, members..."
                  className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-4 sm:mx-0 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-[60vh] overflow-y-auto">
                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3">
                      Quick suggestions
                    </p>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="p-2 sm:p-3 hover:bg-neutral-50 rounded-md cursor-pointer transition-colors active:bg-neutral-100">
                        <div className="font-medium text-sm sm:text-base text-neutral-900 truncate">
                          AI Ethics Symposium
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-600 truncate">
                          Upcoming event
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 hover:bg-neutral-50 rounded-md cursor-pointer transition-colors active:bg-neutral-100">
                        <div className="font-medium text-sm sm:text-base text-neutral-900 truncate">
                          Digital Evidence Guidelines
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-600 truncate">
                          Publication
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
