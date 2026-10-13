"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Calendar, Clock, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface BlogCardPost {
  id: string;
  slug: string;
  title: string;
  brief: string;
  coverUrl: string;
  authorName: string;
  date: string;
  readTime: string;
  tags: { name: string; slug: string }[];
}

interface BlogExplorerProps {
  posts: BlogCardPost[];
  // Shown separately above; hidden from the default view, included in results
  featuredSlug?: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function BlogExplorer({ posts, featuredSlug }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");

  const topics = useMemo(() => {
    const counts = new Map<string, { name: string; count: number }>();
    for (const post of posts) {
      for (const tag of post.tags) {
        const entry = counts.get(tag.slug) ?? { name: tag.name, count: 0 };
        entry.count += 1;
        counts.set(tag.slug, entry);
      }
    }
    return [...counts.entries()]
      .map(([slug, v]) => ({ slug, ...v }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [posts]);

  const isFiltering = query.trim() !== "" || topic !== "all";

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (!isFiltering && post.slug === featuredSlug) return false;
      const matchesTopic =
        topic === "all" || post.tags.some((t) => t.slug === topic);
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.brief.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        post.tags.some((t) => t.name.toLowerCase().includes(q));
      return matchesTopic && matchesQuery;
    });
  }, [posts, query, topic, isFiltering, featuredSlug]);

  const reset = () => {
    setQuery("");
    setTopic("all");
  };

  const topicButton = (slug: string, name: string, count: number) => {
    const active = topic === slug;
    return (
      <button
        key={slug}
        type="button"
        onClick={() => setTopic(slug)}
        className={`flex items-center justify-between gap-3 px-3 py-2 border text-left font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
          active
            ? "bg-black text-white border-black"
            : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
        }`}
      >
        <span>{name}</span>
        <span className={active ? "text-neutral-300" : "text-neutral-400"}>{count}</span>
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Articles */}
      <div className="lg:col-span-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
              {isFiltering ? "Search Results" : "Latest"}
            </span>
            <h2 className="text-3xl font-serif font-normal text-black">
              {isFiltering ? `${visible.length} ${visible.length === 1 ? "Article" : "Articles"}` : "Latest Articles"}
            </h2>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="pl-9 pr-9 rounded-none border-neutral-300 bg-white focus-visible:ring-black text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Topic chips (mobile / tablet) */}
        <div className="lg:hidden -mx-4 px-4 mb-8 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {topicButton("all", "All", posts.length)}
            {topics.map((t) => topicButton(t.slug, t.name, t.count))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((post) => (
              <Link
                key={post.id}
                href={`/knowledge-hub/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-neutral-200 hover:border-black transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  {post.tags[0] && (
                    <span className="absolute top-3 left-3 bg-black text-white border border-neutral-700 font-mono text-[10px] uppercase tracking-wider px-2 py-1">
                      {post.tags[0].name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-black" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-black" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-black leading-snug mb-3 group-hover:underline underline-offset-4 decoration-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed line-clamp-3 mb-6">
                    {post.brief}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="flex items-center gap-2.5">
                      <span className="w-7 h-7 bg-black text-white flex items-center justify-center font-mono text-[10px]">
                        {initials(post.authorName)}
                      </span>
                      <span className="text-xs text-black font-medium">{post.authorName}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="font-serif text-xl text-black mb-2">No articles found</p>
            <p className="text-sm text-neutral-600 mb-6">
              Try a different search term or topic.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center bg-black text-white font-mono text-xs uppercase tracking-wider px-6 py-3 hover:bg-neutral-800 cursor-pointer"
            >
              Show all articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="space-y-8">
        <div className="hidden lg:block border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-serif font-normal text-black mb-1">Browse by Topic</h3>
          <p className="text-xs text-neutral-500 mb-5">Filter articles by subject area.</p>
          <div className="flex flex-col gap-2">
            {topicButton("all", "All Articles", posts.length)}
            {topics.map((t) => topicButton(t.slug, t.name, t.count))}
          </div>
        </div>

        <div className="border border-neutral-800 bg-black text-white p-8">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 block mb-3">
            Newsletter
          </span>
          <h3 className="text-2xl font-serif font-normal text-white mb-3">
            Weekly Intelligence
          </h3>
          <p className="text-neutral-400 text-sm mb-6 font-sans leading-relaxed">
            Synthesized regulatory intelligence delivered directly to your inbox
            every Tuesday.
          </p>
          <Link
            href="/knowledge-hub/newsletter"
            className="flex items-center justify-center w-full bg-white !text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider py-3 transition-colors"
          >
            Subscribe Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
