"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Users,
  BookOpen,
  MessageSquare,
  Bell,
  TrendingUp,
  Award,
  MapPin,
  FileText,
  User,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  eventsAttended: number;
  committeeMemberships: number;
  publicationsRead: number;
  engagementScore: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  attendees: number;
  isVirtual: boolean;
}

interface Committee {
  id: string;
  name: string;
  role: string;
  meetings: number;
  joinedAt: Date;
}

interface Activity {
  action: string;
  time: string;
  icon: string;
  color: string;
}

interface Notification {
  message: string;
  time: string;
  type: string;
  color: string;
}

interface MembershipStatus {
  type: string;
  status: string;
  validUntil: string | null;
  progress: number;
  remainingDays: number;
  isExpired: boolean;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [membershipStatus, setMembershipStatus] =
    useState<MembershipStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      setError(null);

      const [
        statsRes,
        eventsRes,
        committeesRes,
        activitiesRes,
        notificationsRes,
        membershipRes,
      ] = await Promise.all([
        fetch("/api/user/dashboard-stats"),
        fetch("/api/user/upcoming-events"),
        fetch("/api/user/committees"),
        fetch("/api/user/recent-activity"),
        fetch("/api/user/notifications"),
        fetch("/api/user/membership-status"),
      ]);

      // Handle stats
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      } else {
        console.error("Failed to fetch stats");
      }

      // Handle events
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setEvents(eventsData.events || []);
      } else {
        console.error("Failed to fetch events");
      }

      // Handle committees
      if (committeesRes.ok) {
        const committeesData = await committeesRes.json();
        setCommittees(committeesData.committees || []);
      } else {
        console.error("Failed to fetch committees");
      }

      // Handle activities
      if (activitiesRes.ok) {
        const activitiesData = await activitiesRes.json();
        setActivities(activitiesData.activities || []);
      } else {
        console.error("Failed to fetch activities");
      }

      // Handle notifications
      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData.notifications || []);
      } else {
        console.error("Failed to fetch notifications");
      }

      // Handle membership
      if (membershipRes.ok) {
        const membershipData = await membershipRes.json();
        setMembershipStatus(membershipData.membershipStatus);
      } else {
        console.error("Failed to fetch membership");
      }

      setDataLoaded(true);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      redirect("/login");
      return;
    }

    if (session?.user && !dataLoaded) {
      fetchDashboardData();
    }
  }, [status, session?.user, dataLoaded, fetchDashboardData]);

  const getIconComponent = (iconName: string) => {
    const icons = {
      Users,
      MessageSquare,
      Calendar,
      FileText,
    };
    return icons[iconName as keyof typeof icons] || MessageSquare;
  };

  const handleRefresh = () => {
    setDataLoaded(false);
    fetchDashboardData();
  };

  if (status === "loading") {
    return <DashboardSkeleton />;
  }

  if (!session?.user) {
    redirect("/login");
    return null;
  }

  if (loading && !dataLoaded) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-gray-600">
              Here's what's happening in your legal tech community
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <Button
                variant="link"
                size="sm"
                onClick={handleRefresh}
                className="ml-2 p-0 h-auto"
              >
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Events Attended
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.eventsAttended || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Committee Memberships
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.committeeMemberships || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Forum Activity
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.publicationsRead || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Engagement Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.engagementScore || 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Events</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/events">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {events.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No upcoming events</p>
                    <Button asChild>
                      <Link href="/events">Browse Events</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {event.title}
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {event.location}
                              </div>
                              {event.attendees > 0 && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  {event.attendees}+ attendees
                                </div>
                              )}
                            </div>
                          </div>
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
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Committees */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Committees</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/community/committees">
                    Browse All <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {committees.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      You haven't joined any committees yet
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                      Committees are a great way to collaborate with experts and
                      contribute to policy development
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button asChild className="w-full">
                        <Link href="/community/committees">
                          Browse Committees
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard/committees">
                          View Applications
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {committees.map((committee) => (
                      <div
                        key={committee.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {committee.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {committee.role}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {committee.meetings}
                          </p>
                          <p className="text-xs text-gray-500">
                            meetings attended
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity, index) => {
                      const IconComponent = getIconComponent(activity.icon);
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="p-2 rounded-full bg-gray-100">
                            <IconComponent
                              className={`h-4 w-4 ${activity.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.action}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Membership Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Membership Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {membershipStatus ? (
                  <div className="text-center space-y-4">
                    <Badge
                      className={
                        membershipStatus.isExpired
                          ? "bg-red-100 text-red-800"
                          : membershipStatus.status === "active"
                          ? "bg-primary text-white"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {membershipStatus.type}
                    </Badge>
                    {membershipStatus.validUntil && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          {membershipStatus.isExpired
                            ? "Expired on"
                            : "Valid until"}{" "}
                          {membershipStatus.validUntil}
                        </p>
                        {!membershipStatus.isExpired && (
                          <>
                            <Progress
                              value={membershipStatus.progress}
                              className="h-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {membershipStatus.remainingDays} days remaining
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/dashboard/membership">
                        {membershipStatus.isExpired
                          ? "Renew Membership"
                          : "Manage Membership"}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-gray-500">No active membership</p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/community/membership">Get Membership</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    Browse Events
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/knowledge-hub/blog">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Knowledge Hub
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/community/committees">
                    <Users className="mr-2 h-4 w-4" />
                    Join Committee
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No new notifications
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          notification.color === "blue"
                            ? "bg-blue-50 border-blue-200"
                            : notification.color === "green"
                            ? "bg-green-50 border-green-200"
                            : notification.color === "orange"
                            ? "bg-orange-50 border-orange-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium ${
                            notification.color === "blue"
                              ? "text-blue-900"
                              : notification.color === "green"
                              ? "text-green-900"
                              : notification.color === "orange"
                              ? "text-orange-900"
                              : "text-gray-900"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p
                          className={`text-xs ${
                            notification.color === "blue"
                              ? "text-blue-700"
                              : notification.color === "green"
                              ? "text-green-700"
                              : notification.color === "orange"
                              ? "text-orange-700"
                              : "text-gray-500"
                          }`}
                        >
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="ml-4 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <Skeleton key={j} className="h-20 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
