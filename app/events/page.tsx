"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  isVirtual: boolean;
  eventType?: string;
  maxAttendees?: number;
  price?: number;
  status: string;
  registrationCount: number;
  speakers?: any;
  image?: string;
}

const eventStats = [
  { label: "Total Events", value: "50+", icon: Calendar, color: "bg-blue-500" },
  {
    label: "Total Attendees",
    value: "5,000+",
    icon: Users,
    color: "bg-green-500",
  },
  {
    label: "Average Rating",
    value: "4.8/5",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    label: "Success Rate",
    value: "98%",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
];

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");
      if (response.ok) {
        const events = await response.json();
        const now = new Date();

        // Separate upcoming and past events
        const upcoming = events.filter(
          (event: Event) => new Date(event.date) >= now
        );
        const past = events
          .filter((event: Event) => new Date(event.date) < now)
          .sort(
            (a: Event, b: Event) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );

        setUpcomingEvents(upcoming.slice(0, 6));
        setPastEvents(past.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (price?: number) => {
    if (!price || price === 0) return "Free";
    return `₹${price.toLocaleString()}`;
  };

  const featuredEvent = upcomingEvents[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Fixed */}
      <section className="relative py-24 lg:py-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events-hero-bg.jpg"
            alt="Legal technology conference"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                50+ Events Annually
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Events & Conferences
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-3xl mx-auto">
              Join India's premier legal technology events. Connect with
              industry leaders, learn cutting-edge practices, and shape the
              future of law and technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href="#upcoming-events">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/events/past">View Past Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {eventStats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-20 bg-white" id="featured-event">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black mb-4 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Featured Event
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Don't Miss Our Flagship Event
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join industry leaders for our most anticipated event
                </p>
              </div>

              <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <Image
                      src={featuredEvent.image || "/images/event-featured.jpg"}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Event Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-red-500 text-white">
                        {featuredEvent.status}
                      </Badge>
                      <Badge className="bg-black/80 text-white">
                        {featuredEvent.eventType || "Event"}
                      </Badge>
                    </div>

                    {/* Event Stats */}
                    {featuredEvent.speakers && (
                      <div className="absolute bottom-6 left-6 flex gap-4">
                        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                          {Array.isArray(featuredEvent.speakers)
                            ? featuredEvent.speakers.length
                            : 0}{" "}
                          Speakers
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {featuredEvent.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-10 h-10 bg-prussian-blue/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-prussian-blue" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {formatDate(featuredEvent.date)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatTime(featuredEvent.date)}
                            {featuredEvent.endDate &&
                              ` - ${formatTime(featuredEvent.endDate)}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-10 h-10 bg-prussian-blue/10 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-prussian-blue" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {featuredEvent.isVirtual
                              ? "Virtual Event"
                              : featuredEvent.location}
                          </div>
                          <div className="text-sm text-gray-500">
                            {featuredEvent.maxAttendees
                              ? `${featuredEvent.maxAttendees}+ Expected`
                              : `${featuredEvent.registrationCount} Registered`}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900">
                        {formatPrice(featuredEvent.price)}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" asChild>
                          <Link href={`/events/${featuredEvent.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                        <Button className="bg-black hover:bg-gray-800" asChild>
                          <Link href={`/events/${featuredEvent.slug}/register`}>
                            Register Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
        id="upcoming-events"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't miss these exciting opportunities to learn, network, and
                contribute to the future of legal technology
              </p>
            </div>

            {upcomingEvents.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Check back soon for new events and workshops.
                  </p>
                  <Button asChild>
                    <Link href="/events/past">View Past Events</Link>
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {upcomingEvents.slice(1, 4).map((event) => (
                    <Card
                      key={event.id}
                      className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={event.image || "/images/event-placeholder.jpg"}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge
                            className={
                              event.status === "upcoming"
                                ? "bg-green-500 text-white"
                                : event.status === "ongoing"
                                ? "bg-orange-500 text-white"
                                : "bg-blue-500 text-white"
                            }
                          >
                            {event.status}
                          </Badge>
                          <Badge className="bg-black/80 text-white">
                            {event.eventType || "Event"}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-prussian-blue transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {event.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-prussian-blue" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-prussian-blue" />
                            <span>{formatTime(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-prussian-blue" />
                            <span>
                              {event.isVirtual
                                ? "Virtual Event"
                                : event.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-prussian-blue" />
                            <span>{event.registrationCount} Registered</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(event.price)}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/events/${event.slug}`}>
                                Details
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              className="bg-black hover:bg-gray-800"
                              asChild
                            >
                              <Link href={`/events/${event.slug}/register`}>
                                Register
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {upcomingEvents.length > 4 && (
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      asChild
                    >
                      <Link href="/events/upcoming">
                        View All Upcoming Events
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Past Events Preview */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Past Events
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore our previous events and see the impact we've made in
                  the legal technology community
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {pastEvents.slice(0, 2).map((event) => (
                  <Card
                    key={event.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group bg-white"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/2 h-48 md:h-auto overflow-hidden">
                        <Image
                          src={
                            event.image || "/images/past-event-placeholder.jpg"
                          }
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-gray-600 text-white">
                            {event.eventType || "Event"}
                          </Badge>
                        </div>
                      </div>

                      <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-prussian-blue transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-prussian-blue" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-prussian-blue" />
                            <span>
                              {event.isVirtual
                                ? "Virtual Event"
                                : event.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-prussian-blue" />
                            <span>{event.registrationCount} Attended</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="self-start"
                          asChild
                        >
                          <Link href={`/events/${event.slug}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/events/past">View All Past Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Never Miss an Event
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community to receive notifications about new events,
              workshops, and conferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href="/community/membership">
                  Become a Member
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/knowledge-hub/newsletter">
                  Subscribe to Newsletter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
