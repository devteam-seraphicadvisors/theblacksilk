import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateSeoMetadata({
  title: "Fact Sheets & Briefs - The Black Silk",
  description:
    "Concise, authoritative briefings and regulatory frameworks on AI in courts, cybersecurity compliance, and data governance.",
  canonical: "https://theblacksilk.org/knowledge-hub/fact-sheets",
});

const factSheetsList = [
  {
    id: "1",
    title: "AI in Indian Courts: Implementation Guide",
    category: "AI & Courts",
    pages: 24,
    publishedAt: "December 2024",
    downloads: 1847,
    description:
      "Comprehensive guide covering AI implementation strategies, algorithmic bias auditing, and regulatory compliance for Indian judicial systems.",
    tags: ["Artificial Intelligence", "Judiciary", "Implementation"],
    featured: true,
  },
  {
    id: "2",
    title: "Cybersecurity Compliance Checklist for Law Firms",
    category: "Cybersecurity",
    pages: 16,
    publishedAt: "November 2024",
    downloads: 2156,
    description:
      "Essential cybersecurity protocols, administrative safeguards, and incident response requirements specifically designed for legal practices.",
    tags: ["Cybersecurity", "Compliance", "Law Firms"],
    featured: false,
  },
];

export default function FactSheetsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <FileText className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Research & Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Fact Sheets & Briefs
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Concise, authoritative briefings on judicial technology, cyber compliance,
              and cross-border digital governance frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Fact Sheets List */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12 pb-4 border-b border-neutral-200">
              <h2 className="text-2xl md:text-3xl font-serif text-black">
                Available Fact Sheets
              </h2>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                {factSheetsList.length} Publications
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {factSheetsList.map((sheet) => (
                <Card
                  key={sheet.id}
                  className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group p-8"
                >
                  <CardContent className="p-0 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <Badge
                        variant="outline"
                        className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                      >
                        {sheet.category}
                      </Badge>
                      {sheet.featured && (
                        <Badge className="bg-black text-white border border-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-2xl font-serif text-black mb-3 group-hover:text-neutral-700 transition-colors">
                      <Link href={`/knowledge-hub/fact-sheets/${sheet.id}`}>
                        {sheet.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-neutral-600 font-sans font-light leading-relaxed mb-6 flex-1">
                      {sheet.description}
                    </p>

                    <div className="flex items-center gap-6 text-xs font-mono text-neutral-500 py-3 border-y border-neutral-100 mb-6">
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-black" />
                        {sheet.pages} Pages
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-black" />
                        {sheet.publishedAt}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-black" />
                        {sheet.downloads.toLocaleString()} Downloads
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <Button
                        className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-2.5 px-6 cursor-pointer"
                        asChild
                      >
                        <Link href={`/knowledge-hub/fact-sheets/${sheet.id}`}>
                          Read Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider py-2.5"
                        asChild
                      >
                        <Link href={`/knowledge-hub/fact-sheets/${sheet.id}`}>
                          <Download className="mr-2 h-3.5 w-3.5" />
                          PDF
                        </Link>
                      </Button>
                    </div>
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
