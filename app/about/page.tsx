import { generateMetadata } from "@/lib/seo";
import { ArrowRight, Compass, Users, Layers, Award } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "About The Black Silk — Ethical Standards & Policy for Digital Technologies",
  description:
    "The Black Silk is a not-for-profit organization working toward the ethical development and judicious use of digital technologies for the greater good.",
  canonical: "https://theblacksilk.org/about",
});

const subpages = [
  {
    title: "Our Mission",
    href: "/about/mission",
    description:
      "Our guiding purpose, 5 foundational values, and the 4 pillars of how we work.",
    icon: Compass,
  },
  {
    title: "Leadership & Governance",
    href: "/about/leadership",
    description:
      "Meet President KPS Kohli, Secretary Roopa Somasundaran, and our governance structure.",
    icon: Users,
  },
  {
    title: "Our Approach",
    href: "/about/approach",
    description:
      "The 4 core principles and our 4-stage Black Silk Framework for stakeholder deliberation.",
    icon: Layers,
  },
  {
    title: "Our Impact",
    href: "/about/impact",
    description:
      "Our nationwide reach, problem statement, and key engagement metrics since founding.",
    icon: Award,
  },
];

export default function AboutPage() {
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
            About Organization
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-8 leading-[1.1] tracking-tight">
            About The Black Silk
          </h1>

          <p className="text-xl sm:text-2xl !text-neutral-200 font-sans font-light leading-relaxed max-w-3xl">
            A not-for-profit organization working toward the ethical development
            and judicious use of digital technologies for the greater good.
          </p>
        </div>
      </section>

      {/* Overview & Purpose */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="border-l-4 border-black pl-8 sm:pl-12 py-4 mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">
              Convening for the Digital Age
            </span>
            <p className="text-2xl sm:text-3xl font-serif leading-relaxed text-black font-normal">
              “We convene academicians, policymakers, lawmakers, and expert
              professionals to address the community, global, moral, ethical,
              legal, local, and personal dimensions of digital technology
              through open, inclusive discussion.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-700 leading-relaxed font-sans text-base sm:text-lg">
            <div>
              <h2 className="text-xl font-serif text-black mb-3 font-semibold">
                The Challenge We Address
              </h2>
              <p>
                Digital technology has many facets and a wide ecosystem. It is now
                difficult to think of any human activity without it. That ecosystem
                includes not only hardware manufacturers and software developers, but
                users as well, who are often the most vulnerable stakeholders in it,
                exposed to risks ranging from data breaches to the rapid spread of
                misinformation.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-serif text-black mb-3 font-semibold">
                Our Reach Across Sectors
              </h2>
              <p>
                The Black Silk works across the technology sector, bringing the
                country&apos;s most difficult digital policy questions to the fore and
                working toward solutions through inclusive discussion. We bring
                stakeholders together for frank discussion on the ethical and legal
                thresholds needed to govern digital technology in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory of About Sections */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Explore Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              About Us Sections
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Learn in detail about our core mission, executive leadership,
              methodology, and documented impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {subpages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-neutral-200 p-8 sm:p-10 hover:border-black transition-all block group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 border border-neutral-200 bg-neutral-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
