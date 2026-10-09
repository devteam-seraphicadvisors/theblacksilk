import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TBS Admin Portal",
  description: "The Black Silk Admin Management Portal",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <Providers>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          <AdminSidebar />
          <SidebarInset className="flex-1">
            <main className="flex-1 p-6 bg-gray-50 min-h-screen overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Toaster />
    </Providers>
  );
}
