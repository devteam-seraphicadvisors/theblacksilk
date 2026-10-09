import { generateMetadata } from "@/lib/seo";
import { getHashnodePosts } from "@/lib/hashnode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, TrendingUp, BookOpen, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering - this page needs database access
export const dynamic = "force-dynamic";
export const revalidate = 300; // Revalidate every 5 minutes

export const metadata = generateMetadata({
  title: "Blog & Insights - The Black Silk",
  description:
    "Read the latest insights, analysis, and thought leadership on legal technology, policy, and innovation from our expert community.",
  canonical: "https://theblacksilk.org/knowledge-hub/blog",
});

const trendingTopics = [
  "AI Ethics Framework",
  "Blockchain Legal Applications",
  "Digital Evidence Standards",
  "Cybersecurity Compliance",
  "Legal Tech Innovation",
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

export default async function BlogPage() {
  const posts = await getHashnodePosts(10);
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  // Fetch real publication counts from database
  const totalPublications = await prisma.publication.count({
    where: { published: true },
  });

  // Get counts by category
  const categoryGroups = await prisma.publication.groupBy({
    by: ["category"],
    where: { published: true },
    _count: { category: true },
  });

  const categories = [
    { name: "All Posts", count: totalPublications, active: true },
    ...categoryGroups.map((group) => ({
      name: group.category,
      count: group._count.category,
      active: false,
    })),
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <BookOpen className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Knowledge Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Blog & Insights
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Authoritative legal analysis, algorithmic audits, and statutory frameworks
              curated for practitioners and legal engineers.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search articles, topics, or authors..."
                  className="pl-10 pr-4 py-2.5 border-neutral-300 bg-white rounded-none focus:border-black focus:ring-0 text-sm"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    size="sm"
                    className={`rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer ${
                      category.active
                        ? "bg-black text-white hover:bg-neutral-800 border-black"
                        : "border-neutral-300 text-black hover:bg-neutral-100 bg-white"
                    }`}
                  >
                    {category.name}
                    <Badge
                      variant="secondary"
                      className="ml-2.5 rounded-none font-mono text-[10px] bg-neutral-100 text-neutral-800"
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                  <TrendingUp className="h-3.5 w-3.5 mr-2 text-white" />
                  <span>Featured Analysis</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                  Editor&apos;s Pick
                </h2>
              </div>

              <Card className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-80 lg:h-auto overflow-hidden bg-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-200">
                    <Image
                      src={featuredPost.coverImage?.url || "/images/events-hero.jpg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black text-white border border-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider">
                        {featuredPost.tags[0]?.name || "Article"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {featuredPost.tags?.slice(0, 3).map((tag, idx) => (
                          <Badge
                            key={tag.slug || `tag-${idx}`}
                            variant="outline"
                            className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>

                      <CardTitle className="text-2xl md:text-3xl font-serif text-black mb-4 leading-snug group-hover:text-neutral-700 transition-colors">
                        <Link href={`/knowledge-hub/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </CardTitle>

                      <p className="text-neutral-600 font-sans font-light leading-relaxed mb-6 text-sm md:text-base line-clamp-3">
                        {featuredPost.brief}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 py-4 border-t border-neutral-100 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-serif text-black font-semibold text-xs border border-neutral-300">
                            {featuredPost.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium text-black block">
                              {featuredPost.author.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-black" />
                            {formatDate(featuredPost.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-black" />
                            {calculateReadTime(featuredPost.brief)}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-3 px-6 cursor-pointer"
                        asChild
                      >
                        <Link href={`/knowledge-hub/blog/${featuredPost.slug}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
                  <h2 className="text-2xl font-serif font-normal text-black">
                    Latest Articles
                  </h2>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                    {posts.length} Publications
                  </span>
                </div>

                {regularPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all overflow-hidden group"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-200">
                        <Image
                          src={post.coverImage?.url || "/images/events-hero.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black text-white border border-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider">
                            {post.tags[0]?.name || "Article"}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="md:w-3/5 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags?.slice(0, 2).map((tag, idx) => (
                              <Badge
                                key={tag.slug || `tag-${idx}`}
                                variant="outline"
                                className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-xl font-serif text-black mb-2 group-hover:text-neutral-700 transition-colors line-clamp-2">
                            <Link href={`/knowledge-hub/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-2 mb-4">
                            {post.brief}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-3 border-t border-neutral-100">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-black" />
                            <span>{post.author.name}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-black" />
                            <span>{calculateReadTime(post.brief)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Categories */}
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-serif font-bold text-black mb-4">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center justify-between py-2 px-3 border border-neutral-100 hover:border-black transition-colors cursor-pointer"
                        >
                          <span className="text-xs font-mono uppercase tracking-wider text-black">
                            {category.name}
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-neutral-100 text-neutral-800 rounded-none font-mono text-[10px]"
                          >
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-serif font-bold text-black mb-4">
                      Trending Topics
                    </h3>
                    <div className="space-y-2">
                      {trendingTopics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center gap-3 py-2 px-3 border border-neutral-100 hover:border-black transition-colors cursor-pointer"
                        >
                          <TrendingUp className="h-3.5 w-3.5 text-black" />
                          <span className="text-xs font-mono uppercase tracking-wider text-neutral-800">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="border border-neutral-800 bg-black text-white rounded-none shadow-none">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-serif font-normal text-white mb-2">
                      Weekly Intelligence
                    </h3>
                    <p className="text-neutral-400 text-xs mb-6 font-sans">
                      Synthesized regulatory intelligence delivered directly to your inbox every Tuesday.
                    </p>
                    <Button
                      className="w-full bg-white !text-black hover:bg-neutral-200 rounded-none font-mono text-xs uppercase tracking-wider py-2.5"
                      asChild
                    >
                      <Link href="/knowledge-hub/newsletter">
                        Subscribe Now
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
