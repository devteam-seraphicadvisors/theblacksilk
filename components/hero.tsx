import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden no-scrollbar bg-black text-white">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/902919321?background=1&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&playsinline=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none grayscale contrast-110 brightness-100 opacity-90"
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
      <div className="relative z-10 container mx-auto px-4 py-16 text-center max-w-5xl">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal tracking-tight text-white mb-8 leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          The Black Silk
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white font-sans font-normal mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          The Black Silk is a not-for-profit organization working toward the ethical
          development and judicious use of digital technologies for the greater
          good, bringing together academicians, policymakers, lawmakers, and expert
          professionals to shape practical standards for the digital world.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-800" />
    </section>
  );
}
