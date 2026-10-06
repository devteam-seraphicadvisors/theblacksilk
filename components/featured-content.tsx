import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function FeaturedContent() {
  let publications: any[] = [];

  try {
    publications = await prisma.publication.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching latest publications:", error);
  }

  // Fallback stance-driven articles matching official Black Silk editorial stance
  const defaultPublications = [
    {
      id: "ai-governance-thresholds",
      title: "The Constitutional Thresholds of Algorithmic Governance in India",
      excerpt:
        "Why automated state decisions demand statutory explanation rights, structural transparency, and prior ethical impact assessments rather than merely post-facto judicial reviews.",
      author: "KPS Kohli",
      publishedAt: new Date("2025-02-15"),
      readTime: "6 min read",
      category: "Policy Brief",
    },
    {
      id: "dpdp-user-empowerment",
      title: "Data Protection and the Unempowered User: Shifting the Burden to Data Fiduciaries",
      excerpt:
        "Examining how practical compliance under the DPDP Act must actively shield everyday digital citizens rather than placing the burden of consent literacy on vulnerable consumers.",
      author: "Roopa Somasundaran",
      publishedAt: new Date("2025-01-28"),
      readTime: "8 min read",
      category: "Legal Analysis",
    },
    {
      id: "digital-public-infrastructure-licensing",
      title: "Ethical Standards and Sovereign Control in Digital Public Infrastructure",
      excerpt:
        "A critical review of digital locker regulations, public utility models, and cross-border security standards required to protect collective national interests.",
      author: "Research Working Group",
      publishedAt: new Date("2024-12-18"),
      readTime: "5 min read",
      category: "Working Paper",
    },
  ];

  const displayList = publications.length >= 3 ? publications : defaultPublications;

  return (
    <section className="py-20 lg:py-28 bg-white text-black border-b border-neutral-200">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
              Thought Leadership & Perspectives
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-black">
              Latest from The Black Silk
            </h2>
          </div>
          <Link href="/knowledge-hub/blog">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white rounded-none text-xs uppercase tracking-wider font-medium"
            >
              View All Publications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* 3 Stance-driven Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayList.slice(0, 3).map((item, index) => {
            const dateStr = item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Recent";

            return (
              <Card
                key={item.id || index}
                className="border border-black bg-white rounded-none shadow-none hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4 border-b border-neutral-100 pb-3">
                    <span className="uppercase tracking-wider font-medium text-black">
                      {item.category || "Perspective"}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {dateStr}
                    </span>
                  </div>

                  <CardTitle className="text-xl md:text-2xl font-serif font-normal text-black leading-snug mb-3">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-neutral-700 leading-relaxed font-sans line-clamp-4">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="border-t border-neutral-200 pt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs font-medium text-neutral-800">
                      <User className="h-3.5 w-3.5 mr-1.5 text-neutral-500" />
                      {item.author}
                    </div>

                    <Link
                      href={
                        item.slug
                          ? `/knowledge-hub/blog/${item.slug}`
                          : `/knowledge-hub`
                      }
                      className="text-xs uppercase tracking-wider font-semibold text-black hover:underline flex items-center"
                    >
                      Read Article
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
