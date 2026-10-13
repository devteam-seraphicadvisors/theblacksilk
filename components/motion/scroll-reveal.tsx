"use client";

import { useEffect } from "react";

// Reveals every [data-reveal] element on the page as it scrolls into view
// (styles in globals.css). Mount once per page. Elements stay visible if this
// never runs, because they are only hidden once html.reveal-ready is set.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (elements.length === 0) return;

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
