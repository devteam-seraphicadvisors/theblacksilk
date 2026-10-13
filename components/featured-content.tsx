import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { getHashnodePosts } from "@/lib/hashnode";

const FALLBACK_COVER = "/images/featured-article.jpg";

// "Latest from The Black Silk" (content.md §2.6): the three latest blog posts,
// from the same source as /knowledge-hub/blog.
export async function FeaturedContent() {
  const posts = (await getHashnodePosts(3)).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-white text-black border-b border-neutral-200">
      <div className="site-container">
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Thought Leadership & Perspectives
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Latest from The Black Silk
            </h2>
          </div>
          <Link
            href="/knowledge-hub/blog"
            className="inline-flex items-center self-start md:self-end border border-black text-black hover:bg-black hover:!text-white font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
              href={`/knowledge-hub/blog/${post.slug}`}
              className="group flex flex-col border border-neutral-200 hover:border-black transition-colors bg-white"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <Image
                  src={post.coverImage?.url || FALLBACK_COVER}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {post.tags[0] && (
                  <span className="absolute top-3 left-3 bg-black text-white border border-neutral-700 font-mono text-[10px] uppercase tracking-wider px-2 py-1">
                    {post.tags[0].name}
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6">
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 mb-3">
                  <Calendar className="h-3.5 w-3.5 text-black" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <h3 className="text-xl font-serif font-normal text-black leading-snug mb-3 group-hover:underline underline-offset-4 decoration-1">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-600 font-sans leading-relaxed line-clamp-3 mb-6">
                  {post.brief}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-xs text-black font-medium">{post.author.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
