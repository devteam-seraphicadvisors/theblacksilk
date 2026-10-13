import type { CSSProperties } from "react";
import { MessageSquare, CalendarDays, FileCheck, MapPin } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";

// Official figures from the approved content specification (content.md §2.5).
const stats = [
  {
    value: 25,
    label: "Discussions Held",
    description: "Structured stakeholder consultations and policy roundtables",
    icon: MessageSquare,
  },
  {
    value: 5,
    label: "Events Convened",
    description: "National symposiums, forums, and specialized workshops",
    icon: CalendarDays,
  },
  {
    value: 19,
    label: "Submissions Received",
    description: "Whitepapers, stakeholder feedback, and policy recommendations",
    icon: FileCheck,
  },
  {
    value: 15,
    suffix: "+",
    label: "Cities",
    description: "Active participation and representation across India",
    icon: MapPin,
  },
];

export function Stats() {
  return (
    <section id="home-stats" className="bg-white text-black border-b border-neutral-200">
      <div className="site-container py-20 lg:py-28">
        <div
          data-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Since our founding
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Measurable National Impact
            </h2>
          </div>
          <p className="text-neutral-600 font-sans font-light leading-relaxed max-w-md">
            Bringing together India&apos;s legal practitioners, policy architects, and
            technology leaders through structured dialogue and evidence-based
            recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-200">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
              className="group relative border-r border-b border-neutral-200 p-8 lg:p-10 bg-white hover:bg-black transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-10 h-10 border border-neutral-200 group-hover:border-neutral-700 flex items-center justify-center transition-colors">
                  <stat.icon className="h-4 w-4 text-black group-hover:text-white transition-colors" />
                </span>
              </div>

              <div className="text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-none mb-6 text-black group-hover:text-white transition-colors">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest mb-3 text-black group-hover:text-white transition-colors">
                {stat.label}
              </div>
              <p className="text-sm font-sans leading-relaxed text-neutral-600 group-hover:text-neutral-400 transition-colors">
                {stat.description}
              </p>

              {/* Accent line that extends on hover */}
              <span className="absolute left-0 bottom-0 h-[3px] w-12 bg-black group-hover:bg-white group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
