"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Play,
  Youtube,
  Radio,
  Calendar,
  Clock,
  Users,
  Search,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Headphones,
  CheckCircle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Speaker {
  name: string;
  title?: string;
  role?: string;
  bio?: string;
  image?: string;
}

interface PodcastEpisode {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  youtubeUrl: string;
  youtubeId?: string;
  isUpcoming: boolean;
  flags: string[];
  speakers: Speaker[];
  category: string;
  duration?: string;
  episodeNumber?: string;
}

const SPEAKER_IMAGE_MAP: Record<string, string> = {
  "Mr. KPS Kohli": "/members/kps-kohli.jpg",
  "KPS Kohli": "/members/kps-kohli.jpg",
  "Mr. Mayank Grover": "/members/mayank-grover.png",
  "Mayank Grover": "/members/mayank-grover.png",
  "Neil Dawes": "/members/neil-dawes.png",
  "Neil Dawes Bhutani": "/members/neil-dawes.png",
  "Girija Krishan Varma": "/members/girija-krishan-varma.png",
  "Prerna Kapoor": "/members/prerna-kapoor.png",
  "Ms. Prerna Kapoor": "/members/prerna-kapoor.png",
  "Sukanta Dey": "/members/sukanta-dey.png",
  "Mr. Sukanta Dey": "/members/sukanta-dey.png",
  "Subhash Bhutoria": "/members/subhash-bhutoria.png",
  "Dr. Rajesh Kumar": "/members/subhash-bhutoria.png",
};

function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=[&?]?|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function SpeakerAvatar({ speaker }: { speaker: Speaker }) {
  const [imgError, setImgError] = useState(false);
  const resolvedImage =
    speaker.image && !speaker.image.includes("localhost")
      ? speaker.image
      : SPEAKER_IMAGE_MAP[speaker.name] || null;

  const initials =
    speaker.name
      .replace(/^Mr\.\s+|^Ms\.\s+|^Dr\.\s+|^Justice\s+/i, "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BS";

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-8 h-8 rounded-none overflow-hidden bg-neutral-900 border border-neutral-300 flex-shrink-0 flex items-center justify-center">
        {resolvedImage && !imgError ? (
          <Image
            src={resolvedImage}
            alt={speaker.name}
            fill
            className="object-cover grayscale"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-serif text-[10px] text-white select-none">
            {initials}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-serif text-black truncate leading-tight font-medium">
          {speaker.name}
        </p>
        {speaker.title && (
          <p className="text-[10px] font-mono text-neutral-500 truncate leading-tight">
            {speaker.title}
          </p>
        )}
      </div>
    </div>
  );
}

// Curated Upcoming Episodes
const UPCOMING_PODCASTS: PodcastEpisode[] = [
  {
    id: "upcoming-dpdp-part-2",
    slug: "dialogue-on-india-dpdp-act-part-2",
    title:
      "Dialogue on India's Digital Personal Data Protection Act, 2023 - Part 2: Consent Managers & Cross-Border Data Flows",
    description:
      "The second installment in our flagship podcast series examining operational frameworks for Consent Managers, cross-border transmission limits, and penalty enforcement under India's DPDP Act.",
    date: "2026-04-15T14:00:00.000Z",
    youtubeUrl: "https://www.youtube.com/@TheBlackSilk",
    youtubeId: "x624GRuNkZA",
    isUpcoming: true,
    flags: ["UPCOMING", "NEW", "PREMIERES SOON"],
    episodeNumber: "EPISODE 04",
    category: "DPDP Series",
    duration: "45 mins",
    speakers: [
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Mr. Mayank Grover",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
  {
    id: "upcoming-ai-courts",
    slug: "algorithmic-governance-and-ai-in-indian-courts",
    title:
      "Algorithmic Governance & AI in Indian Courts: Admissibility, Transparency, and Neural Liability",
    description:
      "An in-depth inquiry into emerging AI evidentiary protocols, bias audits in automated dispute resolution, and regulatory compliance standards for judicial technological deployments.",
    date: "2026-04-28T16:00:00.000Z",
    youtubeUrl: "https://www.youtube.com/@TheBlackSilk",
    youtubeId: "7laF3tgWZ_E",
    isUpcoming: true,
    flags: ["UPCOMING", "NEW", "IN PRODUCTION"],
    episodeNumber: "EPISODE 05",
    category: "AI & Judiciary",
    duration: "50 mins",
    speakers: [
      {
        name: "Dr. Rajesh Kumar",
        title: "Former Chief Justice & Research Chair",
      },
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
  {
    id: "upcoming-smart-contracts",
    slug: "web3-smart-contracts-commercial-dispute-resolution",
    title:
      "Smart Contracts, Blockchain Forensics and Commercial Arbitration Venues",
    description:
      "Exploring judicial enforceability of decentralized agreements, cryptographic audit logs in courtroom discovery, and multinational arbitration conventions.",
    date: "2026-05-12T14:30:00.000Z",
    youtubeUrl: "https://www.youtube.com/@TheBlackSilk",
    youtubeId: "Xk49GiJay68",
    isUpcoming: true,
    flags: ["UPCOMING", "SPECIAL EDITION"],
    episodeNumber: "EPISODE 06",
    category: "Blockchain Law",
    duration: "40 mins",
    speakers: [
      {
        name: "Neil Dawes",
        title: "Managing Partner, DawesCo LLP",
      },
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
];

// Fallback past episodes matching database records
const FALLBACK_PAST_PODCASTS: PodcastEpisode[] = [
  {
    id: "past-colloquy-ai",
    slug: "colloquy-on-artificial-intelligence-with-ray-sharma-and-kps-kohli",
    title: "Colloquy on Artificial Intelligence with Ray Sharma and KPS Kohli",
    description:
      "Ray is the founder and leader of Extreme Venture Partners, Canada's top seed stage venture fund with 100+ startups exited to Apple, Google, EA, McKesson, and Salesforce. A wide-ranging colloquy on AI venture trends and regulatory paradigms.",
    date: "2023-11-27T12:24:00.000Z",
    youtubeUrl: "https://youtu.be/7laF3tgWZ_E",
    youtubeId: "7laF3tgWZ_E",
    isUpcoming: false,
    flags: ["RECORDED", "WATCH NOW", "AI & VENTURE"],
    episodeNumber: "EPISODE 03",
    category: "AI & Venture",
    duration: "38 mins",
    speakers: [
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Ray Sharma",
        title: "Founder, Extreme Venture Partners",
      },
    ],
  },
  {
    id: "past-dpdp-part-1",
    slug: "dialogue-on-india-s-digital-personal-data-protection-act-2023-part-1",
    title: "Dialogue on India's Digital Personal Data Protection Act, 2023 - Part 1",
    description:
      "Mr. Mayank Grover and Mr. KPS Kohli discuss the implications of the DPDP Act for individuals and enterprises alike, debating seminal provisions and the statutory role of 'Consent Managers'.",
    date: "2023-09-12T23:00:00.000Z",
    youtubeUrl:
      "https://www.youtube.com/watch?v=x624GRuNkZA&embeds_referring_euri=https%3A%2F%2Ftheblacksilk.org%2F&source_ve_path=MjM4NTE",
    youtubeId: "x624GRuNkZA",
    isUpcoming: false,
    flags: ["RECORDED", "WATCH NOW", "DPDP SERIES"],
    episodeNumber: "EPISODE 01",
    category: "DPDP Series",
    duration: "42 mins",
    speakers: [
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Mr. Mayank Grover",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
  {
    id: "past-roundtable-dpdp",
    slug: "roundtable-conference-on-digital-personal-data-protection-act-2023",
    title:
      "Roundtable Conference on Digital Personal Data Protection Act 2023 and Its Implications",
    description:
      "Held at the India International Centre, New Delhi. Opening address by Chief Guest Justice V.N. Sinha (Retd.). Panellists delved into data privacy, consent architecture, cross-border data transfers, and enforcement.",
    date: "2023-08-31T10:30:00.000Z",
    youtubeUrl: "http://youtube.com/watch?v=Xk49GiJay68",
    youtubeId: "Xk49GiJay68",
    isUpcoming: false,
    flags: ["RECORDED", "WATCH NOW", "ROUNDTABLE"],
    episodeNumber: "SPECIAL SYMPOSIUM",
    category: "Roundtable",
    duration: "1 hr 15 mins",
    speakers: [
      {
        name: "Justice VN Sinha (Retd.)",
        title: "Chief Guest, Former Judge",
      },
      {
        name: "Mr. Sukanta Dey",
        title: "Senior Consultant (Moderator)",
      },
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Neil Dawes",
        title: "Managing Partner, DawesCo LLP",
      },
    ],
  },
];

export default function EventsAndPodcastsPage() {
  const [pastEpisodes, setPastEpisodes] =
    useState<PodcastEpisode[]>(FALLBACK_PAST_PODCASTS);
  const [upcomingEpisodes, setUpcomingEpisodes] =
    useState<PodcastEpisode[]>(UPCOMING_PODCASTS);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadEpisodes() {
      try {
        const response = await fetch("/api/events");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            // Map API events into podcasts
            const mappedEpisodes: PodcastEpisode[] = data.map((ev: any, idx: number) => {
              const yId = getYouTubeId(ev.youtubeUrl);
              const speakersList: Speaker[] = Array.isArray(ev.speakers)
                ? ev.speakers.map((s: any) => ({
                    name: s.name || "Speaker",
                    title: s.title || "",
                    role: s.role || "",
                    image: s.image || "",
                  }))
                : [];

              return {
                id: ev.id || `api-event-${idx}`,
                slug: ev.slug || `episode-${idx}`,
                title: ev.title,
                description: ev.description || "",
                date: ev.date,
                youtubeUrl: ev.youtubeUrl || "https://www.youtube.com/@TheBlackSilk",
                youtubeId: yId || undefined,
                isUpcoming: false,
                flags: [
                  "RECORDED",
                  "WATCH NOW",
                  ev.eventType === "roundtable" ? "ROUNDTABLE" : "PODCAST",
                ],
                speakers: speakersList,
                category:
                  ev.eventType === "roundtable"
                    ? "Roundtable"
                    : ev.title.includes("AI") || ev.title.includes("Artificial Intelligence")
                    ? "AI & Venture"
                    : "DPDP Series",
                episodeNumber: `EPISODE 0${idx + 1}`,
              };
            });

            if (mappedEpisodes.length > 0) {
              setPastEpisodes(mappedEpisodes);
            }
          }
        }
      } catch (err) {
        console.error("Error loading events from API:", err);
      }
    }

    loadEpisodes();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    [...upcomingEpisodes, ...pastEpisodes].forEach((ep) => {
      if (ep.category) set.add(ep.category);
    });
    return Array.from(set);
  }, [upcomingEpisodes, pastEpisodes]);

  const filteredUpcoming = useMemo(() => {
    return upcomingEpisodes.filter((ep) => {
      const matchSearch =
        ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.speakers.some((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchCat =
        selectedCategory === "All" || ep.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [upcomingEpisodes, searchQuery, selectedCategory]);

  const filteredPast = useMemo(() => {
    return pastEpisodes.filter((ep) => {
      const matchSearch =
        ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.speakers.some((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchCat =
        selectedCategory === "All" || ep.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [pastEpisodes, searchQuery, selectedCategory]);

  const handleShare = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Radio className="h-3.5 w-3.5 mr-2 text-white animate-pulse" />
              <span>Broadcasts & Legal Tech Colloquies</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Events & Podcasts
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-10">
              Direct discussions with senior jurists, venture leaders, and legal engineers on the Digital Personal Data Protection Act, generative AI jurisprudence, and cross-border tech policy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                className="bg-white !text-black hover:bg-neutral-200 rounded-none font-mono text-xs uppercase tracking-wider py-6 px-8 cursor-pointer font-semibold"
              >
                <a
                  href="https://www.youtube.com/@TheBlackSilk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4 mr-2 !text-black" />
                  Subscribe on YouTube
                  <ExternalLink className="ml-2 h-3.5 w-3.5 !text-black" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-700 text-white bg-transparent hover:bg-neutral-900 rounded-none font-mono text-xs uppercase tracking-wider py-6 px-6 cursor-pointer"
              >
                <Link href="#upcoming">View Upcoming Premieres</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-700 text-white bg-transparent hover:bg-neutral-900 rounded-none font-mono text-xs uppercase tracking-wider py-6 px-6 cursor-pointer"
              >
                <Link href="#past">Watch Past Episodes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Broadcast Quick Stats */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-neutral-200 p-4 text-center">
              <div className="text-2xl font-serif font-bold text-black">100%</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Direct YouTube Streams
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-4 text-center">
              <div className="text-2xl font-serif font-bold text-black">DPDP & AI</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Core Practice Tracks
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-4 text-center">
              <div className="text-2xl font-serif font-bold text-black">Free</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Public Access Always
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-4 text-center">
              <div className="text-2xl font-serif font-bold text-black">New Delhi</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Symposium Origins
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search episodes, topics, speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm h-10"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: UPCOMING PODCASTS (First) */}
      <section id="upcoming" className="py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-neutral-200 gap-4">
              <div>
                <div className="inline-flex items-center px-2.5 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider mb-2">
                  <Sparkles className="h-3 w-3 mr-1 text-white" />
                  Upcoming Broadcasts
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-black font-normal">
                  Upcoming Podcasts & Premieres
                </h2>
                <p className="text-sm text-neutral-600 font-sans mt-1">
                  Scheduled colloquies, forthcoming recordings, and upcoming YouTube premieres.
                </p>
              </div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {filteredUpcoming.length} Scheduled {filteredUpcoming.length === 1 ? "Broadcast" : "Broadcasts"}
              </div>
            </div>

            {filteredUpcoming.length === 0 ? (
              <div className="bg-white border border-neutral-200 p-12 text-center">
                <Radio className="h-10 w-10 text-neutral-400 mx-auto mb-3" />
                <h3 className="font-serif text-lg text-black mb-1">
                  No Matching Upcoming Broadcasts
                </h3>
                <p className="text-xs text-neutral-500">
                  Try adjusting your search query or category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredUpcoming.map((episode) => {
                  const isPlaying = activeVideoId === episode.id;

                  return (
                    <Card
                      key={episode.id}
                      className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group overflow-hidden"
                    >
                      {/* Video Player / Thumbnail Header */}
                      <div className="relative aspect-video bg-neutral-900 border-b border-neutral-200 overflow-hidden">
                        {isPlaying && episode.youtubeId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1&rel=0`}
                            title={episode.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <div
                            className="relative w-full h-full cursor-pointer group/thumb"
                            onClick={() => {
                              if (episode.youtubeId) {
                                setActiveVideoId(episode.id);
                              }
                            }}
                          >
                            {episode.youtubeId ? (
                              <Image
                                src={`https://img.youtube.com/vi/${episode.youtubeId}/hqdefault.jpg`}
                                alt={episode.title}
                                fill
                                className="object-cover grayscale group-hover/thumb:grayscale-0 transition-all duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black">
                                <Headphones className="h-12 w-12 text-neutral-700" />
                              </div>
                            )}

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-black/50 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
                              <div className="w-14 h-14 bg-white text-black rounded-none flex items-center justify-center shadow-md group-hover/thumb:scale-110 transition-transform">
                                <Play className="h-6 w-6 fill-black ml-0.5" />
                              </div>
                            </div>

                            {/* Top Flags */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                              <div className="flex flex-wrap gap-1.5">
                                {episode.flags.map((flag) => (
                                  <Badge
                                    key={flag}
                                    className={`rounded-none font-mono text-[9px] uppercase tracking-wider border ${
                                      flag === "UPCOMING" || flag === "NEW"
                                        ? "bg-white !text-black border-white font-bold"
                                        : "bg-black text-white border-neutral-700"
                                    }`}
                                  >
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                              {episode.episodeNumber && (
                                <Badge className="bg-black/90 text-neutral-300 border border-neutral-700 rounded-none font-mono text-[9px] uppercase tracking-wider">
                                  {episode.episodeNumber}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-black" />
                            {new Date(episode.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {episode.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-black" />
                              {episode.duration}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-serif text-black font-medium leading-snug mb-3 group-hover:text-neutral-700 transition-colors">
                          {episode.title}
                        </h3>

                        <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-3 mb-6">
                          {episode.description}
                        </p>

                        {/* Speakers Section */}
                        {episode.speakers.length > 0 && (
                          <div className="mt-auto pt-4 border-t border-neutral-100 mb-6">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                              Featuring
                            </p>
                            <div className="space-y-2">
                              {episode.speakers.map((sp, idx) => (
                                <SpeakerAvatar key={idx} speaker={sp} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            onClick={() => {
                              if (episode.youtubeId) {
                                setActiveVideoId(
                                  isPlaying ? null : episode.id
                                );
                              }
                            }}
                            className="flex-1 bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-2.5 cursor-pointer"
                          >
                            <Play className="h-3.5 w-3.5 mr-1.5 fill-white" />
                            {isPlaying ? "Close Player" : "Watch Preview"}
                          </Button>

                          <Button
                            asChild
                            variant="outline"
                            className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider px-3"
                          >
                            <a
                              href={episode.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Watch on YouTube"
                            >
                              <Youtube className="h-4 w-4" />
                            </a>
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => handleShare(episode.id, episode.youtubeUrl)}
                            className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider px-3"
                            title="Copy link"
                          >
                            {copiedId === episode.id ? (
                              <CheckCircle className="h-3.5 w-3.5 text-black" />
                            ) : (
                              <Share2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: PAST PODCASTS & EPISODES */}
      <section id="past" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-neutral-200 gap-4">
              <div>
                <div className="inline-flex items-center px-2.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-700 text-[10px] font-mono uppercase tracking-wider mb-2">
                  <Play className="h-3 w-3 mr-1 fill-white text-white" />
                  Archived Recordings
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-black font-normal">
                  Past Episodes & Roundtables
                </h2>
                <p className="text-sm text-neutral-600 font-sans mt-1">
                  Full-length podcast recordings and symposium proceedings available to watch directly on YouTube.
                </p>
              </div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {filteredPast.length} Recorded {filteredPast.length === 1 ? "Episode" : "Episodes"}
              </div>
            </div>

            {filteredPast.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200 p-12 text-center">
                <Youtube className="h-10 w-10 text-neutral-400 mx-auto mb-3" />
                <h3 className="font-serif text-lg text-black mb-1">
                  No Past Episodes Found
                </h3>
                <p className="text-xs text-neutral-500">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredPast.map((episode) => {
                  const isPlaying = activeVideoId === episode.id;

                  return (
                    <Card
                      key={episode.id}
                      className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group overflow-hidden"
                    >
                      {/* Video Player / Thumbnail Header */}
                      <div className="relative aspect-video bg-neutral-900 border-b border-neutral-200 overflow-hidden">
                        {isPlaying && episode.youtubeId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1&rel=0`}
                            title={episode.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <div
                            className="relative w-full h-full cursor-pointer group/thumb"
                            onClick={() => {
                              if (episode.youtubeId) {
                                setActiveVideoId(episode.id);
                              }
                            }}
                          >
                            {episode.youtubeId ? (
                              <Image
                                src={`https://img.youtube.com/vi/${episode.youtubeId}/hqdefault.jpg`}
                                alt={episode.title}
                                fill
                                className="object-cover grayscale group-hover/thumb:grayscale-0 transition-all duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black">
                                <Youtube className="h-12 w-12 text-neutral-700" />
                              </div>
                            )}

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-black/45 group-hover/thumb:bg-black/25 transition-colors flex items-center justify-center">
                              <div className="w-14 h-14 bg-white text-black rounded-none flex items-center justify-center shadow-md group-hover/thumb:scale-110 transition-transform">
                                <Play className="h-6 w-6 fill-black ml-0.5" />
                              </div>
                            </div>

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                              <div className="flex flex-wrap gap-1.5">
                                {episode.flags.map((flag) => (
                                  <Badge
                                    key={flag}
                                    className={`rounded-none font-mono text-[9px] uppercase tracking-wider border ${
                                      flag === "WATCH NOW" || flag === "RECORDED"
                                        ? "bg-black text-white border-neutral-700"
                                        : "bg-white !text-black border-neutral-300"
                                    }`}
                                  >
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                              {episode.episodeNumber && (
                                <Badge className="bg-black/90 text-neutral-300 border border-neutral-700 rounded-none font-mono text-[9px] uppercase tracking-wider">
                                  {episode.episodeNumber}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-black" />
                            {new Date(episode.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {episode.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-black" />
                              {episode.duration}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-serif text-black font-medium leading-snug mb-3 group-hover:text-neutral-700 transition-colors">
                          {episode.title}
                        </h3>

                        <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-3 mb-6">
                          {episode.description}
                        </p>

                        {/* Speakers Section */}
                        {episode.speakers.length > 0 && (
                          <div className="mt-auto pt-4 border-t border-neutral-100 mb-6">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                              Panellists & Speakers
                            </p>
                            <div className="space-y-2">
                              {episode.speakers.map((sp, idx) => (
                                <SpeakerAvatar key={idx} speaker={sp} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            onClick={() => {
                              if (episode.youtubeId) {
                                setActiveVideoId(
                                  isPlaying ? null : episode.id
                                );
                              }
                            }}
                            className="flex-1 bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-2.5 cursor-pointer"
                          >
                            <Play className="h-3.5 w-3.5 mr-1.5 fill-white" />
                            {isPlaying ? "Close Player" : "Watch Episode"}
                          </Button>

                          <Button
                            asChild
                            variant="outline"
                            className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider px-3"
                          >
                            <a
                              href={episode.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Watch directly on YouTube"
                            >
                              <Youtube className="h-4 w-4" />
                            </a>
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => handleShare(episode.id, episode.youtubeUrl)}
                            className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider px-3"
                            title="Copy link"
                          >
                            {copiedId === episode.id ? (
                              <CheckCircle className="h-3.5 w-3.5 text-black" />
                            ) : (
                              <Share2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* YouTube Channel Banner */}
      <section className="py-20 bg-black text-white border-t border-neutral-800">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto mb-6">
            <Youtube className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-white mb-4">
            Subscribe to The Black Silk YouTube Channel
          </h2>
          <p className="text-base text-neutral-400 font-sans font-light max-w-2xl mx-auto mb-8">
            Never miss an episode. Get notified whenever new interviews, DPDP colloquies, and legal engineering roundtables are broadcast.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white !text-black hover:bg-neutral-200 rounded-none font-mono text-xs uppercase tracking-wider px-8 py-6 cursor-pointer font-semibold"
          >
            <a
              href="https://www.youtube.com/@TheBlackSilk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-4 w-4 mr-2 !text-black" />
              Subscribe on YouTube
              <ExternalLink className="ml-2 h-3.5 w-3.5 !text-black" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
