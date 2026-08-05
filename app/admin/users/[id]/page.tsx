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
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Loader2,
  Users,
  FileText,
  Mail,
  Shield,
  XCircle,
} from "lucide-react";

interface CommitteeMember {
  id: string;
  role: string;
  joinedAt: string;
  committee: {
    id: string;
    name: string;
    description: string;
    status: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization?: string;
  position?: string;
  location?: string;
  bio?: string;
  linkedin?: string;
  website?: string;
  phone?: string;
  createdAt: string;
  committeeMembers?: CommitteeMember[];
}

const roleOptions = ["user", "admin", "member"];

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // User form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    organization: "",
    position: "",
    location: "",
    bio: "",
    linkedin: "",
    website: "",
    phone: "",
  });

  // Committee memberships data
  const [committeeMemberships, setCommitteeMemberships] = useState<
    CommitteeMember[]
  >([]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      if (response.ok) {
        const user: User = await response.json();
        setFormData({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "user",
          organization: user.organization || "",
          position: user.position || "",
          location: user.location || "",
          bio: user.bio || "",
          linkedin: user.linkedin || "",
          website: user.website || "",
          phone: user.phone || "",
        });
        setCommitteeMemberships(user.committeeMembers || []);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch user details",
          variant: "destructive",
        });
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "User updated successfully",
        });
        router.push("/admin/users");
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to update user",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveMembership = async (membershipId: string) => {
    if (!confirm("Are you sure you want to remove this committee membership?"))
      return;

    try {
      const response = await fetch(
        `/api/admin/committee-members/${membershipId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to remove membership");

      toast({
        title: "Success",
        description: "Committee membership removed successfully",
      });

      fetchUser(); // Refresh data
    } catch (error) {
      console.error("Error removing membership:", error);
      toast({
        title: "Error",
        description: "Failed to remove committee membership",
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      chair: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "Chair",
      },
      "co-chair": {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Co-Chair",
      },
      member: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Member",
      },
    };

    const variant = variants[role] || variants.member;

    return <Badge className={`${variant.color} border`}>{variant.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string }> = {
      active: { color: "bg-green-100 text-green-800 border-green-200" },
      inactive: { color: "bg-gray-100 text-gray-800 border-gray-200" },
    };

    const variant = variants[status] || variants.active;

    return (
      <Badge className={`${variant.color} border capitalize`}>{status}</Badge>
    );
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
          <Link href="/admin/users">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
            <p className="text-gray-600">
              Update user details and view memberships
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">User Details</TabsTrigger>
          <TabsTrigger value="memberships">
            Committee Memberships ({committeeMemberships.length})
          </TabsTrigger>
        </TabsList>

        {/* User Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Update the user profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Link href="/admin/users">
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

        {/* Committee Memberships Tab */}
        <TabsContent value="memberships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Committee Memberships ({committeeMemberships.length})
              </CardTitle>
              <CardDescription>
                View and manage committee memberships for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Committee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {committeeMemberships.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-slate-500"
                      >
                        No committee memberships found
                      </TableCell>
                    </TableRow>
                  ) : (
                    committeeMemberships.map((membership) => (
                      <TableRow key={membership.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {membership.committee.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {membership.committee.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(membership.role)}</TableCell>
                        <TableCell>
                          {getStatusBadge(membership.committee.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(membership.joinedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/committees/${membership.committee.id}`}
                            >
                              <Button size="sm" variant="outline">
                                View Committee
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleRemoveMembership(membership.id)
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
    </div>
  );
}
