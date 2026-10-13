import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  Shield,
  Database,
  Brain,
  Handshake,
  Building,
} from "lucide-react";

const featuredCommittees = [
  {
    name: "Young Members Committee",
    description:
      "Empowering the next generation of legal professionals with technology skills and networking opportunities.",
    status: "Accepting Members",
    icon: Users,
    slug: "young-members",
  },
  {
    name: "Data Policy Committee",
    description:
      "Developing comprehensive data governance policies and privacy frameworks for the legal sector.",
    status: "Open for Collaboration",
    icon: Database,
    slug: "data-policy",
  },
  {
    name: "AI Ethics Committee",
    description:
      "Establishing ethical guidelines and best practices for artificial intelligence implementation in legal services.",
    status: "Accepting Members",
    icon: Brain,
    slug: "ai-ethics",
  },
  {
    name: "Cybersecurity Committee",
    description:
      "Advancing cybersecurity standards and practices for legal organizations and their clients.",
    status: "Open for Collaboration",
    icon: Shield,
    slug: "cybersecurity",
  },
  {
    name: "Sponsorship Committee",
    description:
      "Oversees sponsorship opportunities, partnerships, and fundraising initiatives for The Black Silk.",
    status: "Active",
    icon: Handshake,
    slug: "sponsorship",
  },
  {
    name: "Law Firm Committee",
    description:
      "Engages law firms to promote best practices, training, and collaboration.",
    status: "Active",
    icon: Building,
    slug: "law-firm",
  },
];

export function CommitteesSection() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50 text-black border-b border-neutral-200">
      <div className="site-container">
        <div
          data-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Practice Groups
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-black tracking-tight mb-4">
              Specialized Practice Committees
            </h2>
            <p className="text-neutral-600 font-sans font-light leading-relaxed">
              Working groups focused on high-priority intersections of digital
              policy, corporate practice, and law.
            </p>
          </div>
          <Link
            href="/community/committees"
            className="inline-flex items-center self-start lg:self-end bg-black !text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
          >
            View All Committees
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <ul className="border-t border-black">
          {featuredCommittees.map((committee, i) => (
            <li
              key={committee.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <Link
                href={`/community/committees/${committee.slug}`}
                className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_auto_1fr_minmax(0,1.3fr)_auto] items-center gap-x-5 md:gap-x-8 gap-y-2 border-b border-neutral-300 py-6 md:py-7 px-1 md:px-4 overflow-hidden"
              >
                {/* Black fill that slides in on hover */}
                <span className="absolute inset-0 bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                <span className="relative hidden md:block font-mono text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative w-11 h-11 border border-black group-hover:border-white flex items-center justify-center transition-colors">
                  <committee.icon className="h-5 w-5 text-black group-hover:text-white transition-colors" />
                </span>
                <span className="relative min-w-0">
                  <span className="block text-xl md:text-2xl font-serif font-normal text-black group-hover:text-white transition-colors">
                    {committee.name}
                  </span>
                  <span className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    <span className="w-1.5 h-1.5 bg-black group-hover:bg-white transition-colors" />
                    {committee.status}
                  </span>
                </span>
                <span className="relative hidden md:block text-sm text-neutral-600 group-hover:text-neutral-300 font-sans leading-relaxed transition-colors">
                  {committee.description}
                </span>
                <ArrowUpRight className="relative h-5 w-5 text-black group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
