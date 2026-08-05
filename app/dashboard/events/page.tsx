"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  type: string;
  status: string;
  attendees: number;
  description?: string;
  image?: string;
  price?: string;
  isVirtual: boolean;
}

export default function EventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchEvents();
    }
  }, [session]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const [upcomingRes, pastRes] = await Promise.all([
        fetch("/api/user/upcoming-events"),
        fetch("/api/user/past-events"),
      ]);

      if (upcomingRes.ok) {
        const upcomingData = await upcomingRes.json();
        setUpcomingEvents(upcomingData.events || []);
      }

      if (pastRes.ok) {
        const pastData = await pastRes.json();
        setPastEvents(pastData.events || []);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const filteredUpcomingEvents = upcomingEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastEvents = pastEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            My Events
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your event registrations and access past events
          </p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto">
          <ExternalLink className="mr-2 h-4 w-4" />
          Browse All Events
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Events Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {filteredUpcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="p-12">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't registered for any upcoming events yet. Browse
                    all events to find ones that interest you!
                  </p>
                  <Button asChild>
                    <Link href="/events">Browse All Events</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUpcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {event.image && (
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={
                            event.status === "Registered"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            event.status === "Registered"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-tight">
                        {event.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {event.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
                          {event.date}
                          {event.time && ` at ${event.time}`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      {event.attendees > 0 && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{event.attendees}+ attendees</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {event.price && (
                        <span className="font-semibold text-primary">
                          {event.price}
                        </span>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {filteredPastEvents.length === 0 ? (
            <Card>
              <CardContent className="p-12">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Past Events
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't attended any events yet.
                  </p>
                  <Button asChild>
                    <Link href="/events">Browse All Events</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPastEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      {event.attendees > 0 && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge className="bg-green-100 text-green-800">
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/events/${event.id}`}>
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View Event
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
