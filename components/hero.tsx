"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

// Subject areas shown in the scrolling strip at the bottom of the hero
const focusAreas = [
  "Artificial Intelligence",
  "Data Protection",
  "Cybersecurity",
  "Digital Evidence",
  "Fintech",
  "Blockchain",
  "Platform Governance",
  "Digital Rights",
];

export function Hero() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const markVideoReady = () => {
    setIsVideoReady(true);
    if (typeof window !== "undefined") {
      (window as any).__HERO_VIDEO_READY__ = true;
      window.dispatchEvent(new CustomEvent("hero-video-ready"));
    }
  };

  useEffect(() => {
    // Listen for Vimeo postMessage events (ready / play)
    const handleMessage = (event: MessageEvent) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (
          data &&
          (data.event === "ready" ||
            data.event === "play" ||
            data.event === "playing" ||
            data.method === "ping")
        ) {
          markVideoReady();
        }
      } catch {
        // Ignore non-JSON postMessages
      }
    };

    window.addEventListener("message", handleMessage);

    // Fallback timer: ensure video is considered ready within 2.5s even if events are delayed
    const fallbackTimer = setTimeout(() => {
      markVideoReady();
    }, 2500);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden no-scrollbar bg-black text-white">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/902919321?background=1&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&playsinline=1&api=1"
            onLoad={markVideoReady}
            className={`absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none grayscale contrast-110 brightness-100 transition-opacity duration-1000 ${
              isVideoReady ? "opacity-90" : "opacity-0"
            }`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="The Black Silk background video"
            aria-hidden="true"
          />
        </div>
        {/* Balanced Monochrome Contrast Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 site-container pt-16 pb-32 text-center">
        {/* Eyebrow */}
        <div data-reveal style={{ "--reveal-delay": "0ms" } as CSSProperties} className="inline-flex items-center gap-3 px-3 py-1 mb-8 border border-white/30 bg-black/40 backdrop-blur-sm text-neutral-200 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-mono">
          <span>Ethics</span>
          <span className="w-1 h-1 bg-white" />
          <span>Law</span>
          <span className="w-1 h-1 bg-white" />
          <span>Technology</span>
        </div>

        {/* Main Heading */}
        <h1 data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties} className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal tracking-tight text-white mb-8 leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          The Black Silk
        </h1>

        {/* Subheading */}
        <p data-reveal style={{ "--reveal-delay": "260ms" } as CSSProperties} className="text-lg sm:text-xl md:text-2xl text-white font-sans font-normal mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          The Black Silk is a not-for-profit organization working toward the ethical
          development and judicious use of digital technologies for the greater
          good, bringing together academicians, policymakers, lawmakers, and expert
          professionals to shape practical standards for the digital world.
        </p>

        {/* Call to Action Buttons */}
        <div data-reveal style={{ "--reveal-delay": "400ms" } as CSSProperties} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button */}
          <Link
            href="/community/membership"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 hover:text-black transition-all duration-200 rounded-none px-6 py-3 font-semibold text-sm sm:text-base tracking-wide border-2 border-white shadow-md cursor-pointer group"
          >
            <span className="text-black font-semibold">Become a Member</span>
            <ArrowRight className="ml-2 h-4 w-4 text-black" />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-black/50 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 rounded-none px-6 py-3 font-semibold text-sm sm:text-base tracking-wide shadow-md cursor-pointer group"
          >
            <span className="text-white group-hover:text-black transition-colors font-semibold">
              Explore Our Work
            </span>
            <ArrowUpRight className="ml-2 h-4 w-4 text-white group-hover:text-black transition-colors" />
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#home-stats"
        aria-label="Scroll to learn more"
        className="absolute z-10 bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-neutral-300 hover:text-white transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>

      {/* Focus areas ticker */}
      <div className="absolute z-10 bottom-0 left-0 right-0 border-t border-white/15 bg-black/60 backdrop-blur-sm overflow-hidden">
        <div className="flex w-max animate-marquee py-3.5" aria-hidden="true">
          {[...focusAreas, ...focusAreas].map((area, i) => (
            <span
              key={`${area}-${i}`}
              className="flex items-center gap-8 pr-8 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-300 whitespace-nowrap"
            >
              {area}
              <span className="w-1 h-1 bg-neutral-500" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
