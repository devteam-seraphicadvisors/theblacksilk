import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      {/* Subtle Monochrome Geometric Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-block px-3 py-1 border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-6">
          Get Involved
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-white mb-6 leading-tight">
          Not a Member? Join Us.
        </h2>

        <p className="text-lg sm:text-xl !text-neutral-100 font-sans font-normal leading-relaxed max-w-2xl mx-auto mb-10">
          Membership gives you a voice in shaping the ethical standards of the
          digital future. Explore our membership tiers and become part of the
          conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/community/membership"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 hover:text-black transition-all duration-200 rounded-none px-6 py-3 font-semibold text-sm sm:text-base tracking-wide border-2 border-white shadow-md cursor-pointer group"
          >
            <span className="text-black font-semibold">Become a Member</span>
            <ArrowRight className="ml-2 h-4 w-4 text-black" />
          </Link>

          <Link
            href="/membership"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-black/50 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 rounded-none px-6 py-3 font-semibold text-sm sm:text-base tracking-wide shadow-md cursor-pointer group"
          >
            <span className="text-white group-hover:text-black transition-colors font-semibold">
              Explore Membership Tiers
            </span>
            <ArrowUpRight className="ml-2 h-4 w-4 text-white group-hover:text-black transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
}
