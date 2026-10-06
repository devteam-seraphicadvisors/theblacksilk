"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { CallToAction } from "@/components/call-to-action";

export function Footer() {
  const pathname = usePathname();

  // Don't render footer on dashboard pages, admin pages, or maintenance page
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/maintenance") ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
  ) {
    return null;
  }

  return (
    <>
      <CallToAction />
      <footer className="bg-black text-white border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-7xl pt-16 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand & Organization Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block group">
              {/* Exact Logo from Navbar, inverted for crisp display on pure black */}
              <div className="relative w-[150px] h-[42px] sm:w-[170px] sm:h-[48px] invert">
                <Image
                  src="/images/logo.png"
                  alt="The Black Silk Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="!text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md font-sans font-light">
              A not-for-profit organization working toward the ethical development
              and judicious use of digital technologies for the greater good,
              bringing together academicians, policymakers, lawmakers, and expert
              professionals.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <Link
                href="https://x.com/TheBlackSilk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:bg-white hover:border-white transition-all group"
              >
                <div className="relative w-4 h-4 invert group-hover:invert-0 transition-all">
                  <Image src="/icons/x.svg" alt="X" fill className="object-contain" />
                </div>
              </Link>

              <Link
                href="https://www.linkedin.com/company/the-black-silk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:bg-white hover:border-white transition-all group"
              >
                <div className="relative w-4 h-4 invert group-hover:invert-0 transition-all">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" fill className="object-contain" />
                </div>
              </Link>

              <Link
                href="https://www.facebook.com/TheBlackSilk.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:bg-white hover:border-white transition-all group"
              >
                <div className="relative w-4 h-4 invert group-hover:invert-0 transition-all">
                  <Image src="/icons/facebook.svg" alt="Facebook" fill className="object-contain" />
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation Column 1: Platform (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 block mb-2">
              Platform
            </span>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Membership", href: "/community/membership" },
                { name: "Committees", href: "/community/committees" },
                { name: "Events", href: "/events" },
                { name: "Forum", href: "/forum" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="!text-neutral-300 hover:!text-white transition-colors duration-200 text-sm group inline-flex items-center"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 2: Knowledge & Network (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 block mb-2">
              Knowledge
            </span>
            <ul className="space-y-3">
              {[
                { name: "Insights & Blog", href: "/knowledge-hub/blog" },
                { name: "Fact Sheets", href: "/knowledge-hub/fact-sheets" },
                { name: "Newsletter", href: "/knowledge-hub/newsletter" },
                { name: "Legal Tech Careers", href: "/careers/jobs" },
                { name: "Mentorship", href: "/careers/mentorship" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="!text-neutral-300 hover:!text-white transition-colors duration-200 text-sm group inline-flex items-center"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 3: Newsletter (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 block mb-2">
              Stay Informed
            </span>
            <p className="!text-neutral-300 text-sm leading-relaxed font-sans">
              Receive updates on public consultations, whitepapers, and legal-tech roundtables.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-500 px-4 py-3 text-sm rounded-none focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-wider py-3 px-4 border border-white transition-all cursor-pointer flex items-center justify-center group"
              >
                <span>Subscribe to Briefs</span>
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 text-black" />
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="py-8 border-b border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm !text-neutral-300 font-sans">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-none border border-neutral-800 bg-neutral-950 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span>New Delhi, India</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-none border border-neutral-800 bg-neutral-950 flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <a href="mailto:info@blacksilk.org" className="hover:text-white transition-colors">
                info@blacksilk.org
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-none border border-neutral-800 bg-neutral-950 flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <a href="tel:+911112345678" className="hover:text-white transition-colors">
                +91 11 1234 5678
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono !text-neutral-400">
          <p>© 2026 The Black Silk. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </>
);
}
