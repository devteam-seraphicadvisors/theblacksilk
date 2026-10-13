import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Play, Youtube } from "lucide-react";
import { FALLBACK_PAST_PODCASTS } from "@/lib/podcasts";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@TheBlackSilk";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Recorded episodes, newest first
const episodes = [...FALLBACK_PAST_PODCASTS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export function EpisodesShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-black text-white border-b border-neutral-800">
      <div className="site-container">
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 block mb-3">
              Events & Podcasts
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight">
              Watch the Conversations
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/events"
              className="inline-flex items-center bg-white !text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
            >
              All Episodes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white text-white hover:bg-white hover:!text-black font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
            >
              <Youtube className="mr-2 h-4 w-4" />
              YouTube Channel
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {episodes.map((episode, i) => (
            <a
              key={episode.id}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-neutral-800 hover:border-white bg-neutral-950 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-neutral-900">
                {episode.youtubeId && (
                  <Image
                    src={`https://i.ytimg.com/vi/${episode.youtubeId}/maxresdefault.jpg`}
                    alt={episode.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-black fill-black ml-0.5" />
                  </span>
                </span>
                {episode.episodeNumber && (
                  <span className="absolute top-3 right-3 bg-black/80 border border-neutral-700 text-white font-mono text-[10px] uppercase tracking-wider px-2 py-1">
                    {episode.episodeNumber}
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400 mb-3">
                  <span className="uppercase tracking-wider text-white">{episode.category}</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(episode.date)}
                  </span>
                  {episode.duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {episode.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-serif font-normal text-white leading-snug mb-3">
                  {episode.title}
                </h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed line-clamp-3 mb-6">
                  {episode.description}
                </p>
                <span className="mt-auto inline-flex items-center font-mono text-xs uppercase tracking-wider text-white">
                  Watch on YouTube
                  <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
