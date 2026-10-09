import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { generateEventSchema, generateBreadcrumbSchema } from "@/lib/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Video,
  ArrowLeft,
  ExternalLink,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface Speaker {
  name: string;
  title: string;
  bio?: string;
  image?: string;
  url?: string;
}

interface TimelineItem {
  time: string;
  title: string;
  description?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) {
    return generateSEOMetadata({
      title: "Event Not Found",
      description: "The requested event could not be found.",
    });
  }

  return generateSEOMetadata({
    title: `${event.title} - Events`,
    description: event.description.substring(0, 160),
    canonical: `https://theblacksilk.org/events/${event.slug}`,
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      registrations: {
        select: { id: true },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const speakers = event.speakers as Speaker[] | null;
  const timeline = event.timeline as TimelineItem[] | null;
  const registrationCount = event.registrations.length;
  const isUpcoming =
    event.status === "upcoming" && new Date(event.date) > new Date();

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const youtubeEmbedUrl = event.youtubeUrl
    ? getYouTubeEmbedUrl(event.youtubeUrl)
    : null;

  const jsonLd = generateEventSchema(event);
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Home", item: "https://theblacksilk.org" },
    { name: "Events", item: "https://theblacksilk.org/events" },
    {
      name: event.title,
      item: `https://theblacksilk.org/events/${event.slug}`,
    },
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { color: "bg-white text-black border border-white", label: "Upcoming" },
      ongoing: { color: "bg-neutral-800 text-white border border-neutral-700", label: "Ongoing" },
      completed: { color: "bg-neutral-100 text-neutral-800 border border-neutral-300", label: "Completed" },
      cancelled: { color: "bg-neutral-200 text-neutral-700 border border-neutral-300", label: "Cancelled" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.upcoming;

    return (
      <Badge className={`${config.color} rounded-none font-mono text-xs uppercase tracking-wider`}>
        {config.label}
      </Badge>
    );
  };

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
        {/* Back Button */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" asChild>
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>

        {/* Event Header */}
        <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap gap-3 mb-6">
                {getStatusBadge(event.status)}
                {event.eventType && (
                  <Badge className="bg-white/20 text-white">
                    {event.eventType}
                  </Badge>
                )}
                {event.isVirtual && (
                  <Badge className="bg-white/20 text-white">
                    <Video className="h-3 w-3 mr-1" />
                    Virtual Event
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Date</div>
                    <div className="font-semibold">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Time</div>
                    <div className="font-semibold">
                      {new Date(event.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Location</div>
                    <div className="font-semibold">
                      {event.isVirtual ? "Virtual" : event.location || "TBD"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Price</div>
                    <div className="font-semibold">
                      {event.price ? `$${event.price}` : "Free"}
                    </div>
                  </div>
                </div>
              </div>

              {isUpcoming && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {event.registrationFormUrl ? (
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      asChild
                    >
                      <a
                        href={event.registrationFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register Now
                        <ExternalLink className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      asChild
                    >
                      <Link href="/login">Register Now</Link>
                    </Button>
                  )}
                  {event.maxAttendees && (
                    <div className="flex items-center gap-2 text-white px-4">
                      <Users className="h-5 w-5" />
                      <span>
                        {registrationCount} / {event.maxAttendees} attendees
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* YouTube Video */}
        {youtubeEmbedUrl && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {event.status === "completed"
                    ? "Event Recording"
                    : "Live Stream"}
                </h2>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={event.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Event Description */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About This Event
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers */}
        {speakers && speakers.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Speakers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {speakers.map((speaker, index) => (
                    <Card
                      key={speaker.name ? `speaker-${speaker.name}-${index}` : `speaker-${index}`}
                      className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          {speaker.image ? (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                              <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                              <User className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {speaker.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {speaker.title}
                          </p>
                          {speaker.bio && (
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                              {speaker.bio}
                            </p>
                          )}
                          {speaker.url && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={speaker.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Learn More
                                <ExternalLink className="ml-2 h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Timeline */}
        {timeline && timeline.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Event Timeline
                </h2>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div
                      key={item.time ? `timeline-${item.time}-${index}` : `timeline-${index}`}
                      className="flex gap-6"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-prussian-blue text-white flex items-center justify-center font-semibold">
                          <Clock className="h-5 w-5" />
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                          <div className="text-sm font-semibold text-prussian-blue mb-2">
                            {item.time}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-gray-700 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}
