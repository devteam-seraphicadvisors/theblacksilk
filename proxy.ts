import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // Define route categories
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register");
    const isDashboard = pathname.startsWith("/dashboard");
    const isAdmin = pathname.startsWith("/admin");
    const isMembershipPage =
      pathname.startsWith("/community/membership") ||
      pathname.startsWith("/membership");
    const isOnboarding = pathname.startsWith("/onboarding");

    // If user is authenticated and tries to access auth pages, redirect appropriately
    if (isAuthPage && isAuth) {
      if (!token?.hasMembership) {
        return NextResponse.redirect(new URL("/community/membership", req.url));
      }
      if (!token?.onboardingCompleted) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is not authenticated and tries to access protected pages
    if ((isDashboard || isOnboarding) && !isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If authenticated user tries to access dashboard without membership
    if (isDashboard && isAuth && !token?.hasMembership) {
      return NextResponse.redirect(new URL("/community/membership", req.url));
    }

    // If authenticated user with membership tries to access dashboard without completing onboarding
    if (
      isDashboard &&
      isAuth &&
      token?.hasMembership &&
      !token?.onboardingCompleted
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // If user with membership tries to access membership page, redirect to dashboard
    if (isMembershipPage && isAuth && token?.hasMembership) {
      if (!token?.onboardingCompleted) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user without membership tries to access onboarding
    if (isOnboarding && isAuth && !token?.hasMembership) {
      return NextResponse.redirect(new URL("/community/membership", req.url));
    }

    // Admin route protection
    if (isAdmin && (!isAuth || token?.role !== "admin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/about",
          "/events",
          "/knowledge-hub",
          "/community/committees",
          "/careers",
          "/get-involved",
          "/partnerships",
          "/maintenance",
          "/api/auth",
          "/api/payment/webhook",
          "/api/maintenance",
        ];

        // Check if the current path is a public route or starts with a public route
        const isPublicRoute = publicRoutes.some(
          (route) => pathname === route || pathname.startsWith(route + "/")
        );

        // Allow access to public routes and auth pages
        if (
          isPublicRoute ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/maintenance")
        ) {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
  }
);

export default async function proxy(req: any) {
  const isMaintenanceMode =
    process.env.MAINTENANCE_MODE === "true" ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  const { pathname, searchParams } = req.nextUrl;

  const hasBypassParam =
    searchParams.get("bypass") === "admin" ||
    searchParams.get("preview") === "true";
  const hasBypassCookie =
    req.cookies?.get("bypass_maintenance")?.value === "true";

  // When Maintenance Mode is active:
  if (isMaintenanceMode && !hasBypassParam && !hasBypassCookie) {
    // If not already on /maintenance and not a static asset or maintenance API
    if (
      !pathname.startsWith("/maintenance") &&
      !pathname.startsWith("/api/maintenance") &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/images") &&
      !pathname.startsWith("/icons") &&
      !pathname.startsWith("/members") &&
      !pathname.startsWith("/sponsors") &&
      pathname !== "/favicon.ico" &&
      pathname !== "/favicon.png" &&
      pathname !== "/favicon-32x32.png" &&
      pathname !== "/favicon-16x16.png" &&
      pathname !== "/apple-touch-icon.png" &&
      pathname !== "/icon.png" &&
      pathname !== "/site.webmanifest"
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

  // If admin bypass parameter provided, set cookie and reload without the param
  if (hasBypassParam && !hasBypassCookie) {
    const res = NextResponse.redirect(new URL(pathname, req.url));
    res.cookies.set("bypass_maintenance", "true", {
      path: "/",
      maxAge: 86400,
      httpOnly: false,
    });
    return res;
  }

  return (authMiddleware as any)(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder & static images
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public|images|members|sponsors|icons|.*\\..*).*)",
  ],
};
