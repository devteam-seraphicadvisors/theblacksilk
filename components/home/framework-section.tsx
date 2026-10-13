import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { frameworkStages } from "@/lib/framework";
import { ScrollProgressLine } from "@/components/motion/scroll-progress-line";

export function FrameworkSection() {
  return (
    <section className="py-20 lg:py-32 bg-white border-b border-neutral-200">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Pinned intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32" data-reveal>
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                How We Work
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-normal text-black tracking-tight leading-[1.05] mb-6">
                The Black Silk Framework
              </h2>
              <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed mb-8 max-w-md">
                Every discussion follows a four-stage methodology to ensure
                legitimacy, rigor, and impact.
              </p>
              <Link
                href="/about/approach"
                className="inline-flex items-center bg-black !text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
              >
                Our Approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Timeline */}
          <ol className="lg:col-span-7 relative pl-10 md:pl-16">
            <ScrollProgressLine className="left-[11px] md:left-[19px]" />

            {frameworkStages.map((stage, i) => (
              <li
                key={stage.stage}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className="relative pb-14 last:pb-0"
              >
                {/* Marker on the line */}
                <span className="absolute -left-10 md:-left-16 top-3 w-6 md:w-10 flex justify-center">
                  <span className="w-3 h-3 bg-black ring-[6px] ring-white" />
                </span>

                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 md:gap-8">
                  <span className="text-outline font-serif text-5xl sm:text-6xl md:text-7xl leading-none select-none sm:w-16 md:w-24 shrink-0">
                    {stage.stage}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-black mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-neutral-600 font-sans leading-relaxed mb-5">
                      {stage.summary}
                    </p>
                    <ul className="space-y-2">
                      {stage.deliverables.slice(0, 2).map((item) => (
                        <li
                          key={item}
                          className="flex items-start text-sm text-neutral-700 font-sans"
                        >
                          <span className="w-1.5 h-1.5 bg-black mt-2 mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
