"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Mail, Download, UserCheck, UserX, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

interface Newsletter {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  organization: string | null;
  role: string | null;
  weeklyDigest: boolean;
  eventUpdates: boolean;
  policyAlerts: boolean;
  researchUpdates: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/newsletter-subscribers");
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch newsletter subscribers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/newsletter-subscribers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Subscriber ${
            !currentStatus ? "activated" : "deactivated"
          } successfully`,
        });
        fetchSubscribers();
      } else {
        throw new Error("Failed to update subscriber");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscriber status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const response = await fetch(`/api/admin/newsletter-subscribers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Subscriber deleted successfully",
        });
        fetchSubscribers();
      } else {
        throw new Error("Failed to delete subscriber");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscriber",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const csv = [
      [
        "Email",
        "Name",
        "Organization",
        "Role",
        "Weekly Digest",
        "Event Updates",
        "Policy Alerts",
        "Research Updates",
        "Status",
        "Subscribed Date",
      ],
      ...subscribers.map((sub) => [
        sub.email,
        `${sub.firstName || ""} ${sub.lastName || ""}`.trim() || "N/A",
        sub.organization || "N/A",
        sub.role || "N/A",
        sub.weeklyDigest ? "Yes" : "No",
        sub.eventUpdates ? "Yes" : "No",
        sub.policyAlerts ? "Yes" : "No",
        sub.researchUpdates ? "Yes" : "No",
        sub.isActive ? "Active" : "Inactive",
        format(new Date(sub.createdAt), "MMM dd, yyyy"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Subscribers exported successfully",
    });
  };

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${sub.firstName || ""} ${sub.lastName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-muted-foreground">
            Manage newsletter subscriptions and send updates
          </p>
        </div>

        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Subscribers
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subscribers
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscribers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter((s) => s.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Subscribers
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter((s) => !s.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                subscribers.filter((s) => {
                  const subDate = new Date(s.createdAt);
                  const now = new Date();
                  return (
                    subDate.getMonth() === now.getMonth() &&
                    subDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Subscribers</CardTitle>
              <CardDescription>Manage newsletter subscriptions</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Preferences</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchTerm
                      ? "No subscribers found matching your search."
                      : "No subscribers yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{subscriber.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {`${subscriber.firstName || ""} ${
                          subscriber.lastName || ""
                        }`.trim() || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {subscriber.organization || "N/A"}
                        </div>
                        {subscriber.role && (
                          <div className="text-muted-foreground">
                            {subscriber.role}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subscriber.weeklyDigest && (
                          <Badge variant="secondary" className="text-xs">
                            Weekly
                          </Badge>
                        )}
                        {subscriber.eventUpdates && (
                          <Badge variant="secondary" className="text-xs">
                            Events
                          </Badge>
                        )}
                        {subscriber.policyAlerts && (
                          <Badge variant="secondary" className="text-xs">
                            Policy
                          </Badge>
                        )}
                        {subscriber.researchUpdates && (
                          <Badge variant="secondary" className="text-xs">
                            Research
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            subscriber.isActive ? "default" : "secondary"
                          }
                        >
                          {subscriber.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Switch
                          checked={subscriber.isActive}
                          onCheckedChange={() =>
                            handleToggleStatus(
                              subscriber.id,
                              subscriber.isActive
                            )
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {format(new Date(subscriber.createdAt), "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(subscriber.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
