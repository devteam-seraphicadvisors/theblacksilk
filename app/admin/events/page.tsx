"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Video,
  Eye,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location?: string;
  isVirtual: boolean;
  maxAttendees?: number;
  price?: number;
  status: string;
  currentAttendees: number;
  createdAt: string;
}

export default function EventsManagement() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch events",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
        toast({
          title: "Success",
          description: "Event deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete event",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string, eventDate: string | Date) => {
    const now = new Date();
    const date = new Date(eventDate);

    // Determine actual status based on date
    let actualStatus = status;
    if (date < now && status !== "cancelled") {
      actualStatus = "completed";
    } else if (
      date >= now &&
      (status === "completed" || status === "upcoming")
    ) {
      actualStatus = "upcoming";
    }

    const statusConfig = {
      upcoming: {
        variant: "default" as const,
        color: "bg-blue-100 text-blue-800",
      },
      ongoing: {
        variant: "default" as const,
        color: "bg-green-100 text-green-800",
      },
      completed: {
        variant: "secondary" as const,
        color: "bg-gray-100 text-gray-800",
      },
      cancelled: {
        variant: "destructive" as const,
        color: "bg-red-100 text-red-800",
      },
    };

    const config =
      statusConfig[actualStatus as keyof typeof statusConfig] ||
      statusConfig.upcoming;

    return (
      <Badge variant={config.variant} className={config.color}>
        {actualStatus.charAt(0).toUpperCase() + actualStatus.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Events Management
            </h1>
            <p className="text-gray-600">Manage all events and registrations</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Events Management
          </h1>
          <p className="text-gray-600">Manage all events and registrations</p>
        </div>
        <Link href="/admin/events/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Events Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                events.filter((e) => {
                  const now = new Date();
                  const eventDate = new Date(e.date);
                  return eventDate >= now && e.status !== "cancelled";
                }).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attendees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.reduce((sum, event) => sum + event.currentAttendees, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {events
                .reduce(
                  (sum, event) =>
                    sum + (event.price || 0) * event.currentAttendees,
                  0
                )
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>
            Manage and monitor all events on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {event.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(event.date).toLocaleDateString()}
                      <br />
                      <span className="text-gray-500">
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {event.isVirtual ? (
                        <>
                          <Video className="mr-1 h-3 w-3" />
                          Virtual
                        </>
                      ) : (
                        <>
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location || "TBD"}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {event.currentAttendees}
                      {event.maxAttendees && ` / ${event.maxAttendees}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {event.price ? `$${event.price}` : "Free"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(event.status, event.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/events/${event.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
