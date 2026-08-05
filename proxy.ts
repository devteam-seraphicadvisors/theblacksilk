import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
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

    console.log("Middleware check:", {
      pathname,
      isAuth,
      hasMembership: token?.hasMembership,
      onboardingCompleted: token?.onboardingCompleted,
    });

    // If user is authenticated and tries to access auth pages, redirect appropriately
    if (isAuthPage && isAuth) {
      // Check membership and onboarding status
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
          "/api/auth",
          "/api/payment/webhook",
        ];

        // Check if the current path is a public route or starts with a public route
        const isPublicRoute = publicRoutes.some(
          (route) => pathname === route || pathname.startsWith(route + "/")
        );

        // Allow access to public routes and auth pages
        if (
          isPublicRoute ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register")
        ) {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public|.*\\.).*)",
  ],
};
