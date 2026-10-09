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
      <main className="min-h-screen bg-white">
        {/* Header / Hero */}
        <section className="py-20 bg-black text-white border-b border-neutral-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/knowledge-hub/blog"
                className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors text-xs font-mono uppercase tracking-wider"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog & Insights
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, idx) => (
                  <Badge
                    key={tag.slug || idx}
                    className="bg-neutral-900 text-neutral-300 border border-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-normal text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Brief */}
              <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed mb-8">
                {post.brief}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center font-serif text-white text-xs">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <span className="text-white font-medium block">
                      {post.author.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-neutral-300" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-neutral-300" />
                    {calculateReadTime(post.content?.html || post.brief)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image & Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {post.coverImage?.url && (
                <div className="relative h-80 md:h-[450px] w-full overflow-hidden mb-12 border border-neutral-200 bg-neutral-900">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Article Body */}
                <div className="lg:col-span-3">
                  <div
                    className="prose prose-lg prose-neutral max-w-none
                    prose-headings:text-black prose-headings:font-serif prose-headings:font-normal
                    prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:font-sans
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
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Author Card */}
                  <Card className="border border-neutral-200 bg-white shadow-none rounded-none">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-black text-white border border-neutral-800 flex items-center justify-center font-serif text-lg">
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <h3 className="font-serif text-black text-base mb-1">
                        {post.author.name}
                      </h3>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-4">
                        Contributing Author
                      </p>
                    </CardContent>
                  </Card>

                  {/* Share Card */}
                  <Card className="border border-neutral-200 bg-white shadow-none rounded-none">
                    <CardContent className="p-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-black mb-3">
                        Share Article
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider"
                      >
                        <Share2 className="h-3.5 w-3.5 mr-2" />
                        Copy Link
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Related Articles */}
                  <Card className="border border-neutral-800 bg-black text-white shadow-none rounded-none">
                    <CardContent className="p-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4">
                        Related Research
                      </h4>
                      <div className="space-y-3">
                        {relatedPosts.slice(0, 3).map((related) => (
                          <div key={related.slug} className="border-b border-neutral-800 pb-3 last:border-b-0 last:pb-0">
                            <Link
                              href={`/knowledge-hub/blog/${related.slug}`}
                              className="text-xs font-serif text-white hover:text-neutral-300 block line-clamp-2 leading-snug"
                            >
                              {related.title}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
