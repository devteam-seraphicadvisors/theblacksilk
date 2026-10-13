"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
            <Skeleton className="rounded-none h-8 w-48" />
            <Skeleton className="rounded-none h-4 w-64" />
          </div>
          <Skeleton className="rounded-none h-10 w-40" />
        </div>
        <Card className="rounded-none border border-neutral-200 shadow-none">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="rounded-none h-6 w-32" />
                <Skeleton className="rounded-none h-6 w-20" />
              </div>
              <Skeleton className="rounded-none h-6 w-64" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="rounded-none h-12 w-full" />
                <Skeleton className="rounded-none h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card className="rounded-none border border-neutral-200 shadow-none" key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-none mx-auto mb-3" />
                <Skeleton className="rounded-none h-6 w-16 mx-auto mb-2" />
                <Skeleton className="rounded-none h-4 w-24 mx-auto" />
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
              className="p-0 ml-1 text-black font-medium"
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
  const isExpiringSoon = daysRemaining <= 30;
  const isExpired = daysRemaining === 0;

  const currentTier =
    membershipTiers.find(
      (tier) =>
        tier.name.toLowerCase().replace(" ", "-") ===
        membershipData.type.toLowerCase()
    ) || membershipTiers.find((tier) => tier.name === "Professional");

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Account
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-normal text-black tracking-tight">
            Membership
          </h1>
          <p className="text-neutral-600 mt-2">
            Manage your membership and explore upgrade options.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={refreshData}
            className="inline-flex items-center gap-2 border border-neutral-300 text-black hover:border-black font-mono text-xs uppercase tracking-wider px-5 py-3 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <a
            href="/community/membership"
            className="inline-flex items-center gap-2 bg-black !text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider px-5 py-3 transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            {isExpired ? "Renew Now" : isExpiringSoon ? "Renew Soon" : "Renew Membership"}
          </a>
        </div>
      </div>

      {/* Expiry warning */}
      {(isExpiringSoon || isExpired) && (
        <div role="alert" className="flex items-start gap-3 border border-black bg-white p-4">
          <AlertTriangle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
          <p className="text-sm text-black">
            {isExpired
              ? "Your membership has expired. Renew now to restore access to all benefits."
              : `Your membership expires in ${daysRemaining} days.`}{" "}
            <a href="/community/membership" className="underline underline-offset-4 font-medium">
              Renew now to avoid interruption.
            </a>
          </p>
        </div>
      )}

      {/* Membership status */}
      <section className="bg-black text-white border border-black">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="bg-white text-black font-mono text-[10px] uppercase tracking-wider px-2.5 py-1">
                {membershipData.type.charAt(0).toUpperCase() + membershipData.type.slice(1)} Member
              </span>
              <span className="border border-neutral-600 text-neutral-300 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1">
                {isExpired
                  ? "Expired"
                  : membershipData.status.charAt(0).toUpperCase() + membershipData.status.slice(1)}
              </span>
            </div>
            <h2 className="text-3xl font-serif font-normal text-white mb-1">
              Welcome back, {session?.user?.name?.split(" ")[0] || "Member"}
            </h2>
            <p className="text-neutral-400 text-sm mb-8">
              Member since {fmtDate(membershipData.createdAt)}
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div>
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Start Date
                </p>
                <p className="text-white">{fmtDate(membershipData.startDate)}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {isExpired ? "Expired" : "Expires"}
                </p>
                <p className="text-white">{fmtDate(endDate)}</p>
              </div>
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-neutral-800 p-6 lg:p-8 flex flex-col justify-center lg:min-w-[220px]">
            <p className="text-6xl font-serif font-normal text-white leading-none tabular-nums">
              {isExpired ? 0 : daysRemaining}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mt-3">
              Days remaining
            </p>
          </div>
        </div>
      </section>

      {/* Membership tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="h-auto w-full justify-start gap-8 rounded-none bg-transparent border-b border-neutral-200 p-0 overflow-x-auto">
          {[
            ["overview", "Overview"],
            ["benefits", "Benefits"],
            ["upgrade", "Upgrade"],
            ["billing", "Billing"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-1 font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-black data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none -mb-px"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-none border border-neutral-200 shadow-none hover:border-black transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-neutral-50 rounded-none flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-black" />
                </div>
                <p className="text-2xl font-serif font-normal text-black">
                  {userStats?.eventsAttended || 0}
                </p>
                <p className="text-sm text-neutral-600">Events Attended</p>
                <p className="text-xs text-black mt-1">This year</p>
              </CardContent>
            </Card>
            <Card className="rounded-none border border-neutral-200 shadow-none hover:border-black transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-neutral-50 rounded-none flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <p className="text-2xl font-serif font-normal text-black">
                  {userStats?.committeeMemberships || 0}
                </p>
                <p className="text-sm text-neutral-600">Committee Memberships</p>
                <p className="text-xs text-black mt-1">
                  Active participation
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-none border border-neutral-200 shadow-none hover:border-black transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-neutral-50 rounded-none flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-black" />
                </div>
                <p className="text-2xl font-serif font-normal text-black">
                  {userStats?.publicationsDownloaded || 0}
                </p>
                <p className="text-sm text-neutral-600">Publications Downloaded</p>
                <p className="text-xs text-black mt-1">All time</p>
              </CardContent>
            </Card>
            <Card className="rounded-none border border-neutral-200 shadow-none hover:border-black transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-none flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <p className="text-2xl font-serif font-normal text-black">
                  {userStats?.forumPosts || 0}
                </p>
                <p className="text-sm text-neutral-600">Forum Posts</p>
                <p className="text-xs text-black mt-1">
                  Community engagement
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-none border border-neutral-200 shadow-none hover:border-black transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-none flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <p className="text-2xl font-serif font-normal text-black">
                  {userStats?.totalConnections || 0}
                </p>
                <p className="text-sm text-neutral-600">
                  Professional Connections
                </p>
                <p className="text-xs text-black mt-1">Growing network</p>
              </CardContent>
            </Card>
            <Card className="rounded-none border border-neutral-200 shadow-none hover:border-black transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-none flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <p className="text-2xl font-serif font-normal text-black">
                  {userStats?.profileCompleteness || 0}%
                </p>
                <p className="text-sm text-neutral-600">Profile Completeness</p>
                <p className="text-xs text-black mt-1">Keep improving!</p>
              </CardContent>
            </Card>
          </div>

          {/* Membership Timeline */}
          <Card className="rounded-none border border-neutral-200 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-serif font-normal">
                <Clock className="w-5 h-5" />
                Membership Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-none border border-neutral-200">
                  <CheckCircle className="h-6 w-6 text-black flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-black">
                      Membership Activated
                    </p>
                    <p className="text-sm text-black">
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
                  <Badge className="rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50 text-black">
                    Completed
                  </Badge>
                </div>
                <div
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-none border",
                    isExpired
                      ? "bg-neutral-50 border-neutral-200"
                      : isExpiringSoon
                      ? "bg-neutral-50 border-neutral-200"
                      : "bg-neutral-50 border-neutral-200"
                  )}
                >
                  <Calendar
                    className={cn(
                      "h-6 w-6 flex-shrink-0",
                      isExpired
                        ? "text-black"
                        : isExpiringSoon
                        ? "text-black"
                        : "text-black"
                    )}
                  />
                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-medium",
                        isExpired
                          ? "text-black"
                          : isExpiringSoon
                          ? "text-black"
                          : "text-black"
                      )}
                    >
                      {isExpired ? "Membership Expired" : "Renewal Due"}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        isExpired
                          ? "text-black"
                          : isExpiringSoon
                          ? "text-black"
                          : "text-black"
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
                    className={cn("rounded-none font-mono text-[10px] uppercase tracking-wider", 
                      isExpired
                        ? "bg-neutral-100 text-black"
                        : isExpiringSoon
                        ? "bg-neutral-100 text-black"
                        : "bg-neutral-100 text-black"
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
                className={cn("rounded-none border border-neutral-200 shadow-none", 
                  "hover:shadow-none transition-all duration-200",
                  benefit.used && !isExpired
                    ? "border-neutral-200 bg-neutral-50"
                    : "hover:border-black",
                  isExpired && "opacity-60"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={cn(
                        "p-3 rounded-none flex-shrink-0",
                        benefit.used && !isExpired
                          ? "bg-black"
                          : "bg-neutral-100"
                      )}
                    >
                      <benefit.icon
                        className={cn(
                          "h-6 w-6",
                          benefit.used && !isExpired
                            ? "text-white"
                            : "text-neutral-500"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-serif font-normal text-black mb-1">
                            {benefit.title}
                          </h3>
                          <Badge variant="outline" className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider mb-2">
                            {benefit.category}
                          </Badge>
                        </div>
                        {benefit.used && !isExpired && (
                          <Badge className="rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50 text-black text-xs flex-shrink-0">
                            Active
                          </Badge>
                        )}
                        {isExpired && (
                          <Badge
                            variant="outline"
                            className="rounded-none font-mono text-[10px] uppercase tracking-wider text-xs flex-shrink-0 border-neutral-200 text-black"
                          >
                            Expired
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">
                        {benefit.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black">
                          {benefit.value}
                        </span>
                        {!benefit.used && !isExpired && (
                          <Button className="rounded-none border-black text-black hover:bg-black hover:!text-white font-mono text-xs uppercase tracking-wider" variant="outline" size="sm">
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
                  className={cn("rounded-none border border-neutral-200 shadow-none", 
                    "relative overflow-hidden transition-all duration-200 hover:shadow-none",
                    tier.popular && "border-black shadow-none",
                    isCurrent && "border-black bg-neutral-50"
                  )}
                >
                  {(isCurrent || tier.popular) && (
                    <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                      {isCurrent ? "Current Plan" : "Most Popular"}
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-serif font-normal">{tier.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-neutral-500 line-through">
                          ₹{tier.originalPrice.toLocaleString()}
                        </span>
                        <Badge
                          variant="outline"
                          className="rounded-none font-mono text-[10px] uppercase tracking-wider text-black border-black"
                        >
                          {tier.savings}
                        </Badge>
                      </div>
                      <div className="text-3xl font-serif font-normal text-black">
                        ₹{tier.price.toLocaleString()}
                        <span className="text-sm font-normal text-neutral-600">
                          /{tier.period}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">
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
                          <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn("rounded-none bg-black !text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider", 
                        "w-full whitespace-normal h-auto py-3 leading-snug text-center",
                        isCurrent
                          ? "bg-neutral-200 !text-neutral-600 hover:bg-neutral-200"
                          : "bg-black hover:bg-neutral-800"
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
          <Card className="rounded-none border border-neutral-200 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-serif font-normal">
                <CreditCard className="w-5 h-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-500">No billing history available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-none hover:bg-neutral-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-black">
                          {invoice.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-600">
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
                          <p className="font-semibold text-black">
                            ₹{invoice.amount.toLocaleString()}{" "}
                            {invoice.currency.toUpperCase()}
                          </p>
                          <Badge
                            className={cn("rounded-none font-mono text-[10px] uppercase tracking-wider", 
                              "text-xs",
                              invoice.status === "paid"
                                ? "bg-neutral-100 text-black"
                                : invoice.status === "pending"
                                ? "bg-neutral-100 text-black"
                                : "bg-neutral-100 text-black"
                            )}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </Badge>
                        </div>
                        <Button className="rounded-none border-black text-black hover:bg-black hover:!text-white font-mono text-xs uppercase tracking-wider" variant="outline" size="sm">
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
