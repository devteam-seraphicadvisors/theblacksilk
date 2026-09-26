"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function MaintenancePage() {
  // 7 days countdown timer
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const storageKey = "tbs_maintenance_target_7d";
    let targetTime: number;
    const stored = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

    if (stored && !isNaN(Number(stored)) && Number(stored) > Date.now()) {
      targetTime = Number(stored);
    } else {
      // 7 days from now (or fresh repeat)
      targetTime = Date.now() + SEVEN_DAYS_MS;
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, targetTime.toString());
      }
    }

    const updateTimer = () => {
      const now = Date.now();
      let difference = targetTime - now;

      // When timer ends, automatically repeat the 7 days timer
      if (difference <= 0) {
        targetTime = Date.now() + SEVEN_DAYS_MS;
        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, targetTime.toString());
        }
        difference = targetTime - Date.now();
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-y-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Background Subtle Gradient & Mesh */}
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-900/60 via-black to-black pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Minimal Top Header - Clean Logo Only */}
      <header className="relative z-10 w-full pt-4 sm:pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center sm:justify-start">
          <Link href="/" className="relative w-[140px] sm:w-[150px] h-[36px] sm:h-[40px] block">
            <Image
              src="/images/logo.png"
              alt="The Black Silk"
              fill
              priority
              className="object-contain filter brightness-125"
            />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-4 sm:py-6">
        <div className="max-w-2xl w-full mx-auto text-center space-y-5 sm:space-y-6">

          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-white/[0.06] text-neutral-300 border border-white/10 backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              Scheduled Maintenance
            </span>
          </div>

          {/* Heading & Narrative */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
              We Are Currently Undergoing Scheduled Maintenance
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
              <span className="text-white font-medium">The Black Silk</span> is undergoing planned infrastructure updates and system enhancements to deliver an improved platform experience.
            </p>
          </div>

          {/* Countdown Clock - 7 Days */}
          <div className="bg-neutral-950/80 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl max-w-md mx-auto">
            <div className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4 sm:mb-5">
              Estimated System Restoration In
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-xl bg-neutral-900/90 border border-white/10 shadow-inner"
                >
                  <span className="text-xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-neutral-400 uppercase tracking-wider mt-1 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-1 text-xs sm:text-sm text-neutral-400">
            <p>
              For urgent inquiries, please contact{" "}
              <a
                href="mailto:contact@theblacksilk.org"
                className="text-white hover:text-neutral-300 underline underline-offset-4 transition-colors font-medium"
              >
                contact@theblacksilk.org
              </a>
            </p>
          </div>

        </div>
      </main>

      {/* Footer Area */}
      <footer className="relative z-10 w-full bg-black/80 py-4 text-center text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} The Black Silk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
