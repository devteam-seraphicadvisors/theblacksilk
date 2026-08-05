import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/json-ld";
import { getHashnodePost, getHashnodePosts } from "@/lib/hashnode";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  BookOpen,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getHashnodePosts(50);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getHashnodePost(slug);

  if (!post) {
    return {
      title: "Post Not Found - The Black Silk",
    };
  }

  return generateSeoMetadata({
    title: `${post.title} - The Black Silk`,
    description: post.brief,
    canonical: `https://theblacksilk.org/knowledge-hub/blog/${post.slug}`,
    keywords: post.tags.map((tag) => tag.name).join(", "),
  });
}

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getHashnodePost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getHashnodePosts(4);

  const jsonLd = generateArticleSchema(post);
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Home", item: "https://theblacksilk.org" },
    { name: "Knowledge Hub", item: "https://theblacksilk.org/knowledge-hub" },
    { name: "Blog", item: "https://theblacksilk.org/knowledge-hub/blog" },
    {
      name: post.title,
      item: `https://theblacksilk.org/knowledge-hub/blog/${post.slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button variant="ghost" size="lg" asChild className="mb-4">
                <Link
                  href="/knowledge-hub/blog"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag.slug} variant="outline" className="px-3 py-1">
                    {tag.name}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Brief */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.brief}
              </p>

              {/* Author and Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={
                        post.author.profilePicture ||
                        "/placeholder.svg?height=64&width=64"
                      }
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {post.author.name}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {calculateReadTime(post.content?.html || post.brief)}
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="rounded-full">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Article
                </Button>
              </div>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-12">
                  <Image
                    src={post.coverImage.url || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-12">
                      <div
                        className="prose prose-lg prose-gray max-w-none
                        prose-headings:text-gray-900 prose-headings:font-bold
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900
                        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                        prose-pre:bg-gray-900 prose-pre:text-white
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6
                        prose-img:rounded-xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{
                          __html: post.content?.html || post.brief,
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Author Card */}
                  <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-8 text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={
                            post.author.profilePicture ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {post.author.name}
                      </h3>
                      <p className="text-gray-600 mb-4">Author</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag.slug}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Newsletter CTA */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl">
                    <CardContent className="p-8">
                      <BookOpen className="h-12 w-12 mb-4 text-blue-400" />
                      <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                      <p className="text-gray-300 mb-6">
                        Get the latest insights delivered to your inbox
                      </p>
                      <Button
                        className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl"
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

        {/* Related Posts */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedPosts.slice(0, 4).map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-2xl"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <Image
                        src={
                          relatedPost.coverImage?.url ||
                          "/placeholder.svg?height=200&width=300"
                        }
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/knowledge-hub/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.brief}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(relatedPost.publishedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
