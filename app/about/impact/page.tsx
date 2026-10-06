import { generateMetadata } from "@/lib/seo";
import { MessageSquare, Calendar, FileText, MapPin, ArrowRight, ShieldCheck, Cpu, Globe2, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Our Impact — The Black Silk",
  description:
    "Measuring the tangible impact of The Black Silk across nationwide consultations, policy submissions, and ethical standards in India.",
  canonical: "https://theblacksilk.org/about/impact",
});

const stats = [
  {
    value: "25",
    label: "Discussions Held",
    description: "Structured deliberations on critical tech policy and legal ethics.",
    icon: MessageSquare,
  },
  {
    value: "5",
    label: "Events Convened",
    description: "Roundtables and stakeholder symposiums across key policy centres.",
    icon: Calendar,
  },
  {
    value: "19",
    label: "Submissions Received",
    description: "Expert papers, stakeholder briefs, and consultative inputs compiled.",
    icon: FileText,
  },
  {
    value: "15+",
    label: "Cities Reached",
    description: "Pan-India engagement uniting regional and national stakeholders.",
    icon: MapPin,
  },
];

const focusAreas = [
  {
    title: "AI Ethics & Algorithmic Governance",
    description:
      "Establishing accountability and transparency standards for autonomous systems and machine learning deployments across Indian sectors.",
    icon: Cpu,
  },
  {
    title: "Data Protection & Privacy Rights",
    description:
      "Analyzing compliance architectures and citizen safeguard thresholds in line with India's evolving digital data governance frameworks.",
    icon: ShieldCheck,
  },
  {
    title: "Cyber Resilience & Digital Evidence",
    description:
      "Addressing the challenges of digital forensic procedures, cyber vulnerability disclosure, and evidence admissibility in courts.",
    icon: Globe2,
  },
  {
    title: "Platform Accountability & Free Expression",
    description:
      "Examining intermediary liability, content moderation ethics, and the preservation of free, lawful public digital discourse.",
    icon: BookOpen,
  },
];

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Editorial Hero */}
      <section className="relative py-20 lg:py-32 bg-black text-white border-b border-neutral-800 overflow-hidden">
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
            Outcomes & Public Reach
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-8 leading-[1.1] tracking-tight">
            Our Impact
          </h1>

          <p className="text-xl sm:text-2xl !text-neutral-200 font-sans font-light leading-relaxed max-w-3xl">
            Bringing the country's most difficult digital policy questions to
            the fore and working toward solutions through inclusive discussion
            and rigorous public consultations.
          </p>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-16 sm:py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
              Since Our Founding
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-black tracking-tight">
              Platform Footprint by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-neutral-200 p-8 flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="w-10 h-10 border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6">
                    <stat.icon className="h-5 w-5 text-black" />
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl font-normal text-black mb-2">
                    {stat.value}
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-semibold mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge We Address */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                Problem Definition
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-black leading-tight">
                The Challenge We Address
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                Digital technology has many facets and a wide ecosystem. It is now
                difficult to think of any human activity without it. That ecosystem
                includes not only hardware manufacturers and software developers,
                but users as well, who are often the most vulnerable stakeholders in
                it, exposed to risks ranging from data breaches to the rapid spread
                of misinformation.
              </p>
              <p>
                The sheer volume of information in the digital world, and the
                speed at which it moves, can itself put stakeholders at risk faster
                than existing safeguards can keep up.
              </p>
              <div className="p-6 border-l-2 border-black bg-neutral-50 font-serif text-lg text-black italic">
                “The Black Silk works across the technology sector, bringing the
                country's most difficult digital policy questions to the fore and
                working toward solutions through inclusive discussion.”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas & Strategic Workstreams */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Strategic Focus Areas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Where Our Deliberations Focus
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Our committees and working groups direct their attention where
              regulatory thresholds are newest, highest-stakes, and least settled.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="border border-neutral-200 p-8 sm:p-10 hover:border-black transition-colors bg-white flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-black mb-3">
                    {area.title}
                  </h3>
                  <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Track Record & Callout */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-black text-white p-8 sm:p-12 border border-black">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-mono !text-neutral-400 block mb-3">
                Evolving Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">
                Growing Our Track Record
              </h2>
              <p className="!text-neutral-300 font-sans text-sm sm:text-base leading-relaxed mb-8">
                We are early in building our track record, and this section will
                grow as discussions completed through the Black Silk Framework
                translate into published outcomes and adopted recommendations.
                Check back as we add real examples of our work in practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  href="/about/approach"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black px-6 py-3 font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors border border-white"
                >
                  <span>See How We Work</span>
                  <ArrowRight className="ml-2 h-4 w-4 text-black" />
                </Link>
                <Link
                  href="/community/committees"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-white px-6 py-3 font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors border border-white"
                >
                  <span>Explore Committees</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
