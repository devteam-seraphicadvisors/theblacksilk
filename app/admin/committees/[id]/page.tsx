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
  Crown,
  Shield,
  User,
  Search,
  XCircle,
  Plus,
} from "lucide-react";

interface Member {
  id: string;
  userId: string;
  committeeId: string;
  role: string;
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    organization?: string;
    position?: string;
  };
}

interface MemberStats {
  total: number;
  chairs: number;
  coChairs: number;
  members: number;
}

export default function EditCommitteePage() {
  const router = useRouter();
  const params = useParams();
  const committeeId = params?.id as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Committee form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    chairName: "",
    coChairName: "",
    focusAreas: "",
    status: "active" as "active" | "inactive",
  });

  // Members data
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<MemberStats>({
    total: 0,
    chairs: 0,
    coChairs: 0,
    members: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");
  const [addingMember, setAddingMember] = useState(false);

  useEffect(() => {
    if (committeeId) {
      fetchCommittee();
      fetchMembers();
    }
  }, [committeeId]);

  useEffect(() => {
    filterMembers();
  }, [members, searchQuery, roleFilter]);

  const fetchCommittee = async () => {
    try {
      const response = await fetch(`/api/admin/committees/${committeeId}`);
      if (response.ok) {
        const committee = await response.json();
        setFormData({
          name: committee.name,
          description: committee.description,
          chairName: committee.chairName || "",
          coChairName: committee.coChairName || "",
          focusAreas: committee.focusAreas.join(", "),
          status: committee.status,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch committee details",
          variant: "destructive",
        });
        router.push("/admin/committees");
      }
    } catch (error) {
      console.error("Error fetching committee:", error);
      toast({
        title: "Error",
        description: "Failed to fetch committee details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        `/api/admin/committee-members?committeeId=${committeeId}`
      );
      if (response.ok) {
        const data = await response.json();
        const committeeMembers = data.members || [];
        setMembers(committeeMembers);
        calculateStats(committeeMembers);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const calculateStats = (data: Member[]) => {
    const stats = {
      total: data.length,
      chairs: data.filter((m) => m.role === "chair").length,
      coChairs: data.filter((m) => m.role === "co-chair").length,
      members: data.filter((m) => m.role === "member").length,
    };
    setStats(stats);
  };

  const filterMembers = () => {
    let filtered = [...members];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (member) =>
          member.user.name.toLowerCase().includes(query) ||
          member.user.email.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((member) => member.role === roleFilter);
    }

    setFilteredMembers(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = {
        ...formData,
        focusAreas: formData.focusAreas
          .split(",")
          .map((area) => area.trim())
          .filter(Boolean),
      };

      const response = await fetch(`/api/admin/committees/${committeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Committee updated successfully",
        });
        router.push("/admin/committees");
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to update committee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating committee:", error);
      toast({
        title: "Error",
        description: "Failed to update committee",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMemberRole = async () => {
    if (!selectedMember || !newRole) return;

    try {
      const response = await fetch(
        `/api/admin/committee-members/${selectedMember.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) throw new Error("Failed to update role");

      toast({
        title: "Success",
        description: "Member role updated successfully",
      });

      fetchMembers();
      setIsUpdateDialogOpen(false);
      setSelectedMember(null);
      setNewRole("");
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "Failed to update member role",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    try {
      const response = await fetch(`/api/admin/committee-members/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete member");

      toast({
        title: "Success",
        description: "Member removed successfully",
      });

      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast({
        title: "Error",
        description: "Failed to remove member",
        variant: "destructive",
      });
    }
  };

  const handleAddMember = async () => {
    if (!newMemberEmail || !newMemberRole) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setAddingMember(true);

    try {
      // First, find user by email
      const userResponse = await fetch(
        `/api/user/search?email=${newMemberEmail}`
      );
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData = await userResponse.json();

      // Add member to committee
      const response = await fetch("/api/admin/committee-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.user.id,
          committeeId,
          role: newMemberRole,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add member");
      }

      toast({
        title: "Success",
        description: "Member added successfully",
      });

      fetchMembers();
      setIsAddDialogOpen(false);
      setNewMemberEmail("");
      setNewMemberRole("member");
    } catch (error: any) {
      console.error("Error adding member:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add member",
        variant: "destructive",
      });
    } finally {
      setAddingMember(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<
      string,
      { color: string; icon: any; label: string }
    > = {
      chair: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Crown,
        label: "Chair",
      },
      "co-chair": {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Shield,
        label: "Co-Chair",
      },
      member: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: User,
        label: "Member",
      },
    };

    const variant = variants[role] || variants.member;
    const Icon = variant.icon;

    return (
      <Badge className={`${variant.color} border`}>
        <Icon className="h-3 w-3 mr-1" />
        {variant.label}
      </Badge>
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
          <Link href="/admin/committees">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Committees
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Committee</h1>
            <p className="text-gray-600">
              Update committee details and manage members
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Committee Details</TabsTrigger>
          <TabsTrigger value="members">Members ({stats.total})</TabsTrigger>
        </TabsList>

        {/* Committee Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the committee information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Committee Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Enter committee name"
                  />
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
                    placeholder="Describe the committee's purpose and goals"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chairName">Chair</Label>
                    <Input
                      id="chairName"
                      value={formData.chairName}
                      onChange={(e) =>
                        setFormData({ ...formData, chairName: e.target.value })
                      }
                      placeholder="Chair name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coChairName">Co-Chair</Label>
                    <Input
                      id="coChairName"
                      value={formData.coChairName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coChairName: e.target.value,
                        })
                      }
                      placeholder="Co-chair name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="focusAreas">Focus Areas</Label>
                  <Input
                    id="focusAreas"
                    value={formData.focusAreas}
                    onChange={(e) =>
                      setFormData({ ...formData, focusAreas: e.target.value })
                    }
                    placeholder="Comma-separated focus areas"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter multiple focus areas separated by commas
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Link href="/admin/committees">
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

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Members
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
                  Chairs
                </CardTitle>
                <Crown className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.chairs}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Co-Chairs
                </CardTitle>
                <Shield className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.coChairs}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Members
                </CardTitle>
                <User className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {stats.members}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>
                Search and filter committee members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="chair">Chair</SelectItem>
                    <SelectItem value="co-chair">Co-Chair</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Members Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Members ({filteredMembers.length})</CardTitle>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-slate-500"
                      >
                        No members found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          {member.user.name}
                        </TableCell>
                        <TableCell>{member.user.email}</TableCell>
                        <TableCell>
                          {member.user.organization || "N/A"}
                        </TableCell>
                        <TableCell>{getRoleBadge(member.role)}</TableCell>
                        <TableCell>
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMember(member);
                                setNewRole(member.role);
                                setIsUpdateDialogOpen(true);
                              }}
                            >
                              Update Role
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteMember(member.id)}
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

      {/* Update Role Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Member Role</DialogTitle>
            <DialogDescription>
              Change the role of this committee member
            </DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Member</p>
                <p className="text-sm text-slate-900">
                  {selectedMember.user.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  New Role
                </p>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chair">Chair</SelectItem>
                    <SelectItem value="co-chair">Co-Chair</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
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
            <Button onClick={handleUpdateMemberRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Committee Member</DialogTitle>
            <DialogDescription>
              Add a new member to this committee by their email address
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memberEmail">User Email</Label>
              <Input
                id="memberEmail"
                type="email"
                placeholder="user@example.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <p className="text-sm text-slate-500">
                The user must already be registered on the platform
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberRole">Role</Label>
              <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                <SelectTrigger id="memberRole">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chair">Chair</SelectItem>
                  <SelectItem value="co-chair">Co-Chair</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewMemberEmail("");
                setNewMemberRole("member");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddMember} disabled={addingMember}>
              {addingMember ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
