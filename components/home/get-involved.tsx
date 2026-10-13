import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, UserPlus, BadgeCheck, Handshake, Mail } from "lucide-react";
import { CourthouseIllustration } from "@/components/home/courthouse-illustration";

const paths = [
  {
    icon: UserPlus,
    eyebrow: "Free",
    title: "Create a Free Account",
    description:
      "Set up your profile, join the community forum, and explore the member panel. No payment required.",
    href: "/register",
    cta: "Sign up free",
  },
  {
    icon: BadgeCheck,
    eyebrow: "From ₹1,500 / year",
    title: "Become a Member",
    description:
      "Gain a voice in shaping ethical standards, with tiers for students, advocates, counsel, and institutions.",
    href: "/community/membership",
    cta: "View tiers",
    featured: true,
  },
  {
    icon: Handshake,
    eyebrow: "Organizations",
    title: "Partner or Sponsor",
    description:
      "Collaborate on research and programs, or sponsor our events and community.",
    href: "/get-involved/partnerships",
    cta: "Explore partnerships",
  },
  {
    icon: Mail,
    eyebrow: "Weekly",
    title: "Read the Newsletter",
    description:
      "Synthesized regulatory intelligence on law, technology, and digital policy.",
    href: "/knowledge-hub/newsletter",
    cta: "Subscribe",
  },
];

export function GetInvolved() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="site-container">
        <div data-reveal className="draw-on-reveal text-center max-w-2xl mx-auto mb-14">
          <CourthouseIllustration className="w-36 md:w-44 mx-auto mb-8 text-black" />
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
            Participate
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal text-black tracking-tight mb-4">
            Ways to Join the Conversation
          </h2>
          <p className="text-neutral-600 font-sans font-light leading-relaxed">
            Whether you are exploring, joining, or partnering, there is a place
            for you at The Black Silk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {paths.map((path, i) => (
            <Link
              key={path.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
              href={path.href}
              className={`group flex flex-col p-8 border transition-colors ${
                path.featured
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-neutral-200 hover:border-black"
              }`}
            >
              <div
                className={`w-11 h-11 flex items-center justify-center mb-8 ${
                  path.featured ? "bg-white" : "bg-black"
                }`}
              >
                <path.icon className={`h-5 w-5 ${path.featured ? "text-black" : "text-white"}`} />
              </div>
              <span
                className={`font-mono text-[11px] uppercase tracking-widest mb-2 ${
                  path.featured ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {path.eyebrow}
              </span>
              <h3
                className={`text-2xl font-serif font-normal mb-3 ${
                  path.featured ? "text-white" : "text-black"
                }`}
              >
                {path.title}
              </h3>
              <p
                className={`text-sm font-sans leading-relaxed mb-8 ${
                  path.featured ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                {path.description}
              </p>
              <span
                className={`mt-auto inline-flex items-center font-mono text-xs uppercase tracking-wider ${
                  path.featured ? "text-white" : "text-black"
                }`}
              >
                {path.cta}
                <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
