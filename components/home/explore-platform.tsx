import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Users,
  MessagesSquare,
  BadgeCheck,
  Handshake,
  PlayCircle,
} from "lucide-react";

// Every major section of the site, so first-time visitors can see the whole
// platform at a glance.
const tiles = [
  {
    title: "Knowledge Hub",
    description:
      "Articles, fact sheets, and a weekly newsletter translating our discussions into practical guidance.",
    href: "/knowledge-hub",
    icon: BookOpen,
    links: [
      { name: "Blog", href: "/knowledge-hub/blog" },
      { name: "Fact Sheets", href: "/knowledge-hub/fact-sheets" },
      { name: "Newsletter", href: "/knowledge-hub/newsletter" },
    ],
  },
  {
    title: "Expert Committees",
    description:
      "13 working groups on AI, data policy, cybersecurity, privacy, and the future of legal practice.",
    href: "/community/committees",
    icon: Users,
  },
  {
    title: "Community Forum",
    description:
      "Discuss law, technology, ethics, and digital policy with practitioners. Free to join.",
    href: "/forum",
    icon: MessagesSquare,
  },
  {
    title: "Membership",
    description:
      "Six individual and four institutional tiers, from ₹1,500 a year. Or start with a free account.",
    href: "/community/membership",
    icon: BadgeCheck,
  },
  {
    title: "Partnerships & Sponsorship",
    description:
      "Collaborate on research and programs, or sponsor our events and community.",
    href: "/get-involved/partnerships",
    icon: Handshake,
  },
];

export function ExplorePlatform() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
      <div className="site-container">
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Explore the Platform
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Everything The Black Silk Offers
            </h2>
          </div>
          <p className="text-neutral-600 font-sans font-light leading-relaxed max-w-md">
            From recorded discussions and research to committees, a community
            forum, and membership, here is where to start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Feature tile: Events & Podcasts */}
          <Link
            href="/events"
            data-reveal
            className="group relative md:col-span-2 lg:row-span-2 min-h-[360px] lg:min-h-[520px] overflow-hidden bg-black text-white flex flex-col justify-end"
          >
            <Image
              src="/images/event-symposium.jpg"
              alt="An audience at a Black Silk discussion"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover grayscale opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative p-8 md:p-10">
              <span className="inline-flex items-center gap-2 bg-white text-black font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 mb-5">
                <PlayCircle className="h-3.5 w-3.5" />
                Events & Podcasts
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-normal text-white leading-tight mb-3 max-w-xl">
                Watch the conversations shaping India&apos;s digital policy
              </h3>
              <p className="text-neutral-300 font-sans font-light leading-relaxed max-w-lg mb-6">
                Recorded colloquies, roundtables, and upcoming premieres with
                jurists, policymakers, and technology leaders.
              </p>
              <span className="inline-flex items-center font-mono text-xs uppercase tracking-wider text-white">
                Browse events
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </Link>

          {tiles.map((tile, i) => (
            <div
              key={tile.title}
              data-reveal
              style={{ "--reveal-delay": `${(i + 1) * 100}ms` } as CSSProperties}
              className="group relative bg-white border border-neutral-200 hover:border-black transition-colors p-7 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 bg-black flex items-center justify-center">
                  <tile.icon className="h-5 w-5 text-white" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-neutral-300 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-normal text-black mb-2">
                <Link href={tile.href} className="after:absolute after:inset-0">
                  {tile.title}
                </Link>
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                {tile.description}
              </p>
              {tile.links && (
                <div className="relative z-10 flex flex-wrap gap-2 mt-5">
                  {tile.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border border-neutral-300 hover:border-black hover:bg-black hover:text-white font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
