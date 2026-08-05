"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  Search,
  Plus,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Application {
  id: string;
  committeeSlug: string;
  committeeName: string;
  status: string;
  createdAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

interface CommitteeMembership {
  id: string;
  name: string;
  role: string;
  meetings: number;
  joinedAt: Date;
  description?: string;
  image?: string;
  color?: string;
  slug?: string;
}

export default function CommitteesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [myCommittees, setMyCommittees] = useState<CommitteeMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("my-committees");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [applicationsRes, committeesRes] = await Promise.all([
        fetch("/api/committees/apply"),
        fetch("/api/user/committees"),
      ]);

      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData.applications || []);
      }

      if (committeesRes.ok) {
        const committeesData = await committeesRes.json();
        setMyCommittees(committeesData.committees || []);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch committee data"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            My Committees
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your committee memberships and explore new opportunities
          </p>
        </div>
        <Button
          className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
          asChild
        >
          <Link href="/community/committees">
            <Plus className="mr-2 h-4 w-4" />
            Join Committee
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search committees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">My Committees</p>
              <p className="text-3xl font-bold text-gray-900">
                {myCommittees.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Pending Applications</p>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Approved</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.approved}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Committees Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-committees">My Committees</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="my-committees" className="space-y-6">
          {myCommittees.length === 0 ? (
            <Card>
              <CardContent className="p-12">
                <div className="text-center">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Committee Memberships Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't joined any committees yet. Browse our committees
                    and find ones that match your interests!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <Link href="/community/committees">
                        Browse Committees
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/get-involved/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {myCommittees
                .filter((committee) =>
                  committee.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((committee) => (
                  <Card
                    key={committee.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          {committee.name}
                        </CardTitle>
                        <Badge className="bg-primary text-white">
                          {committee.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-center py-3 bg-gray-50 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-gray-400" />
                          </div>
                          <p className="text-sm font-medium">
                            {committee.meetings}
                          </p>
                          <p className="text-xs text-gray-500">
                            Meetings Attended
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center">
                            <Clock className="h-4 w-4 text-gray-400" />
                          </div>
                          <p className="text-sm font-medium">
                            {format(new Date(committee.joinedAt), "MMM yyyy")}
                          </p>
                          <p className="text-xs text-gray-500">Joined</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href="/community/committees">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Applications</CardTitle>
              <Button asChild>
                <Link href="/community/committees">
                  Browse Committees
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You haven't applied to any committees yet. Browse our
                      committees and find ones that match your interests!
                    </p>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="/community/committees">Browse Committees</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Committee</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reviewed On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {application.committeeName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {application.committeeSlug}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(application.createdAt),
                              "MMM dd, yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(application.status)}
                          </TableCell>
                          <TableCell>
                            {application.reviewedAt ? (
                              format(
                                new Date(application.reviewedAt),
                                "MMM dd, yyyy"
                              )
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                href={`/community/committees/${application.committeeSlug}`}
                              >
                                View Committee
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Review Notes Section */}
                  {applications.some((a) => a.reviewNotes) && (
                    <div className="mt-8 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Review Feedback
                      </h3>
                      {applications
                        .filter((a) => a.reviewNotes)
                        .map((application) => (
                          <Card key={application.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <p className="font-semibold text-gray-900">
                                  {application.committeeName}
                                </p>
                                {getStatusBadge(application.status)}
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {application.reviewNotes}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Reviewed on{" "}
                                {application.reviewedAt &&
                                  format(
                                    new Date(application.reviewedAt),
                                    "MMM dd, yyyy 'at' hh:mm a"
                                  )}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Need Help?
          </h3>
          <p className="text-gray-700 mb-4">
            If you have questions about your application status or the committee
            membership process, feel free to reach out to us.
          </p>
          <Button variant="outline" asChild>
            <Link href="/get-involved/contact">Contact Us</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
