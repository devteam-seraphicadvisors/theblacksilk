"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
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

export default function CreateEventPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const toSend = {
        ...formData,
        speakers: formData.speakers.length > 0 ? formData.speakers : undefined,
        timeline: formData.timeline.length > 0 ? formData.timeline : undefined,
      };

      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Event created successfully",
        });
        router.push("/admin/events");
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create event",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Event
            </h1>
            <p className="text-gray-600">Add a new event to the platform</p>
          </div>
        </div>
      </div>

      {/* Form */}
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
            <CardDescription>Set attendance limits and pricing</CardDescription>
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
              <Label htmlFor="registrationFormUrl">Registration Form URL</Label>
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
              onChange={(speakers) => setFormData({ ...formData, speakers })}
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
              onChange={(timeline) => setFormData({ ...formData, timeline })}
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
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Event
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
