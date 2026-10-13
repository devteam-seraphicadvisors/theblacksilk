"use client";

import { useEffect, useRef } from "react";

interface ScrollProgressLineProps {
  className?: string;
}

// A vertical line that fills from top to bottom as its container scrolls
// through the viewport. Place inside a `relative` container; it stretches to
// the container's full height.
export function ScrollProgressLine({ className = "" }: ScrollProgressLineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleY(1)";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      // 0 when the top reaches 70% of the viewport, 1 when the bottom does
      const anchor = window.innerHeight * 0.7;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className={`absolute top-0 bottom-0 w-px bg-neutral-200 ${className}`}
    >
      <div
        ref={fillRef}
        className="absolute inset-0 bg-black origin-top"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
