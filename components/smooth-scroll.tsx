"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

// Sections that scroll inside their own panels; Lenis stays off there.
const NATIVE_SCROLL_ROUTES = ["/dashboard", "/admin"];

const isUnder = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(route + "/");

// Smooth scrolling (Lenis) on public pages, plus "start at the top" on every
// navigation to a new page. Lenis honours prefers-reduced-motion by default.
//
// Scroll-to-top skips:
// - the initial page load (keeps the browser's own restore on refresh)
// - links to a section (#hash), so they still land on that section
// - browser back/forward, so users return to where they were
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);
  const isFirstRender = useRef(true);
  const isHistoryNavigation = useRef(false);

  const smoothEnabled = !NATIVE_SCROLL_ROUTES.some((route) =>
    isUnder(pathname, route)
  );

  useEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Pause Lenis while a dialog, mobile menu or dropdown has locked the page
  // (Radix sets body[data-scroll-locked]); otherwise Lenis would scroll the
  // page behind the overlay.
  useEffect(() => {
    if (!smoothEnabled) return;

    const sync = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      if (document.body.hasAttribute("data-scroll-locked")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });
    sync();
    return () => observer.disconnect();
  }, [smoothEnabled]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return;

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  if (!smoothEnabled) return null;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: true,
        lerp: 0.1,
        // #section links scroll smoothly; the navbar offset comes from
        // html { scroll-padding-top } in globals.css
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
