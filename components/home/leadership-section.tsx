import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import leadership from "@/data/leadership.json";
import { GavelIllustration } from "@/components/home/gavel-illustration";

export function LeadershipSection() {
  const leaders = leadership.executiveBoard;

  return (
    <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div data-reveal className="draw-on-reveal">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-black tracking-tight mb-5">
              The People Behind The Black Silk
            </h2>
            <p className="text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Our executive board brings together experience across law,
              mediation, public policy, and public life.
            </p>
            <Link
              href="/about/leadership"
              className="inline-flex items-center border border-black text-black hover:bg-black hover:!text-white font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
            >
              Meet the Leadership
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* Shown at every size on purpose: inside a `display: none`
                (e.g. `hidden lg:block`) subtree, Chrome does not paint the
                line-drawing animation even after it becomes visible. */}
            <GavelIllustration className="mt-12 lg:mt-14 w-36 lg:w-56 text-black" />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {leaders.map((leader, i) => (
              <Link
                key={leader.name}
                data-reveal
                style={{ "--reveal-delay": `${(i + 1) * 120}ms` } as CSSProperties}
                href="/about/leadership"
                className="group bg-white border border-neutral-200 hover:border-black transition-colors flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-2">
                    {leader.position}
                  </span>
                  <h3 className="text-2xl font-serif font-normal text-black mb-3">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    {leader.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
