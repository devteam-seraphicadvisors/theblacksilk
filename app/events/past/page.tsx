import { generateMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Play,
  Download,
  Star,
  Eye,
  Search,
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
  title: "Past Events - The Black Silk",
  description: "Explore our archive of past events, symposiums, and workshops.",
  canonical: "https://theblacksilk.org/events/past",
});

export default async function PastEventsPage() {
  const now = new Date();
  const pastEvents = await prisma.event.findMany({
    where: {
      date: { lt: now },
    },
    include: { registrations: { select: { id: true } } },
    orderBy: { date: "desc" },
  });

  const totalEvents = pastEvents.length;
  const categories = [
    "All",
    ...Array.from(new Set(pastEvents.map((e) => e.category))),
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-3 py-1 mb-8">
              <Calendar className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                {totalEvents} Past {totalEvents === 1 ? "Event" : "Events"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Past Events
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Explore our archive of events, symposiums, and workshops
            </p>
          </div>
        </div>
      </section>
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search past events..."
                  className="pl-10 bg-white"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={cat === "All" ? "default" : "outline"}
                    size="sm"
                    className={
                      cat === "All"
                        ? "bg-black hover:bg-gray-800 text-white"
                        : ""
                    }
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {totalEvents > 0 ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
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
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                        Completed
                      </Badge>
                      <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                        {event.category}
                      </Badge>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                          <Eye className="h-3 w-3 inline mr-1" />
                          {event.registrations?.length || 0} Attended
                        </div>
                      </div>
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
                          <Users className="h-4 w-4 text-prussian-blue" />
                          <span>
                            {event.registrations?.length || 0} Attendees
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <Link href={`/events/${event.slug}`}>
                            <Eye className="h-4 w-4 mr-1" /> View Details
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
      ) : (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Calendar className="h-16 w-16 mx-auto mb-6 text-gray-400" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Past Events
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Check out our upcoming events!
              </p>
              <Button className="bg-black hover:bg-gray-800 text-white" asChild>
                <Link href="/events/upcoming">View Upcoming Events</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
