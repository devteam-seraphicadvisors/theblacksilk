import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  Eye,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export async function FeaturedContent() {
  let featuredPublication = null;
  let upcomingEvents: any[] = [];
  let recentPublications: any[] = [];
  let activeCommittees: any[] = [];
  let newMembersThisMonth = 0;
  let eventsHostedThisMonth = 0;
  let newPublicationsThisMonth = 0;

  try {
    // Fetch real data from database with error handling
    const results = await Promise.allSettled([
      prisma.publication.findFirst({
        where: { featured: true, published: true },
        orderBy: { publishedAt: "desc" },
      }),
      prisma.event.findMany({
        where: {
          date: { gte: new Date() },
          status: "upcoming",
        },
        take: 2,
        orderBy: { date: "asc" },
        include: {
          registrations: { select: { id: true } },
        },
      }),
      prisma.publication.findMany({
        where: { published: true },
        take: 3,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.committee.findMany({
        where: { status: "active" },
        take: 4,
        include: {
          members: { select: { id: true } },
        },
      }),
      Promise.allSettled([
        prisma.user.count({
          where: {
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          },
        }),
        prisma.event.count({
          where: {
            date: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              lte: new Date(),
            },
            status: { not: "cancelled" },
          },
        }),
        prisma.publication.count({
          where: {
            published: true,
            publishedAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]),
    ]);

    // Extract results safely
    if (results[0].status === "fulfilled")
      featuredPublication = results[0].value;
    if (results[1].status === "fulfilled") upcomingEvents = results[1].value;
    if (results[2].status === "fulfilled")
      recentPublications = results[2].value;
    if (results[3].status === "fulfilled") activeCommittees = results[3].value;
    if (results[4].status === "fulfilled") {
      const statsResults = results[4].value;
      if (statsResults[0].status === "fulfilled")
        newMembersThisMonth = statsResults[0].value;
      if (statsResults[1].status === "fulfilled")
        eventsHostedThisMonth = statsResults[1].value;
      if (statsResults[2].status === "fulfilled")
        newPublicationsThisMonth = statsResults[2].value;
    }
  } catch (error) {
    console.error("Error fetching featured content:", error);
    // Continue with empty/default data
  }

  // Fallback data if no real data exists
  const defaultPublication = {
    id: "default",
    title:
      "The Future of AI Governance in India: Balancing Innovation and Regulation",
    excerpt:
      "An in-depth analysis of India's approach to AI regulation and its implications for the tech industry, legal framework, and society at large.",
    author: "Dr. Priya Sharma",
    authorImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "Tech Policy",
    tags: ["AI Governance"],
    readTime: "8 min read",
    views: 2300,
    publishedAt: new Date("2024-12-15"),
  };

  const displayPublication = featuredPublication || defaultPublication;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-6">
            <TrendingUp className="h-4 w-4 text-prussian-blue mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Latest from Our Community
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stay Updated with Our Latest
            <span className="block text-prussian-blue">Insights & Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge research, upcoming events, and collaborative
            initiatives shaping the future of legal technology
          </p>
        </div>

        {/* Featured Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Blog Post */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={
                    displayPublication.image ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
                  }
                  alt={displayPublication.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-prussian-blue/90 text-white backdrop-blur-sm">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Featured Article
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <Eye className="h-4 w-4" />
                    <span>{displayPublication.views} views</span>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="border-prussian-blue text-prussian-blue"
                  >
                    {displayPublication.category}
                  </Badge>
                  {displayPublication.tags && displayPublication.tags[0] && (
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-600"
                    >
                      {displayPublication.tags[0]}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl md:text-3xl leading-tight font-bold group-hover:text-prussian-blue transition-colors text-gray-900">
                  {displayPublication.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  {displayPublication.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {displayPublication.authorImage && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={displayPublication.authorImage}
                          alt={displayPublication.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {displayPublication.author}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span>
                          {new Date(
                            displayPublication.publishedAt
                          ).toLocaleDateString()}
                        </span>
                        {displayPublication.readTime && (
                          <>
                            <span>•</span>
                            <span>{displayPublication.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-prussian-blue hover:bg-prussian-blue/90 text-white group"
                    asChild
                  >
                    <Link href={`/knowledge-hub/blog/${displayPublication.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Event */}
          <div className="space-y-8">
            {upcomingEvents.length > 0 ? (
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
                    alt={upcomingEvents[0].title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500/90 text-white backdrop-blur-sm animate-pulse">
                      <Calendar className="h-3 w-3 mr-1" />
                      Upcoming Event
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold group-hover:text-prussian-blue transition-colors text-gray-900">
                    {upcomingEvents[0].title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {upcomingEvents[0].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-prussian-blue/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-prussian-blue" />
                      </div>
                      <span>
                        {new Date(upcomingEvents[0].date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-prussian-blue/10 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-prussian-blue" />
                      </div>
                      <span>
                        {new Date(upcomingEvents[0].date).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-prussian-blue/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-prussian-blue" />
                      </div>
                      <span>
                        {upcomingEvents[0].registrations.length} Registered
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white shadow-lg"
                    asChild
                  >
                    <Link href={`/events/${upcomingEvents[0].id}`}>
                      Register Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">No Upcoming Events</h3>
                  <p className="text-gray-600">
                    Check back soon for new events!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="border-0 shadow-xl bg-gray-900 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Community Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">This Month</span>
                    <span className="font-bold text-xl">
                      {newMembersThisMonth} New Members
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Events Hosted</span>
                    <span className="font-bold text-xl">
                      {eventsHostedThisMonth} Events
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Publications</span>
                    <span className="font-bold text-xl">
                      {newPublicationsThisMonth} New Papers
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Publications */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Recent Publications
              </h3>
              <p className="text-gray-600">
                Latest research and insights from our community
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-prussian-blue hover:bg-prussian-blue/10"
              asChild
            >
              <Link href="/knowledge-hub/blog">
                View All Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPublications.map((publication) => (
              <Card
                key={publication.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={
                      publication.image ||
                      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop"
                    }
                    alt={publication.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {publication.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight font-bold group-hover:text-prussian-blue transition-colors text-gray-900">
                    {publication.title}
                  </CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{publication.author}</span>
                    <span>
                      {new Date(publication.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4" />
                      <span>{publication.downloads} downloads</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-gray-900 group-hover:text-white transition-colors border-gray-300 text-gray-700"
                    asChild
                  >
                    <Link href={`/knowledge-hub/blog/${publication.id}`}>
                      {publication.pdfUrl ? "Download PDF" : "Read More"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
