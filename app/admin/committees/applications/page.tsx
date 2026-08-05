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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, Eye, Clock, Users } from "lucide-react";
import { format } from "date-fns";

interface Application {
  id: string;
  committeeSlug: string;
  committeeName: string;
  motivation: string;
  experience: string;
  contribution: string;
  availability: string;
  expertise: string[];
  linkedinUrl?: string;
  status: string;
  createdAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    organization?: string;
    position?: string;
  };
}

export default function CommitteeApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchApplications();
    }
  }, [session, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const response = await fetch(
        `/api/admin/committees/applications?${params}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch applications");
      }

      setApplications(data.applications);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (
    applicationId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      setReviewing(true);
      setError(null);

      const response = await fetch(
        `/api/admin/committees/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            reviewNotes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to review application");
      }

      // Refresh applications list
      await fetchApplications();
      setReviewDialog(false);
      setSelectedApplication(null);
      setReviewNotes("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to review application"
      );
    } finally {
      setReviewing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Committee Applications
        </h1>
        <p className="text-gray-600">
          Review and manage membership applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="status-filter" className="font-semibold">
              Filter by Status:
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({applications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No applications found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Committee</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{application.user.name}</p>
                        <p className="text-sm text-gray-500">
                          {application.user.email}
                        </p>
                        {application.user.organization && (
                          <p className="text-sm text-gray-500">
                            {application.user.organization}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{application.committeeName}</TableCell>
                    <TableCell>
                      {format(new Date(application.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedApplication(application);
                          setReviewDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Applicant Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Applicant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Name</Label>
                    <p className="font-semibold">
                      {selectedApplication.user.name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Email</Label>
                    <p>{selectedApplication.user.email}</p>
                  </div>
                  {selectedApplication.user.organization && (
                    <div>
                      <Label className="text-sm text-gray-600">
                        Organization
                      </Label>
                      <p>{selectedApplication.user.organization}</p>
                    </div>
                  )}
                  {selectedApplication.user.position && (
                    <div>
                      <Label className="text-sm text-gray-600">Position</Label>
                      <p>{selectedApplication.user.position}</p>
                    </div>
                  )}
                  {selectedApplication.linkedinUrl && (
                    <div>
                      <Label className="text-sm text-gray-600">LinkedIn</Label>
                      <a
                        href={selectedApplication.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedApplication.linkedinUrl}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Application Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-600 font-semibold">
                      Committee
                    </Label>
                    <p className="text-lg">
                      {selectedApplication.committeeName}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 font-semibold">
                      Motivation
                    </Label>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedApplication.motivation}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 font-semibold">
                      Relevant Experience
                    </Label>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedApplication.experience}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 font-semibold">
                      How They Can Contribute
                    </Label>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedApplication.contribution}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 font-semibold">
                      Availability
                    </Label>
                    <p className="capitalize">
                      {selectedApplication.availability}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 font-semibold">
                      Areas of Expertise
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedApplication.expertise.map((exp) => (
                        <Badge key={exp} variant="outline">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review Section */}
              {selectedApplication.status === "pending" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Review Decision</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="review-notes">
                        Review Notes (Optional)
                      </Label>
                      <Textarea
                        id="review-notes"
                        placeholder="Add any notes about your decision..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() =>
                          handleReview(selectedApplication.id, "approved")
                        }
                        disabled={reviewing}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {reviewing ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          handleReview(selectedApplication.id, "rejected")
                        }
                        disabled={reviewing}
                        variant="destructive"
                        className="flex-1"
                      >
                        {reviewing ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Review History */}
              {selectedApplication.status !== "pending" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Review History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm text-gray-600">Status</Label>
                        <p>{getStatusBadge(selectedApplication.status)}</p>
                      </div>
                      {selectedApplication.reviewedAt && (
                        <div>
                          <Label className="text-sm text-gray-600">
                            Reviewed On
                          </Label>
                          <p>
                            {format(
                              new Date(selectedApplication.reviewedAt),
                              "MMM dd, yyyy 'at' hh:mm a"
                            )}
                          </p>
                        </div>
                      )}
                      {selectedApplication.reviewNotes && (
                        <div>
                          <Label className="text-sm text-gray-600">
                            Review Notes
                          </Label>
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {selectedApplication.reviewNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
