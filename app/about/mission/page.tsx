import { generateMetadata } from "@/lib/seo";
import { Users, Scale, ShieldCheck, BookOpen, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Our Mission — The Black Silk",
  description:
    "The Black Silk brings lawmakers, policymakers, academicians, and technology professionals into direct dialogue to shape practical standards for digital technologies in India.",
  canonical: "https://theblacksilk.org/about/mission",
});

const values = [
  {
    title: "Inclusivity",
    description:
      "Every stakeholder, from regulators to end users, has a seat at the table in shaping the future of digital technology in India.",
    icon: Users,
    number: "01",
  },
  {
    title: "Impartiality",
    description:
      "New opportunities in technology should be available to everyone equally, not concentrated among those with the most resources or influence.",
    icon: Scale,
    number: "02",
  },
  {
    title: "Accountability",
    description:
      "Those who build and deploy digital technology bear responsibility for its consequences, and our discussions hold that responsibility in view.",
    icon: ShieldCheck,
    number: "03",
  },
  {
    title: "Rigor",
    description:
      "Our positions are built on research, consultation, and evidence, not assumption.",
    icon: BookOpen,
    number: "04",
  },
  {
    title: "National Relevance",
    description:
      "We root our work in the specific legal, regulatory, and social realities of India, rather than borrowing frameworks built for other jurisdictions.",
    icon: Compass,
    number: "05",
  },
];

const pillars = [
  {
    step: "01",
    title: "Convene",
    description:
      "We create the room where lawmakers, regulators, academicians, and technology professionals can speak frankly about the hardest questions in Indian digital policy.",
  },
  {
    step: "02",
    title: "Consult",
    description:
      "We open our discussions to public consultation, so that solutions are shaped by the people they affect, not decided without them.",
  },
  {
    step: "03",
    title: "Research and Publish",
    description:
      "We turn discussion into documented guidance, giving our conclusions a lasting, citable form through articles and research papers.",
  },
  {
    step: "04",
    title: "Advocate",
    description:
      "We carry those conclusions to the policymakers and institutions positioned to act on them, so that dialogue translates into real thresholds and standards within India.",
  },
];

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Editorial Hero */}
      <section className="relative py-20 lg:py-32 bg-black text-white border-b border-neutral-800 overflow-hidden">
        {/* Subtle monochrome geometric texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="inline-block px-3 py-1 border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-6">
            Mission & Purpose
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-8 leading-[1.1] tracking-tight">
            Our Mission
          </h1>

          <p className="text-xl sm:text-2xl !text-neutral-200 font-sans font-light leading-relaxed max-w-3xl">
            Closing the gap between technological power and user protection by
            bringing lawmakers, academicians, and technologists into direct,
            structured dialogue.
          </p>
        </div>
      </section>

      {/* Core Mission Statement */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="border-l-4 border-black pl-8 sm:pl-12 py-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">
              The Guiding Purpose
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif leading-relaxed text-black font-normal">
              “The Black Silk exists because digital technology now shapes
              nearly every part of human life, yet the people most affected by
              it—everyday users—are often the least equipped to influence how it
              is built and governed. Our mission is to close that gap.”
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-700 leading-relaxed font-sans text-base sm:text-lg">
            <p>
              We bring lawmakers, policymakers, academicians, and technology
              professionals into direct, structured dialogue, so that the rules
              governing digital technology in India are shaped with the people
              they affect, not just for them.
            </p>
            <p>
              By setting ethical thresholds, examining the legal ramifications of
              breakthrough technologies, and holding public consultations, we ensure
              that national policy is informed by evidence, rigorous deliberation,
              and cross-sector consensus.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Foundational Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Our Vision and Values
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Five principles define our identity, shape our research agendas, and
              guide every deliberation we host.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white border border-neutral-200 p-8 hover:border-black transition-colors duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-neutral-400">
                      {val.number}
                    </span>
                    <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center bg-neutral-50">
                      <val.icon className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-black mb-3">
                    {val.title}
                  </h3>
                  <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Anchor Card */}
            <div className="bg-black text-white p-8 flex flex-col justify-between border border-black">
              <div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-4">
                  Ethical Framework
                </span>
                <h3 className="text-2xl font-serif text-white mb-4">
                  Governing for the Greater Good
                </h3>
                <p className="!text-neutral-300 font-sans text-sm leading-relaxed mb-6">
                  Digital progress is only sustainable when grounded in public trust,
                  equitable access, and robust legal accountability.
                </p>
              </div>
              <Link
                href="/about/approach"
                className="inline-flex items-center text-xs uppercase tracking-widest font-mono text-white hover:text-neutral-300 transition-colors group"
              >
                <span>Explore Our Approach</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - 4 Core Pillars */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Operational Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              How We Work
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Our mission is realized through four continuous, interdependent
              workstreams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-neutral-200 p-8 flex flex-col justify-between hover:border-black transition-colors bg-white group"
              >
                <div>
                  <div className="font-mono text-2xl font-light text-neutral-300 group-hover:text-black transition-colors mb-6">
                    {pillar.step}
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-600 font-sans text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
