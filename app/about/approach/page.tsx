import { generateMetadata } from "@/lib/seo";
import { Users, FileSearch, ShieldCheck, Scale, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Our Approach — The Black Silk",
  description:
    "Explore The Black Silk Framework: our uniform methodology for structured, evidence-based dialogue and actionable policy guidance in India.",
  canonical: "https://theblacksilk.org/about/approach",
});

const principles = [
  {
    title: "Stakeholder-Led",
    description:
      "Every discussion includes the people actually affected by the issue at hand, not only legal or policy experts.",
    icon: Users,
    number: "01",
  },
  {
    title: "Evidence-Based",
    description:
      "Our conclusions are grounded in research and real-world input, not assumption or precedent borrowed from elsewhere.",
    icon: FileSearch,
    number: "02",
  },
  {
    title: "Transparent Process",
    description:
      "How we reach a position is as important as the position itself, and our process is open to scrutiny.",
    icon: ShieldCheck,
    number: "03",
  },
  {
    title: "Non-Partisan",
    description:
      "We do not represent any single industry, government body, or interest group; our role is to convene, not to advocate for one side.",
    icon: Scale,
    number: "04",
  },
];

const frameworkStages = [
  {
    stage: "01",
    title: "Identify the Issue",
    summary:
      "Rigorous horizon-scanning and relevance validation across the Indian regulatory landscape.",
    deliverables: [
      "Monitor emerging developments in digital technology & legal/ethical questions",
      "Flag issues with direct relevance to India's regulatory context",
      "Consult early with members and partners to confirm merit",
      "Define specific questions the discussion needs to answer",
    ],
  },
  {
    stage: "02",
    title: "Convene Stakeholders",
    summary:
      "Bringing multi-disciplinary voices together with shared materials and explicit objectives.",
    deliverables: [
      "Identify and invite diverse voices (lawmakers, academicians, tech leaders, users)",
      "Structure format: public consultation, closed roundtable, or committee review",
      "Share comprehensive background material and research in advance",
      "Set out clear scope and intended outcomes before beginning",
    ],
  },
  {
    stage: "03",
    title: "Deliberate and Analyze",
    summary:
      "Facilitating structured deliberation that surfaces friction, tests solutions, and maps consensus.",
    deliverables: [
      "Facilitate open, frank discussion without favoring any interest",
      "Capture the full range of positions raised, including dissent",
      "Stress-test proposed solutions against practical and ethical tests",
      "Map where consensus exists and where divergence remains",
    ],
  },
  {
    stage: "04",
    title: "Publish and Advocate",
    summary:
      "Translating dialogue into actionable guidance delivered directly to regulatory bodies.",
    deliverables: [
      "Document conclusions in clear, citable, and practical formats",
      "Publish findings as articles, whitepapers, or formal position statements",
      "Share outcomes directly with policymakers and institutions positioned to act",
      "Track whether and how resulting recommendations are adopted",
    ],
  },
];

export default function ApproachPage() {
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
            Methodology & Process
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-8 leading-[1.1] tracking-tight">
            Our Approach
          </h1>

          <p className="text-xl sm:text-2xl !text-neutral-200 font-sans font-light leading-relaxed max-w-3xl">
            The Black Silk's work rests on a simple idea: the best answers to
            digital technology's hardest questions come from structured,
            inclusive dialogue among the people who understand the problem from
            different sides—not from any single voice working alone.
          </p>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Guiding Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Core Principles
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Four fundamental rules guide how we frame discussions, invite
              participants, and construct policy guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item) => (
              <div
                key={item.title}
                className="border border-neutral-200 p-8 flex flex-col justify-between hover:border-black transition-colors bg-white group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-black transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center bg-neutral-50 group-hover:bg-black group-hover:text-white transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 font-sans text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Black Silk Framework */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              End-To-End Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              The Black Silk Framework
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Every discussion convened by The Black Silk follows this uniform
              four-stage methodology to ensure legitimacy, rigor, and impact.
            </p>
          </div>

          <div className="space-y-6">
            {frameworkStages.map((phase) => (
              <div
                key={phase.stage}
                className="bg-white border border-neutral-200 p-8 sm:p-10 hover:border-black transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="font-mono text-3xl font-light text-neutral-400 mb-2">
                      Stage {phase.stage}
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-black mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
                      {phase.summary}
                    </p>
                  </div>

                  <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-6 lg:pt-0 lg:pl-8">
                    <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">
                      Key Deliverables & Protocols
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phase.deliverables.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm text-neutral-700 leading-relaxed font-sans"
                        >
                          <div className="w-4 h-4 rounded-none border border-black bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5 mr-2.5">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & Track Record */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="border border-neutral-200 p-8 sm:p-12 bg-neutral-50">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                Track Record & Practical Outcomes
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-black mb-4">
                Success Stories & Case Outcomes
              </h2>
              <p className="text-neutral-700 font-sans text-base leading-relaxed mb-6">
                We are early in building our track record, and this section will
                grow as discussions completed through the Black Silk Framework
                translate into published outcomes and adopted recommendations.
                Check back as we add real examples of our work in practice.
              </p>
              <Link
                href="/knowledge-hub/blog"
                className="inline-flex items-center text-xs uppercase tracking-widest font-mono text-black hover:text-neutral-600 transition-colors font-semibold group"
              >
                <span>Read our latest published papers & briefs</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
