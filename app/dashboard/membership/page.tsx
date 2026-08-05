"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Calendar,
  Download,
  Award,
  Users,
  BookOpen,
  Star,
  Gift,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

interface MembershipData {
  id: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStats {
  eventsAttended: number;
  committeeMemberships: number;
  publicationsDownloaded: number;
  forumPosts: number;
  totalConnections: number;
  profileCompleteness: number;
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  paidAt: string | null;
}

const benefits = [
  {
    icon: Calendar,
    title: "Priority Event Access",
    description: "Early registration and discounted rates for all events",
    category: "Events",
    value: "Up to 40% off",
    used: true,
  },
  {
    icon: BookOpen,
    title: "Exclusive Publications",
    description: "Access to premium research papers and white papers",
    category: "Knowledge",
    value: "200+ Resources",
    used: true,
  },
  {
    icon: Users,
    title: "Committee Participation",
    description: "Join specialized committees and working groups",
    category: "Networking",
    value: "12 Committees",
    used: true,
  },
  {
    icon: Star,
    title: "Networking Directory",
    description: "Connect with other legal technology professionals",
    category: "Networking",
    value: "5000+ Members",
    used: false,
  },
  {
    icon: Gift,
    title: "Annual Conference Pass",
    description: "Complimentary pass to the annual TBS conference",
    category: "Events",
    value: "₹15,000 Value",
    used: false,
  },
  {
    icon: Shield,
    title: "Legal Tech Certification",
    description: "Industry-recognized certification programs",
    category: "Education",
    value: "CPE Credits",
    used: true,
  },
];

const membershipTiers = [
  {
    name: "Student",
    price: 2500,
    originalPrice: 3500,
    period: "per year",
    description: "Perfect for law students and recent graduates",
    color: "blue",
    icon: BookOpen,
    features: [
      "Access to basic events",
      "Student networking group",
      "Educational resources",
      "Mentorship program access",
      "Career guidance sessions",
      "Student-only workshops",
    ],
    popular: false,
    savings: "Save ₹1,000",
  },
  {
    name: "Advocate Junior",
    price: 5500,
    originalPrice: 7000,
    period: "per year",
    description: "For junior advocates and early-career professionals",
    color: "green",
    icon: Users,
    features: [
      "All Student benefits",
      "Junior advocate networking",
      "Practice area resources",
      "Court procedure guides",
      "Legal drafting templates",
      "Monthly skill workshops",
    ],
    popular: false,
    savings: "Save ₹1,500",
  },
  {
    name: "Professional",
    price: 8500,
    originalPrice: 12000,
    period: "per year",
    description: "Ideal for practicing lawyers and legal professionals",
    color: "purple",
    icon: Award,
    features: [
      "All Advocate Junior benefits",
      "Priority event registration",
      "Committee participation",
      "Exclusive publications",
      "Professional networking",
      "CPE credit tracking",
      "Expert consultation hours",
    ],
    popular: true,
    savings: "Save ₹3,500",
  },
  {
    name: "Corporate",
    price: 25000,
    originalPrice: 35000,
    period: "per year",
    description: "Comprehensive package for law firms and corporations",
    color: "orange",
    icon: Crown,
    features: [
      "All Professional benefits",
      "Multiple user accounts (up to 10)",
      "Corporate event hosting",
      "Custom research requests",
      "Dedicated account manager",
      "Bulk training programs",
      "White-label resources",
      "Priority support",
    ],
    popular: false,
    savings: "Save ₹10,000",
  },
];

export default function MembershipPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [membershipData, setMembershipData] = useState<MembershipData | null>(
    null
  );
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchMembershipData = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch membership data
        const membershipResponse = await fetch(
          `/api/user/membership?userId=${session.user.id}`
        );
        if (!membershipResponse.ok) {
          throw new Error("Failed to fetch membership data");
        }
        const membership = await membershipResponse.json();

        // Fetch user statistics
        const statsResponse = await fetch(
          `/api/user/stats?userId=${session.user.id}`
        );
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch user statistics");
        }
        const stats = await statsResponse.json();

        // Fetch billing history
        const billingResponse = await fetch(
          `/api/user/billing?userId=${session.user.id}`
        );
        if (!billingResponse.ok) {
          throw new Error("Failed to fetch billing history");
        }
        const billing = await billingResponse.json();

        setMembershipData(membership);
        setUserStats(stats);
        setInvoices(billing.invoices || []);
      } catch (error) {
        console.error("Error fetching membership data:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, [session?.user?.id]);

  const refreshData = () => {
    if (session?.user?.id) {
      setLoading(true);
      // Trigger re-fetch
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-6 w-64" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-3" />
                <Skeleton className="h-6 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-8">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
            <Button
              variant="link"
              className="p-0 ml-2 text-red-600 font-medium"
              onClick={refreshData}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!membershipData) {
    return (
      <div className="p-4 lg:p-8">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No active membership found.
            <Button
              variant="link"
              className="p-0 ml-1 text-primary font-medium"
              asChild
            >
              <a href="/community/membership">Purchase a membership</a>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const endDate = new Date(membershipData.endDate);
  const startDate = new Date(membershipData.startDate);
  const today = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const progressPercentage = Math.max(
    0,
    Math.min(100, ((totalDays - daysRemaining) / totalDays) * 100)
  );
  const isExpiringSoon = daysRemaining <= 30;
  const isExpired = daysRemaining === 0;

  const currentTier =
    membershipTiers.find(
      (tier) =>
        tier.name.toLowerCase().replace(" ", "-") ===
        membershipData.type.toLowerCase()
    ) || membershipTiers.find((tier) => tier.name === "Professional");

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Membership Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your membership and explore upgrade options
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            onClick={refreshData}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            className={cn(
              "w-full sm:w-auto",
              isExpiringSoon || isExpired
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-black hover:bg-gray-800 text-white"
            )}
            asChild
          >
            <a href="/community/membership">
              <CreditCard className="mr-2 h-4 w-4" />
              {isExpired
                ? "Renew Now"
                : isExpiringSoon
                ? "Renew Soon"
                : "Renew Membership"}
            </a>
          </Button>
        </div>
      </div>

      {/* Expiry Warning */}
      {(isExpiringSoon || isExpired) && (
        <Alert
          className={cn(
            "border-orange-200 bg-orange-50",
            isExpired && "border-red-200 bg-red-50"
          )}
        >
          <AlertTriangle
            className={cn(
              "h-4 w-4",
              isExpired ? "text-red-600" : "text-orange-600"
            )}
          />
          <AlertDescription
            className={cn(isExpired ? "text-red-800" : "text-orange-800")}
          >
            {isExpired
              ? "Your membership has expired. Renew now to restore access to all benefits."
              : `Your membership expires in ${daysRemaining} days.`}
            <Button
              variant="link"
              className={cn(
                "p-0 ml-1 font-medium",
                isExpired ? "text-red-600" : "text-orange-600"
              )}
              asChild
            >
              <a href="/community/membership">
                Renew now to avoid interruption.
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Membership Status Card */}
      <Card
        className={cn(
          "border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent relative overflow-hidden",
          isExpired &&
            "border-red-200 bg-gradient-to-br from-red-50 to-transparent"
        )}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <CardContent className="p-6 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <Badge className="bg-primary text-white px-3 py-1 text-sm">
                  {membershipData.type.charAt(0).toUpperCase() +
                    membershipData.type.slice(1)}{" "}
                  Member
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    isExpired
                      ? "border-red-500 text-red-700"
                      : membershipData.status === "active"
                      ? "border-green-500 text-green-700"
                      : "border-orange-500 text-orange-700"
                  )}
                >
                  {isExpired
                    ? "Expired"
                    : membershipData.status.charAt(0).toUpperCase() +
                      membershipData.status.slice(1)}
                </Badge>
                {currentTier?.popular && !isExpired && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Welcome back, {session?.user?.name?.split(" ")[0] || "Member"}
                  !
                </h2>
                <p className="text-gray-600">
                  Member since{" "}
                  {new Date(membershipData.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Enjoying {currentTier?.features.length || 0}+ premium features
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Start Date
                  </p>
                  <p className="font-medium">
                    {new Date(membershipData.startDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {isExpired ? "Expired" : "Expires"}
                  </p>
                  <p
                    className={cn(
                      "font-medium",
                      (isExpiringSoon || isExpired) && "text-orange-600"
                    )}
                  >
                    {endDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 lg:text-right">
              <div className="text-center lg:text-right">
                <p
                  className={cn(
                    "text-3xl font-bold",
                    isExpired
                      ? "text-red-600"
                      : isExpiringSoon
                      ? "text-orange-600"
                      : "text-primary"
                  )}
                >
                  {isExpired ? "0" : daysRemaining}
                </p>
                <p className="text-sm text-gray-600">days remaining</p>
              </div>
              <div className="w-full lg:w-48">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress
                  value={progressPercentage}
                  className={cn(
                    "h-2",
                    isExpired && "[&>div]:bg-red-500",
                    isExpiringSoon && "[&>div]:bg-orange-500"
                  )}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(progressPercentage)}% of membership year completed
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="upgrade" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Upgrade
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.eventsAttended || 0}
                </p>
                <p className="text-sm text-gray-600">Events Attended</p>
                <p className="text-xs text-blue-600 mt-1">This year</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.committeeMemberships || 0}
                </p>
                <p className="text-sm text-gray-600">Committee Memberships</p>
                <p className="text-xs text-green-600 mt-1">
                  Active participation
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.publicationsDownloaded || 0}
                </p>
                <p className="text-sm text-gray-600">Publications Downloaded</p>
                <p className="text-xs text-purple-600 mt-1">All time</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.forumPosts || 0}
                </p>
                <p className="text-sm text-gray-600">Forum Posts</p>
                <p className="text-xs text-orange-600 mt-1">
                  Community engagement
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.totalConnections || 0}
                </p>
                <p className="text-sm text-gray-600">
                  Professional Connections
                </p>
                <p className="text-xs text-pink-600 mt-1">Growing network</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.profileCompleteness || 0}%
                </p>
                <p className="text-sm text-gray-600">Profile Completeness</p>
                <p className="text-xs text-indigo-600 mt-1">Keep improving!</p>
              </CardContent>
            </Card>
          </div>

          {/* Membership Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Membership Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">
                      Membership Activated
                    </p>
                    <p className="text-sm text-green-700">
                      {new Date(membershipData.startDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </div>
                <div
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg border",
                    isExpired
                      ? "bg-red-50 border-red-200"
                      : isExpiringSoon
                      ? "bg-orange-50 border-orange-200"
                      : "bg-blue-50 border-blue-200"
                  )}
                >
                  <Calendar
                    className={cn(
                      "h-6 w-6 flex-shrink-0",
                      isExpired
                        ? "text-red-600"
                        : isExpiringSoon
                        ? "text-orange-600"
                        : "text-blue-600"
                    )}
                  />
                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-medium",
                        isExpired
                          ? "text-red-900"
                          : isExpiringSoon
                          ? "text-orange-900"
                          : "text-blue-900"
                      )}
                    >
                      {isExpired ? "Membership Expired" : "Renewal Due"}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        isExpired
                          ? "text-red-700"
                          : isExpiringSoon
                          ? "text-orange-700"
                          : "text-blue-700"
                      )}
                    >
                      {endDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      isExpired
                        ? "bg-red-100 text-red-800"
                        : isExpiringSoon
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    )}
                  >
                    {isExpired
                      ? "Expired"
                      : isExpiringSoon
                      ? "Action Required"
                      : "Upcoming"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={cn(
                  "hover:shadow-md transition-all duration-200",
                  benefit.used && !isExpired
                    ? "border-green-200 bg-green-50/30"
                    : "hover:border-primary/30",
                  isExpired && "opacity-60"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={cn(
                        "p-3 rounded-lg flex-shrink-0",
                        benefit.used && !isExpired
                          ? "bg-green-100"
                          : "bg-gray-100"
                      )}
                    >
                      <benefit.icon
                        className={cn(
                          "h-6 w-6",
                          benefit.used && !isExpired
                            ? "text-green-600"
                            : "text-gray-600"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {benefit.title}
                          </h3>
                          <Badge variant="outline" className="text-xs mb-2">
                            {benefit.category}
                          </Badge>
                        </div>
                        {benefit.used && !isExpired && (
                          <Badge className="bg-green-100 text-green-800 text-xs flex-shrink-0">
                            Active
                          </Badge>
                        )}
                        {isExpired && (
                          <Badge
                            variant="outline"
                            className="text-xs flex-shrink-0 border-red-200 text-red-600"
                          >
                            Expired
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {benefit.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                          {benefit.value}
                        </span>
                        {!benefit.used && !isExpired && (
                          <Button variant="outline" size="sm">
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upgrade" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {membershipTiers.map((tier, index) => {
              const IconComponent = tier.icon;
              const isCurrent =
                tier.name.toLowerCase().replace(" ", "-") ===
                membershipData.type.toLowerCase();
              return (
                <Card
                  key={index}
                  className={cn(
                    "relative overflow-hidden transition-all duration-200 hover:shadow-lg",
                    tier.popular && "border-primary shadow-lg scale-105",
                    isCurrent && "border-green-500 bg-green-50/30"
                  )}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-medium">
                      Current Plan
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3",
                        `bg-${tier.color}-100`
                      )}
                    >
                      <IconComponent
                        className={cn("w-6 h-6", `text-${tier.color}-600`)}
                      />
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-500 line-through">
                          ₹{tier.originalPrice.toLocaleString()}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          {tier.savings}
                        </Badge>
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        ₹{tier.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-600">
                          /{tier.period}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {tier.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "w-full",
                        isCurrent
                          ? "bg-green-600 hover:bg-green-700"
                          : tier.popular
                          ? "bg-black hover:bg-gray-800 text-white"
                          : "bg-gray-600 hover:bg-gray-700"
                      )}
                      disabled={isCurrent}
                      asChild={!isCurrent}
                    >
                      {isCurrent ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Current Plan
                        </>
                      ) : (
                        <a
                          href={`/community/membership?tier=${tier.name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {tier.name === "Corporate"
                            ? "Contact Sales"
                            : `Upgrade to ${tier.name}`}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No billing history available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">
                          {invoice.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            {invoice.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(invoice.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{invoice.amount.toLocaleString()}{" "}
                            {invoice.currency.toUpperCase()}
                          </p>
                          <Badge
                            className={cn(
                              "text-xs",
                              invoice.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
