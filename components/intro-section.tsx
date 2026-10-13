import Link from "next/link";
import type { CSSProperties } from "react";
import { Scale, ScrollText, Landmark, ArrowRight } from "lucide-react";
import { ScalesIllustration } from "@/components/home/scales-illustration";

export function IntroSection() {
  const pillars = [
    {
      title: "Discussions and Consultations",
      description:
        "We convene stakeholders for frank, structured conversations on emerging digital technologies and the ethical and legal questions they raise.",
      icon: Scale,
      index: "01",
      href: "/events",
      cta: "Watch the discussions",
    },
    {
      title: "Publications and Research",
      description:
        "We publish articles and research papers that translate our discussions into practical guidance for the field.",
      icon: ScrollText,
      index: "02",
      href: "/knowledge-hub",
      cta: "Read our work",
    },
    {
      title: "National Engagement",
      description:
        "We address the ethical and legal challenges of India's digital technology landscape, working with stakeholders across sectors and regions.",
      icon: Landmark,
      index: "03",
      href: "/about/impact",
      cta: "See our impact",
    },
  ];

  return (
    <section className="bg-white text-black py-20 lg:py-28 border-b border-neutral-200">
      <div className="site-container">
        {/* Intro Block */}
        <div data-reveal className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif !text-black leading-relaxed font-normal">
            “We hold public consultations and structured discussions on the hardest
            questions in digital technology, from data protection to artificial
            intelligence, and work with our members to set ethical thresholds that
            safeguard everyone's interests. Our discussions bring people from every
            side of the issue into the same room to find solutions through open,
            inclusive debate.”
          </p>
        </div>

        {/* "Why This Matters" Feature Card */}
        <div
          data-reveal
          className="draw-on-reveal bg-black text-white p-8 md:p-14 mb-24 border border-black grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10"
        >
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-mono !text-neutral-400 block mb-4">
              The Mission
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-6 !text-white leading-tight">
              Why This Matters
            </h2>
            <p className="text-lg md:text-xl !text-neutral-100 font-light leading-relaxed">
              Digital technology now touches nearly every aspect of human life, and its
              risks fall hardest on the users who have the least power to shape it. The
              Black Silk exists to change that.
            </p>
          </div>
          <ScalesIllustration className="w-40 md:w-56 lg:w-64 mx-auto text-white" />
        </div>

        {/* "What We Do" Section */}
        <div>
          <div data-reveal className="text-center md:text-left mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
              Our Core Functions
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-black">
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.title}
                  href={pillar.href}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
                  className="border border-black p-8 bg-white flex flex-col justify-between hover:bg-neutral-50 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-mono text-sm text-neutral-400 font-medium">
                        {pillar.index}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-medium text-black mb-4 group-hover:underline underline-offset-4">
                      {pillar.title}
                    </h3>
                    <p className="text-neutral-800 font-sans text-base leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center font-mono text-xs uppercase tracking-wider text-black">
                    {pillar.cta}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
