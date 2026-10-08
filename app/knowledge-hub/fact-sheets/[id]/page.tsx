import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  Share2,
  Bookmark,
  FileText,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock data - in real app, this would come from a database
const factSheets = {
  "1": {
    id: "1",
    title: "AI in Indian Courts: Implementation Guide",
    slug: "ai-in-indian-courts-implementation-guide",
    description:
      "Comprehensive guide covering AI implementation strategies, ethical considerations, and regulatory compliance for Indian judicial systems.",
    fullDescription: `This comprehensive guide provides detailed insights into implementing artificial intelligence technologies within the Indian judicial system. It covers practical strategies, ethical frameworks, and regulatory compliance requirements that courts and legal professionals need to consider.

    The guide addresses key challenges such as algorithmic bias, transparency requirements, data privacy concerns, and the need for human oversight in AI-assisted decision-making processes. It also provides case studies from successful AI implementations in other jurisdictions and recommendations for phased adoption approaches.`,
    category: "AI & Courts",
    pages: 24,
    publishedAt: "December 2024",
    downloads: 1847,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    tags: ["Artificial Intelligence", "Judiciary", "Implementation"],
    featured: true,
    authors: [
      {
        name: "Dr. Rajesh Kumar",
        designation: "Former Chief Justice",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      },
      {
        name: "Prof. Anita Singh",
        designation: "AI Ethics Researcher",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      },
    ],
    tableOfContents: [
      { section: "1. Introduction to AI in Judiciary", page: 3 },
      { section: "2. Current State of AI Adoption", page: 6 },
      { section: "3. Implementation Framework", page: 10 },
      { section: "4. Ethical Considerations", page: 15 },
      { section: "5. Regulatory Compliance", page: 18 },
      { section: "6. Case Studies", page: 21 },
      { section: "7. Recommendations", page: 23 },
    ],
    keyInsights: [
      "AI can reduce case processing time by up to 40%",
      "Proper training is essential for successful adoption",
      "Transparency and explainability are crucial for judicial AI",
      "Phased implementation reduces risks and costs",
    ],
    relatedSheets: [
      {
        id: "2",
        title: "Cybersecurity Compliance Checklist for Law Firms",
        category: "Cybersecurity",
      },
      {
        id: "4",
        title: "Data Protection Act 2023: Quick Reference",
        category: "Data Privacy",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Cybersecurity Compliance Checklist for Law Firms",
    slug: "cybersecurity-compliance-checklist-law-firms",
    description:
      "Essential cybersecurity measures and compliance requirements specifically designed for legal practices and law firms.",
    fullDescription: `This practical checklist provides law firms with a comprehensive framework for implementing robust cybersecurity measures and ensuring compliance with relevant regulations. It covers technical, administrative, and physical security controls tailored to the unique needs of legal practices.`,
    category: "Cybersecurity",
    pages: 16,
    publishedAt: "November 2024",
    downloads: 2156,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["Cybersecurity", "Compliance", "Law Firms"],
    featured: false,
    authors: [
      {
        name: "Cyber Security Team",
        designation: "Security Experts",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
    ],
    tableOfContents: [
      { section: "1. Security Assessment", page: 2 },
      { section: "2. Technical Controls", page: 5 },
      { section: "3. Administrative Controls", page: 9 },
      { section: "4. Physical Security", page: 12 },
      { section: "5. Incident Response", page: 14 },
    ],
    keyInsights: [
      "60% of law firms experienced a security breach in 2024",
      "Multi-factor authentication reduces breach risk by 99%",
      "Regular security training is essential for all staff",
      "Incident response planning saves time and costs",
    ],
    relatedSheets: [
      {
        id: "1",
        title: "AI in Indian Courts: Implementation Guide",
        category: "AI & Courts",
      },
      {
        id: "5",
        title: "Digital Evidence Handling Protocols",
        category: "Digital Evidence",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const factSheet = factSheets[id as keyof typeof factSheets];

  if (!factSheet) {
    return generateSeoMetadata({
      title: "Fact Sheet Not Found - The Black Silk",
      description: "The requested fact sheet could not be found.",
    });
  }

  return generateSeoMetadata({
    title: `${factSheet.title} - The Black Silk`,
    description: factSheet.description,
    canonical: `https://theblacksilk.org/knowledge-hub/fact-sheets/${factSheet.id}`,
  });
}

export default async function FactSheetDetailPage({ params }: PageProps) {
  const { id } = await params;
  const factSheet = factSheets[id as keyof typeof factSheets];

  if (!factSheet) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/knowledge-hub/fact-sheets"
              className="inline-flex items-center text-neutral-400 hover:text-white mb-6 transition-colors text-xs font-mono uppercase"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fact Sheets
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-neutral-900 text-white border border-neutral-700 rounded-none font-mono text-[11px] uppercase">
                {factSheet.category}
              </Badge>
              {factSheet.featured && (
                <Badge className="bg-white !text-black border border-white rounded-none font-mono text-[11px] uppercase font-semibold">Featured</Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white">
              {factSheet.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 font-light">
              {factSheet.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white !text-black hover:bg-neutral-100 rounded-none font-semibold px-8"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-700 text-white bg-transparent hover:bg-neutral-900 rounded-none"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-700 text-white bg-transparent hover:bg-neutral-900 rounded-none"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fact Sheet Details */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-black mb-4">
                    Overview
                  </h2>
                  <div className="prose prose-lg max-w-none text-neutral-700">
                    {factSheet.fullDescription
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed text-sm md:text-base">
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-black mb-4">
                    Key Insights
                  </h2>
                  <div className="space-y-3">
                    {factSheet.keyInsights.map((insight, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-black border-y border-r border-neutral-200 bg-white rounded-none shadow-none"
                      >
                        <CardContent className="p-4">
                          <p className="text-neutral-800 text-sm font-medium">{insight}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Table of Contents */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-black mb-4">
                    Table of Contents
                  </h2>
                  <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        {factSheet.tableOfContents.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0 text-sm"
                          >
                            <span className="text-neutral-800">
                              {item.section}
                            </span>
                            <span className="text-neutral-500 font-mono text-xs">
                              Page {item.page}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Authors */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-black mb-4">
                    Authors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {factSheet.authors.map((author, index) => (
                      <Card key={index} className="border border-neutral-200 bg-white rounded-none shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-14 h-14 rounded-none overflow-hidden border border-neutral-200">
                              <Image
                                src={author.image || "/placeholder.svg"}
                                alt={author.name}
                                fill
                                className="object-cover grayscale"
                              />
                            </div>
                            <div>
                              <h3 className="font-serif font-bold text-black text-sm">
                                {author.name}
                              </h3>
                              <p className="text-neutral-500 text-xs font-mono">
                                {author.designation}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Related Fact Sheets */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-black mb-4">
                    Related Fact Sheets
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {factSheet.relatedSheets.map((sheet, index) => (
                      <Card
                        key={index}
                        className="border border-neutral-200 bg-white rounded-none hover:border-black transition-all shadow-none"
                      >
                        <CardContent className="p-5">
                          <Badge variant="outline" className="mb-3 rounded-none border-neutral-300 font-mono text-[10px] uppercase">
                            {sheet.category}
                          </Badge>
                          <h3 className="font-serif font-bold text-black mb-3 text-sm">
                            {sheet.title}
                          </h3>
                          <Button variant="outline" size="sm" className="rounded-none border-neutral-300 hover:bg-neutral-50 text-xs" asChild>
                            <Link
                              href={`/knowledge-hub/fact-sheets/${sheet.id}`}
                            >
                              View Details
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Fact Sheet Info */}
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif font-bold text-black">
                      Document Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-black" />
                        <span className="text-neutral-600">Pages</span>
                      </div>
                      <span className="font-mono font-semibold text-black">
                        {factSheet.pages}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-black" />
                        <span className="text-neutral-600">Published</span>
                      </div>
                      <span className="font-mono font-semibold text-black">
                        {factSheet.publishedAt}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-black" />
                        <span className="text-neutral-600">Downloads</span>
                      </div>
                      <span className="font-mono font-semibold text-black">
                        {factSheet.downloads.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif font-bold text-black">
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {factSheet.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="rounded-none border-neutral-300 text-neutral-800 bg-neutral-100 font-mono text-[11px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Download */}
                <Card className="border border-neutral-800 bg-black text-white rounded-none shadow-none">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-serif font-bold text-white mb-2">
                      Download This Guide
                    </h3>
                    <p className="text-neutral-400 mb-6 text-xs">
                      Get the complete {factSheet.pages}-page guide in PDF
                      format
                    </p>
                    <Button
                      size="lg"
                      className="w-full bg-white !text-black hover:bg-neutral-100 rounded-none text-xs font-mono uppercase tracking-wider font-semibold"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif font-bold text-black">
                      Stay Updated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4 text-xs">
                      Get notified when new fact sheets and guides are
                      published.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full rounded-none border-neutral-300 text-black hover:bg-neutral-50 text-xs font-mono uppercase tracking-wider"
                      asChild
                    >
                      <Link href="/knowledge-hub/newsletter">
                        Subscribe to Newsletter
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
