import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

// Pages that require authentication. Every other page is public, so unknown
// URLs fall through to the 404 page instead of redirecting to /login.
// Add new member-only or admin-only page sections here.
const protectedPageRoutes = ["/dashboard", "/admin", "/onboarding"];

// Page sections hidden from the public site until they are ready. They return
// the 404 page; their code is kept. Remove an entry (and restore its nav,
// footer and sitemap links) to re-enable it.
const hiddenPageRoutes = [
  "/careers",
  "/get-involved/volunteer",
  "/community/directory",
];

// True when pathname is `route` itself or nested under it (not "/dashboardx")
const isUnder = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(route + "/");

// API routes that don't require authentication. All other API routes do.
const publicApiRoutes = [
  "/api/auth",
  "/api/payment/webhook",
  "/api/maintenance",
  "/api/community",
  "/api/careers",
  "/api/knowledge-hub",
  "/api/newsletter",
  "/api/events",
  "/api/publications",
  "/api/committees",
  "/api/stats",
];

const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // Define route categories
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register");
    const isDashboard = isUnder(pathname, "/dashboard");
    const isAdmin = isUnder(pathname, "/admin");
    const isMembershipPage =
      pathname.startsWith("/community/membership") ||
      pathname.startsWith("/membership");
    const isOnboarding = isUnder(pathname, "/onboarding");

    // Membership is optional: free accounts can onboard and use the dashboard;
    // member-only features are gated inside the dashboard itself.

    // If user is authenticated and tries to access auth pages, redirect appropriately
    if (isAuthPage && isAuth) {
      if (!token?.onboardingCompleted) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is not authenticated and tries to access protected pages
    if ((isDashboard || isOnboarding) && !isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If authenticated user tries to access dashboard without completing onboarding
    if (isDashboard && isAuth && !token?.onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // If user with membership tries to access membership page, redirect to dashboard
    if (isMembershipPage && isAuth && token?.hasMembership) {
      if (!token?.onboardingCompleted) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin route protection
    if (isAdmin) {
      if (!isAuth) {
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
        );
      }
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        const isProtectedRoute = protectedPageRoutes.some((route) =>
          isUnder(pathname, route)
        );

        // Only protected sections require authentication
        return !isProtectedRoute || !!token;
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
    const isStaticAsset =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/images") ||
      pathname.startsWith("/icons") ||
      pathname.startsWith("/members") ||
      pathname.startsWith("/sponsors") ||
      pathname.endsWith(".png") ||
      pathname.endsWith(".svg") ||
      pathname.endsWith(".ico") ||
      pathname.endsWith(".jpg") ||
      pathname.endsWith(".jpeg") ||
      pathname.endsWith(".webp") ||
      pathname.endsWith(".json") ||
      pathname.endsWith(".webmanifest");

    // If not already on /maintenance, not maintenance API, and not static asset
    if (
      !pathname.startsWith("/maintenance") &&
      !pathname.startsWith("/api/maintenance") &&
      !isStaticAsset
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

  // Hidden sections: rewrite to an unmatched path so Next serves the 404 page
  // with a real 404 status
  if (hiddenPageRoutes.some((route) => isUnder(pathname, route))) {
    return NextResponse.rewrite(new URL("/__hidden", req.url));
  }

  // Handle API routes specifically to avoid redirecting API fetches to HTML login pages
  if (pathname.startsWith("/api/")) {
    const isPublic = publicApiRoutes.some((route) => isUnder(pathname, route));
    if (isPublic) {
      return NextResponse.next();
    }
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (pathname.startsWith("/api/admin") && token.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
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
