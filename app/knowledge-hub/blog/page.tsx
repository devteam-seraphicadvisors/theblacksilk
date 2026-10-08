import { generateMetadata } from "@/lib/seo";
import { getHashnodePosts } from "@/lib/hashnode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, TrendingUp, BookOpen } from "lucide-react";
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
              Expert analysis, thought leadership, and insights on legal
              technology, policy, and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles, topics, or authors..."
                  className="pl-12 pr-4 py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-3">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.name}
                    variant={category.active ? "default" : "outline"}
                    size="lg"
                    className={`rounded-full px-6 ${
                      category.active
                        ? "bg-gray-900 hover:bg-gray-800 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {category.name}
                    <Badge
                      variant="secondary"
                      className="ml-3 bg-gray-100 text-gray-700"
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="bg-blue-600 text-white mb-6 px-4 py-2 text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Featured Article
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900">
                  Editor's Pick
                </h2>
              </div>

              <Card className="border-0 shadow-2xl overflow-hidden rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <Image
                      src={
                        featuredPost.coverImage?.url ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-gray-900 text-white px-3 py-1">
                        {featuredPost.tags[0]?.name || "Article"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-12">
                    <CardHeader className="p-0 mb-8">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag.slug}
                            variant="outline"
                            className="text-sm px-3 py-1"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                        {featuredPost.title}
                      </CardTitle>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {featuredPost.brief}
                      </p>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden">
                          <Image
                            src={
                              featuredPost.author.profilePicture ||
                              "/placeholder.svg?height=56&width=56"
                            }
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {featuredPost.author.name}
                          </p>
                          <p className="text-gray-600">Author</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {formatDate(featuredPost.publishedAt)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          {calculateReadTime(featuredPost.brief)}
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg rounded-xl"
                        asChild
                      >
                        <Link href={`/knowledge-hub/blog/${featuredPost.slug}`}>
                          Read Full Article
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-12">
                  Latest Articles
                </h2>

                <div className="space-y-8">
                  {regularPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group rounded-2xl bg-white"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
                          <Image
                            src={
                              post.coverImage?.url ||
                              "/placeholder.svg?height=300&width=400"
                            }
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gray-900 text-white px-3 py-1">
                              {post.tags[0]?.name || "Article"}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="md:w-2/3 p-8">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag.slug}
                                variant="outline"
                                className="text-xs px-2 py-1"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/knowledge-hub/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                            {post.brief}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={
                                    post.author.profilePicture ||
                                    "/placeholder.svg?height=40&width=40"
                                  }
                                  alt={post.author.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {post.author.name}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>{formatDate(post.publishedAt)}</span>
                                  <span>•</span>
                                  <span>{calculateReadTime(post.brief)}</span>
                                </div>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="rounded-full"
                            >
                              <Link href={`/knowledge-hub/blog/${post.slug}`}>
                                Read More
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-16">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 rounded-full"
                  >
                    Load More Articles
                  </Button>
                  <p className="text-gray-600 mt-4">
                    Showing {posts.length} of {totalPublications} articles
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Categories */}
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <span
                            className={`font-medium ${
                              category.active
                                ? "text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            {category.name}
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-700"
                          >
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="border border-neutral-200 shadow-none rounded-none bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif text-black mb-4">
                      Trending Topics
                    </h3>
                    <div className="space-y-2">
                      {trendingTopics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center gap-3 py-2 px-3 border border-neutral-100 hover:border-black transition-colors cursor-pointer"
                        >
                          <TrendingUp className="h-4 w-4 text-black" />
                          <span className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="border border-neutral-800 bg-black text-white rounded-none">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif mb-2">Stay Updated</h3>
                    <p className="text-neutral-400 text-xs mb-4">
                      Get the latest insights delivered to your inbox weekly
                    </p>
                    <div className="space-y-3">
                      <Input
                        placeholder="Enter your email"
                        className="bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 rounded-none text-xs"
                      />
                      <Button className="w-full bg-white !text-black hover:bg-neutral-200 rounded-none py-2 text-xs font-mono uppercase tracking-wider">
                        Subscribe
                      </Button>
                    </div>
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
