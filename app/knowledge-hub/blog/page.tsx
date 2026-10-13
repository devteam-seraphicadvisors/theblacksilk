import { generateMetadata } from "@/lib/seo";
import { getHashnodePosts, type HashnodePost } from "@/lib/hashnode";
import { BlogExplorer, type BlogCardPost } from "@/components/blog-explorer";
import { Calendar, Clock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata = generateMetadata({
  title: "Blog & Insights - The Black Silk",
  description:
    "Read the latest insights, analysis, and thought leadership on legal technology, policy, and innovation from our expert community.",
  canonical: "https://theblacksilk.org/knowledge-hub/blog",
});

const FALLBACK_COVER = "/images/featured-article.jpg";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Estimate from the full article when available, otherwise from the summary
function calculateReadTime(post: HashnodePost) {
  const text = post.content?.html
    ? post.content.html.replace(/<[^>]+>/g, " ")
    : post.brief;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default async function BlogPage() {
  const posts = await getHashnodePosts(10);
  const featuredPost = posts[0];
  const topicCount = new Set(posts.flatMap((p) => p.tags.map((t) => t.slug))).size;

  const cardPosts: BlogCardPost[] = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    brief: post.brief,
    coverUrl: post.coverImage?.url || FALLBACK_COVER,
    authorName: post.author.name,
    date: formatDate(post.publishedAt),
    readTime: calculateReadTime(post),
    tags: post.tags ?? [],
  }));

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
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-10">
              Authoritative legal analysis, algorithmic audits, and statutory frameworks
              curated for practitioners and legal engineers.
            </p>
            <div className="inline-flex divide-x divide-neutral-700 border border-neutral-700 font-mono text-xs uppercase tracking-widest text-neutral-300">
              <span className="px-5 py-2">
                <span className="text-white">{posts.length}</span> Articles
              </span>
              <span className="px-5 py-2">
                <span className="text-white">{topicCount}</span> Topics
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 lg:py-20 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link
                href={`/knowledge-hub/blog/${featuredPost.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-5 border border-neutral-200 hover:border-black transition-colors"
              >
                <div className="relative lg:col-span-3 aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden bg-neutral-900">
                  <Image
                    src={featuredPost.coverImage?.url || FALLBACK_COVER}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-white text-black font-mono text-[10px] uppercase tracking-wider px-2.5 py-1">
                    Editor&apos;s Pick
                  </span>
                </div>

                <div className="lg:col-span-2 p-8 md:p-10 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredPost.tags?.slice(0, 3).map((tag, idx) => (
                      <span
                        key={tag.slug || `tag-${idx}`}
                        className="border border-neutral-200 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider px-2 py-1"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif font-normal text-black leading-tight mb-5 group-hover:underline underline-offset-4 decoration-1">
                    {featuredPost.title}
                  </h2>

                  <p className="text-neutral-600 font-sans font-light leading-relaxed mb-8 line-clamp-4">
                    {featuredPost.brief}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-mono text-neutral-500 py-5 border-t border-neutral-100 mb-6">
                      <span className="flex items-center gap-2.5">
                        <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-[10px]">
                          {initials(featuredPost.author.name)}
                        </span>
                        <span className="text-black font-medium">{featuredPost.author.name}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-black" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-black" />
                        {calculateReadTime(featuredPost)}
                      </span>
                    </div>

                    <span className="inline-flex items-center bg-black text-white font-mono text-xs uppercase tracking-wider py-3 px-6 group-hover:bg-neutral-800 transition-colors">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Articles, search & topics */}
      <section className="py-20 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <BlogExplorer posts={cardPosts} featuredSlug={featuredPost?.slug} />
          </div>
        </div>
      </section>
    </main>
  );
}
