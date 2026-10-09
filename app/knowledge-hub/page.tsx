import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateSeoMetadata({
  title: "Knowledge Hub - The Black Silk",
  description:
    "Explore our repository of expert research, technical insights, policy fact sheets, and legal analysis on the frontier of law and technology.",
  canonical: "https://theblacksilk.org/knowledge-hub",
});

const sections = [
  {
    title: "Blog & Insights",
    description:
      "Expert analysis, thought leadership, and deep dives on artificial intelligence, algorithmic governance, digital evidence, and cybersecurity law.",
    href: "/knowledge-hub/blog",
    badge: "Editorial & Analysis",
    icon: BookOpen,
    cta: "Explore Articles",
  },
  {
    title: "Fact Sheets",
    description:
      "Concise, high-impact policy briefings and regulatory cheat sheets designed for legal practitioners, policymakers, and corporate counsel.",
    href: "/knowledge-hub/fact-sheets",
    badge: "Policy & Frameworks",
    icon: FileText,
    cta: "View Fact Sheets",
  },
  {
    title: "Newsletter",
    description:
      "Curated weekly dispatches synthesizing the most critical developments across Indian and international legal tech and digital jurisprudence.",
    href: "/knowledge-hub/newsletter",
    badge: "Weekly Dispatches",
    icon: Mail,
    cta: "Subscribe Now",
  },
];

export default function KnowledgeHubIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <BookOpen className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Research & Thought Leadership</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Knowledge Hub
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Our central repository of authoritative analysis, regulatory breakdowns,
              and strategic insights shaping the intersection of law and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Hub Sections */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.map((section) => (
                <Card
                  key={section.title}
                  className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group p-8"
                >
                  <CardContent className="p-0 flex flex-col flex-1">
                    <div className="w-14 h-14 bg-black text-white flex items-center justify-center mb-6 rounded-none group-hover:bg-neutral-900 transition-colors border border-neutral-800">
                      <section.icon className="h-6 w-6 text-white" />
                    </div>

                    <Badge
                      variant="outline"
                      className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50 self-start mb-3"
                    >
                      {section.badge}
                    </Badge>

                    <h2 className="text-2xl font-serif font-normal text-black mb-3 group-hover:text-neutral-700 transition-colors">
                      {section.title}
                    </h2>

                    <p className="text-sm text-neutral-600 font-sans font-light leading-relaxed mb-8 flex-1">
                      {section.description}
                    </p>

                    <Button
                      className="w-full bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-3 cursor-pointer mt-auto"
                      asChild
                    >
                      <Link href={section.href}>
                        {section.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
