import Link from "next/link";
import { FileText } from "lucide-react";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <FileText className="h-3.5 w-3.5 mr-2 text-white" />
              <span>{eyebrow}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              {intro}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 border border-neutral-200 p-6">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">
                  Legal
                </span>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-700 hover:text-black underline-offset-4 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-6 pt-6 border-t border-neutral-200">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </aside>

            {/* Content */}
            <article className="lg:col-span-3 space-y-12">
              {sections.map((section, index) => (
                <div key={section.heading} className="border-l-2 border-black pl-6">
                  <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-normal text-black mb-4">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-neutral-700 font-sans leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-2 mb-4">
                      {section.list.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="flex items-start text-neutral-700 font-sans leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 bg-black mt-2.5 mr-3 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
