import { generateMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MapPin,
  Star,
  ArrowRight,
  Search,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

// Force dynamic rendering - this page needs database access
export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = generateMetadata({
  title: "Upcoming Events - The Black Silk",
  description:
    "Join our upcoming events, symposiums, workshops on law, technology, and policy.",
  canonical: "https://theblacksilk.org/events/upcoming",
});

export default async function UpcomingEventsPage() {
  const now = new Date();
  const upcomingEvents = await prisma.event.findMany({
    where: {
      date: { gte: now },
    },
    include: { registrations: { select: { id: true } } },
    orderBy: { date: "asc" },
  });

  const totalEvents = upcomingEvents.length;
  const featuredEvent =
    upcomingEvents.find((e) => e.featured) || upcomingEvents[0];
  const otherEvents = upcomingEvents.filter((e) => e.id !== featuredEvent?.id);
  const categories = [
    "All",
    ...Array.from(new Set(upcomingEvents.map((e) => e.category))),
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events-upcoming-hero.jpg"
            alt="Upcoming Events"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">
                {totalEvents} {totalEvents === 1 ? "Event" : "Events"} Coming
                Soon
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join our upcoming symposiums, workshops, and networking events
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-white border-gray-200"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className={
                      category === "All"
                        ? "bg-black hover:bg-gray-800 text-white"
                        : "hover:bg-gray-100"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Display or No Events Message */}
      {totalEvents > 0 ? (
        <>
          {/* Featured Event */}
          {featuredEvent && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black mb-4 px-4 py-2">
                      <Star className="h-4 w-4 mr-2" />
                      Featured Event
                    </Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Don&apos;t Miss Our Flagship Event
                    </h2>
                  </div>
                  <Card className="border-0 shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-80 lg:h-auto">
                        <Image
                          src={featuredEvent.image || "/images/events-hero.jpg"}
                          alt={featuredEvent.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-red-500 text-white">
                            {featuredEvent.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-6 left-6">
                          <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                            {featuredEvent.registrations?.length || 0}{" "}
                            Registered
                          </div>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12">
                        <Badge
                          variant="outline"
                          className="text-prussian-blue border-prussian-blue mb-4"
                        >
                          {featuredEvent.category}
                        </Badge>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {featuredEvent.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                          {featuredEvent.description}
                        </p>
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-prussian-blue" />
                            <span>
                              {format(
                                new Date(featuredEvent.date),
                                "MMMM d, yyyy"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-prussian-blue" />
                            <span>
                              {featuredEvent.location} • {featuredEvent.mode}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-prussian-blue" />
                            <span>
                              {featuredEvent.capacity} Capacity •{" "}
                              {featuredEvent.registrations?.length || 0}{" "}
                              Registered
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold">
                            {featuredEvent.price
                              ? `₹${featuredEvent.price}`
                              : "Free"}
                          </div>
                          <Button
                            className="bg-black hover:bg-gray-800 text-white"
                            asChild
                          >
                            <Link href={`/events/${featuredEvent.slug}`}>
                              Register Now{" "}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* Other Events */}
          {otherEvents.length > 0 && (
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                    More Upcoming Events
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {otherEvents.map((event) => (
                      <Card
                        key={event.id}
                        className="border-0 shadow-lg hover:shadow-2xl transition-all group"
                      >
                        <div className="relative h-48">
                          <Image
                            src={event.image || "/images/events-hero.jpg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-4 left-4 bg-blue-500 text-white">
                            {event.status}
                          </Badge>
                          <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                            {event.category}
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-3 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-6 line-clamp-3">
                            {event.description}
                          </p>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-prussian-blue" />
                              <span>
                                {format(new Date(event.date), "MMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-prussian-blue" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-prussian-blue" />
                              <span>
                                {event.registrations?.length || 0} /{" "}
                                {event.capacity}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">
                              {event.price ? `₹${event.price}` : "Free"}
                            </div>
                            <Button
                              size="sm"
                              className="bg-black hover:bg-gray-800 text-white"
                              asChild
                            >
                              <Link href={`/events/${event.slug}`}>
                                Register
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Calendar className="h-16 w-16 mx-auto mb-6 text-gray-400" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Upcoming Events Yet
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Check back soon or subscribe to stay updated!
              </p>
              <Button className="bg-black hover:bg-gray-800 text-white" asChild>
                <Link href="/knowledge-hub/newsletter">
                  Subscribe to Newsletter
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Never Miss an Event</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our event calendar and get notified about upcoming
              opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link href="/knowledge-hub/newsletter">
                  Subscribe to Calendar
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/events/past">View Past Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
