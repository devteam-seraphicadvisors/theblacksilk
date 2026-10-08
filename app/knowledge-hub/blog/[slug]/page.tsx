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
                  <Card className="border border-neutral-200 bg-white shadow-none rounded-none">
                    <CardContent className="p-8 md:p-12">
                      <div
                        className="prose prose-lg prose-neutral max-w-none
                        prose-headings:text-black prose-headings:font-serif prose-headings:font-bold
                        prose-p:text-neutral-700 prose-p:leading-relaxed
                        prose-a:text-black prose-a:underline hover:prose-a:text-neutral-600
                        prose-strong:text-black
                        prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-none prose-code:font-mono
                        prose-pre:bg-black prose-pre:text-white prose-pre:rounded-none
                        prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6
                        prose-img:rounded-none prose-img:border prose-img:border-neutral-200"
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
                  <Card className="border border-neutral-200 bg-white shadow-none rounded-none">
                    <CardContent className="p-6 text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4 rounded-none overflow-hidden border border-neutral-200">
                        <Image
                          src={
                            post.author.profilePicture ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          alt={post.author.name}
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-black mb-1">
                        {post.author.name}
                      </h3>
                      <p className="text-neutral-500 mb-4 text-xs font-mono uppercase">Author</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none border-neutral-300 hover:bg-neutral-50 text-xs font-mono uppercase"
                      >
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card className="border border-neutral-200 bg-white shadow-none rounded-none">
                    <CardContent className="p-6">
                      <h3 className="text-base font-serif font-bold text-black mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag.slug}
                            variant="secondary"
                            className="px-2.5 py-1 rounded-none border border-neutral-200 bg-neutral-100 text-neutral-800 font-mono text-[11px]"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Newsletter CTA */}
                  <Card className="border border-neutral-800 bg-black text-white rounded-none shadow-none">
                    <CardContent className="p-6">
                      <BookOpen className="h-10 w-10 mb-4 text-white" />
                      <h3 className="text-lg font-serif font-bold mb-2 text-white">Stay Updated</h3>
                      <p className="text-neutral-400 mb-6 text-xs leading-relaxed">
                        Get the latest legal technology insights delivered to your inbox.
                      </p>
                      <Button
                        className="w-full bg-white !text-black hover:bg-neutral-100 rounded-none h-11 text-xs font-mono uppercase tracking-wider font-semibold"
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
        <section className="py-20 bg-neutral-50 border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-black mb-12 text-center">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPosts.slice(0, 4).map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="border border-neutral-200 bg-white hover:border-black transition-all group rounded-none shadow-none"
                  >
                    <div className="relative h-44 overflow-hidden rounded-none border-b border-neutral-200">
                      <Image
                        src={
                          relatedPost.coverImage?.url ||
                          "/placeholder.svg?height=200&width=300"
                        }
                        alt={relatedPost.title}
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif font-bold text-black mb-2 line-clamp-2 text-sm group-hover:underline">
                        <Link href={`/knowledge-hub/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-neutral-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                        {relatedPost.brief}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                        <Calendar className="h-3 w-3 text-black" />
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
