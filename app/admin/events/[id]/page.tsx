"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Loader2,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Search,
} from "lucide-react";
import { SpeakersField } from "@/components/admin/speakers-field";
import { TimelineField } from "@/components/admin/timeline-field";

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

interface Registration {
  id: string;
  userId: string;
  eventId: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    organization?: string;
  };
}

interface RegistrationStats {
  total: number;
  registered: number;
  attended: number;
  cancelled: number;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Event form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    isVirtual: false,
    maxAttendees: "",
    price: "",
    eventType: "roundtable",
    youtubeUrl: "",
    registrationFormUrl: "",
    speakers: [] as Speaker[],
    timeline: [] as TimelineItem[],
  });

  // Registrations data
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);
  const [stats, setStats] = useState<RegistrationStats>({
    total: 0,
    registered: 0,
    attended: 0,
    cancelled: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (eventId) {
      fetchEvent();
      fetchRegistrations();
    }
  }, [eventId]);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchQuery, statusFilter]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`);
      if (response.ok) {
        const event = await response.json();
        setFormData({
          title: event.title,
          description: event.description,
          date: new Date(event.date).toISOString().slice(0, 16),
          endDate: event.endDate
            ? new Date(event.endDate).toISOString().slice(0, 16)
            : "",
          location: event.location || "",
          isVirtual: event.isVirtual,
          maxAttendees: event.maxAttendees?.toString() || "",
          price: event.price?.toString() || "",
          eventType: event.eventType || "roundtable",
          youtubeUrl: event.youtubeUrl || "",
          registrationFormUrl: event.registrationFormUrl || "",
          speakers: event.speakers || [],
          timeline: event.timeline || [],
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch event details",
          variant: "destructive",
        });
        router.push("/admin/events");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      toast({
        title: "Error",
        description: "Failed to fetch event details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(
        `/api/admin/event-registrations?eventId=${eventId}`
      );
      if (response.ok) {
        const data = await response.json();
        const eventRegistrations = data.registrations || [];
        setRegistrations(eventRegistrations);
        calculateStats(eventRegistrations);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const calculateStats = (data: Registration[]) => {
    const stats = {
      total: data.length,
      registered: data.filter((r) => r.status === "registered").length,
      attended: data.filter((r) => r.status === "attended").length,
      cancelled: data.filter((r) => r.status === "cancelled").length,
    };
    setStats(stats);
  };

  const filterRegistrations = () => {
    let filtered = [...registrations];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (reg) =>
          reg.user.name.toLowerCase().includes(query) ||
          reg.user.email.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((reg) => reg.status === statusFilter);
    }

    setFilteredRegistrations(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const toSend = {
        ...formData,
        speakers: formData.speakers.length > 0 ? formData.speakers : undefined,
        timeline: formData.timeline.length > 0 ? formData.timeline : undefined,
      };

      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
        router.push("/admin/events");
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to update event",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRegistrationStatus = async () => {
    if (!selectedRegistration || !newStatus) return;

    try {
      const response = await fetch(
        `/api/admin/event-registrations/${selectedRegistration.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      toast({
        title: "Success",
        description: "Registration status updated successfully",
      });

      fetchRegistrations();
      setIsUpdateDialogOpen(false);
      setSelectedRegistration(null);
      setNewStatus("");
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update registration status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const response = await fetch(`/api/admin/event-registrations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete registration");

      toast({
        title: "Success",
        description: "Registration deleted successfully",
      });

      fetchRegistrations();
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration",
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Organization",
      "Status",
      "Registered At",
    ];
    const rows = filteredRegistrations.map((reg) => [
      reg.user.name,
      reg.user.email,
      reg.user.organization || "N/A",
      reg.status,
      new Date(reg.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-${eventId}-registrations-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Registrations exported successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      registered: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Registered",
      },
      attended: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Attended",
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        label: "Cancelled",
      },
    };

    const variant = variants[status] || variants.registered;
    return <Badge className={`${variant.color} border`}>{variant.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-gray-600">
              Update event details and manage registrations
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="registrations">
            Registrations ({stats.total})
          </TabsTrigger>
        </TabsList>

        {/* Event Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details of the event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Input
                      id="eventType"
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventType: e.target.value,
                        })
                      }
                      placeholder="roundtable | podcast | webinar"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    required
                    placeholder="Describe the event"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle>Date & Time</CardTitle>
                <CardDescription>Set the event schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Start Date & Time *</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  Specify where the event will take place
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isVirtual"
                    checked={formData.isVirtual}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isVirtual: checked })
                    }
                  />
                  <Label htmlFor="isVirtual" className="cursor-pointer">
                    Virtual Event
                  </Label>
                </div>

                {!formData.isVirtual && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Physical Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Enter venue address"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Registration & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Registration & Pricing</CardTitle>
                <CardDescription>
                  Set attendance limits and pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={formData.maxAttendees}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxAttendees: e.target.value,
                        })
                      }
                      placeholder="Leave empty for unlimited"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0 for free event"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationFormUrl">
                    Registration Form URL
                  </Label>
                  <Input
                    id="registrationFormUrl"
                    value={formData.registrationFormUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationFormUrl: e.target.value,
                      })
                    }
                    placeholder="https://forms.example.com/..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>
                  Add links to related media content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube Link</Label>
                  <Input
                    id="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        youtubeUrl: e.target.value,
                      })
                    }
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Speakers */}
            <Card>
              <CardHeader>
                <CardTitle>Speakers</CardTitle>
                <CardDescription>Add speakers for the event</CardDescription>
              </CardHeader>
              <CardContent>
                <SpeakersField
                  speakers={formData.speakers}
                  onChange={(speakers) =>
                    setFormData({ ...formData, speakers })
                  }
                />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Event Timeline</CardTitle>
                <CardDescription>Add an agenda or schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <TimelineField
                  timeline={formData.timeline}
                  onChange={(timeline) =>
                    setFormData({ ...formData, timeline })
                  }
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/events">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Registrations Tab */}
        <TabsContent value="registrations" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Registrations
                </CardTitle>
                <Users className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {stats.total}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Registered
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.registered}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Attended
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.attended}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Cancelled
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.cancelled}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters & Actions</CardTitle>
              <CardDescription>
                Search and filter event registrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="attended">Attended</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={handleExportCSV} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Registrations Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Registrations ({filteredRegistrations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-slate-500"
                      >
                        No registrations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">
                          {registration.user.name}
                        </TableCell>
                        <TableCell>{registration.user.email}</TableCell>
                        <TableCell>
                          {registration.user.organization || "N/A"}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(registration.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            registration.createdAt
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedRegistration(registration);
                                setNewStatus(registration.status);
                                setIsUpdateDialogOpen(true);
                              }}
                            >
                              Update Status
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteRegistration(registration.id)
                              }
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Registration Status</DialogTitle>
            <DialogDescription>
              Change the status of this event registration
            </DialogDescription>
          </DialogHeader>

          {selectedRegistration && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Attendee</p>
                <p className="text-sm text-slate-900">
                  {selectedRegistration.user.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  New Status
                </p>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="attended">Attended</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateRegistrationStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
