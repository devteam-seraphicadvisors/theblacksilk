"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface MainLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  isInitialSiteLoader?: boolean;
}

export function MainLoader({
  isLoading = true,
  onComplete,
  isInitialSiteLoader = false,
}: MainLoaderProps) {
  const [progress, setProgress] = useState(12);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "INITIALIZING ETHICAL FRAMEWORK..."
  );
  const heroVideoReadyRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already marked ready globally
    if ((window as any).__HERO_VIDEO_READY__) {
      heroVideoReadyRef.current = true;
    }

    const onHeroVideoReady = () => {
      heroVideoReadyRef.current = true;
    };

    window.addEventListener("hero-video-ready", onHeroVideoReady);

    // Fallback: maximum wait time of 2.8s so slow connections never hang indefinitely
    const fallbackTimer = setTimeout(() => {
      heroVideoReadyRef.current = true;
    }, 2800);

    // Dynamic progress ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        const isHome = window.location.pathname === "/";

        // If on homepage and video isn't ready yet, hold gracefully at 88%
        if (isHome && !heroVideoReadyRef.current) {
          if (prev < 88) {
            const next = prev + (88 - prev) * 0.15;
            if (next > 40 && next < 70) {
              setStatusMessage("PREPARING DIGITAL STANDARDS...");
            } else if (next >= 70) {
              setStatusMessage("CONNECTING EXPERIENCE...");
            }
            return next;
          }
          return 88;
        }

        // When video is ready (or on non-home routes), glide to 100%
        setStatusMessage("STANDARDS INITIALIZED");
        const remaining = 100 - prev;
        const next = prev + Math.max(remaining * 0.35, 3);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => {
      window.removeEventListener("hero-video-ready", onHeroVideoReady);
      clearTimeout(fallbackTimer);
      clearInterval(interval);
    };
  }, []);

  // When progress reaches 100, smoothly trigger fade out
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const fadeTimer = setTimeout(() => {
          setIsVisible(false);
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem("tbs_visited", "true");
            } catch {
              // ignore storage errors
            }
          }
          onComplete?.();
        }, 700); // 700ms smooth fade transition
        return () => clearTimeout(fadeTimer);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading The Black Silk"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Subtle Monochrome Geometric Texture matching the theme */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Central Brand & Loader Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Top Monospace Pill */}
        <div className="inline-block px-3.5 py-1 border border-neutral-800 bg-neutral-950 text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-mono mb-8">
          Est. 2026 • New Delhi
        </div>

        {/* Official Inverted Logo */}
        <div className="relative w-[180px] h-[50px] sm:w-[220px] sm:h-[60px] mb-6 invert">
          <Image
            src="/images/logo.png"
            alt="The Black Silk"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Headline & Descriptor */}
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white mb-2 tracking-tight">
          The Black Silk
        </h2>
        <p className="text-[11px] sm:text-xs text-neutral-400 font-mono uppercase tracking-[0.2em] mb-10 max-w-xs">
          Ethical Standards & Policy for the Digital Future
        </p>

        {/* Bespoke Minimalist Spinner Indicator */}
        <div className="relative w-8 h-8 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-neutral-800 border-t-white animate-spin duration-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>

        {/* Hairline Progress Bar */}
        <div className="w-64 sm:w-80 h-[2px] bg-neutral-900 border border-neutral-800 relative overflow-hidden mb-3">
          <div
            className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            style={{ width: `${Math.min(Math.round(progress), 100)}%` }}
          />
        </div>

        {/* Dynamic Status and Percentage Counter */}
        <div className="w-64 sm:w-80 flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-400">
          <span className="truncate pr-2">{statusMessage}</span>
          <span className="text-white font-medium">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>
    </div>
  );
}
