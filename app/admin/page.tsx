import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  DollarSign,
  Eye,
  TrendingUp,
  UserPlus,
  CheckCircle,
  XCircle,
  Activity,
  Server,
  Database,
  AlertTriangle,
  Clock,
  Mail,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

// Force dynamic rendering - this page requires authentication and real-time data
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SystemMetric {
  metric: string;
  value: string;
  status: "excellent" | "good" | "warning" | "critical";
  trend: string;
  percentage?: number;
}

async function getDashboardData() {
  const now = new Date();
  const lastMonth = subMonths(now, 1);
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);
  const startOfLastMonth = startOfMonth(lastMonth);
  const endOfLastMonth = endOfMonth(lastMonth);

  // Get total counts
  const [
    totalUsers,
    totalEvents,
    totalPublications,
    activeEvents,
    upcomingEvents,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.publication.count({ where: { published: true } }),
    prisma.event.count({ where: { status: "upcoming", date: { gte: now } } }),
    prisma.event.count({ where: { date: { gte: now } } }),
  ]);

  // Get pending users (without approved membership)
  const pendingUsers = await prisma.user.findMany({
    where: {
      membership: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      organization: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Get user counts for growth calculation
  const usersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfCurrentMonth, lte: endOfCurrentMonth } },
  });
  const usersLastMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });
  const userGrowth =
    usersLastMonth > 0
      ? (((usersThisMonth - usersLastMonth) / usersLastMonth) * 100).toFixed(1)
      : "0.0";

  // Get event counts for growth calculation
  const eventsThisMonth = await prisma.event.count({
    where: { createdAt: { gte: startOfCurrentMonth, lte: endOfCurrentMonth } },
  });
  const eventsLastMonth = await prisma.event.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });
  const eventGrowth =
    eventsLastMonth > 0
      ? (((eventsThisMonth - eventsLastMonth) / eventsLastMonth) * 100).toFixed(
          1
        )
      : "0.0";

  // Get recent activities
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, createdAt: true },
  });

  const recentEvents = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, createdAt: true },
  });

  return {
    stats: {
      totalUsers,
      totalEvents,
      totalPublications,
      activeEvents,
      upcomingEvents,
      pendingApprovals: pendingUsers.length,
      userGrowth: `${userGrowth >= "0" ? "+" : ""}${userGrowth}%`,
      eventGrowth: `${eventGrowth >= "0" ? "+" : ""}${eventGrowth}%`,
    },
    pendingUsers,
    recentUsers,
    recentEvents,
  };
}

export default async function AdminDashboard() {
  const { stats, pendingUsers, recentUsers, recentEvents } =
    await getDashboardData();

  const systemHealth: SystemMetric[] = [
    {
      metric: "Total Users",
      value: stats.totalUsers.toString(),
      status: "excellent",
      trend: stats.userGrowth,
      percentage: 100,
    },
    {
      metric: "Total Events",
      value: stats.totalEvents.toString(),
      status: "good",
      trend: stats.eventGrowth,
      percentage: 95,
    },
    {
      metric: "Active Events",
      value: stats.activeEvents.toString(),
      status: "good",
      trend: "+0",
    },
    {
      metric: "Publications",
      value: stats.totalPublications.toString(),
      status: "excellent",
      trend: "+0",
      percentage: 85,
    },
    {
      metric: "Pending Approvals",
      value: stats.pendingApprovals.toString(),
      status: stats.pendingApprovals > 5 ? "warning" : "good",
      trend: "+0",
    },
    {
      metric: "Upcoming Events",
      value: stats.upcomingEvents.toString(),
      status: "good",
      trend: "+0",
    },
  ];

  const recentActivity = [
    ...recentUsers.slice(0, 2).map((user) => ({
      id: user.id,
      type: "user_registered" as const,
      description: "New user registered",
      timestamp: formatTimestamp(user.createdAt),
      user: user.name || "Unknown",
    })),
    ...recentEvents.slice(0, 2).map((event) => ({
      id: event.id,
      type: "event_created" as const,
      description: `New event '${event.title}' created`,
      timestamp: formatTimestamp(event.createdAt),
      user: "Admin",
    })),
  ];

  function formatTimestamp(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const getStatusColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: SystemMetric["status"]) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "good":
        return <Activity className="h-4 w-4 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityIcon = (
    type:
      | "user_registered"
      | "event_created"
      | "payment_received"
      | "membership_approved"
  ) => {
    switch (type) {
      case "user_registered":
        return <UserPlus className="h-4 w-4 text-blue-600" />;
      case "event_created":
        return <Calendar className="h-4 w-4 text-green-600" />;
      case "payment_received":
        return <DollarSign className="h-4 w-4 text-yellow-600" />;
      case "membership_approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, Admin. Here&apos;s what&apos;s happening with TBS
            today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/events">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-black hover:bg-gray-800 text-white"
            asChild
          >
            <Link href="/admin/users">
              <UserPlus className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalUsers.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stats.userGrowth} from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Events
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.activeEvents}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stats.eventGrowth} from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Events
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalEvents}
            </div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <Eye className="h-3 w-3 mr-1" />
              All time
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Publications
            </CardTitle>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalPublications}
            </div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <Eye className="h-3 w-3 mr-1" />
              Published
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent User Registrations */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
                Recent User Registrations
              </CardTitle>
              <CardDescription>
                Users without approved membership
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 border-yellow-200"
            >
              {stats.pendingApprovals} Pending
            </Badge>
          </CardHeader>
          <CardContent>
            {pendingUsers.length > 0 ? (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarImage src={user.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {user.organization && (
                            <>
                              <Badge variant="outline" className="text-xs">
                                {user.organization}
                              </Badge>
                              <span className="text-xs text-gray-500">•</span>
                            </>
                          )}
                          <span className="text-xs text-gray-500">
                            {format(new Date(user.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/users`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <UserPlus className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No pending user approvals</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              System Metrics
            </CardTitle>
            <CardDescription>
              Real-time platform statistics and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(metric.status)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {metric.metric}
                      </p>
                      <p className="text-xs text-gray-600">{metric.value}</p>
                      {metric.percentage && (
                        <Progress
                          value={metric.percentage}
                          className="w-full h-1 mt-1"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`text-xs border ${getStatusColor(
                        metric.status
                      )}`}
                    >
                      {metric.status}
                    </Badge>
                    <p
                      className={`text-xs mt-1 ${
                        metric.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest platform activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    {activity.user && (
                      <p className="text-xs text-gray-600 mt-1">
                        by {activity.user}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                asChild
              >
                <Link href="/admin/users">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium">Manage Users</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50"
                asChild
              >
                <Link href="/admin/events">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">Manage Events</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                asChild
              >
                <Link href="/admin/publications">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium">Publications</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent border-2 border-dashed border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
                asChild
              >
                <Link href="/admin/memberships">
                  <Database className="h-6 w-6 text-yellow-600" />
                  <span className="text-sm font-medium">Memberships</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
