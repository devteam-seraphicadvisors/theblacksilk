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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  experience: string;
  bio: string;
  image?: string;
  rating: number;
  availability: string;
  specialization: string;
  sessions: number;
  mentees: number;
  linkedin?: string;
  email?: string;
  active: boolean;
}

const availabilityOptions = ["available", "limited", "unavailable"];
const specializationOptions = [
  "AI & Ethics",
  "Blockchain & Fintech",
  "Cybersecurity & Privacy",
  "Product & Strategy",
  "Legal Tech",
  "Data Privacy",
];

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    expertise: "",
    experience: "",
    bio: "",
    image: "",
    rating: 5,
    availability: "available" as const,
    specialization: specializationOptions[0],
    linkedin: "",
    email: "",
    active: true,
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch("/api/admin/mentors");
      if (response.ok) {
        const data = await response.json();
        setMentors(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch mentors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingMentor
        ? `/api/admin/mentors/${editingMentor.id}`
        : "/api/admin/mentors";
      const method = editingMentor ? "PUT" : "POST";

      const payload = {
        ...formData,
        expertise: formData.expertise
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean),
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Mentor ${
            editingMentor ? "updated" : "created"
          } successfully`,
        });
        setDialogOpen(false);
        resetForm();
        fetchMentors();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingMentor ? "update" : "create"} mentor`,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (mentor: Mentor) => {
    setEditingMentor(mentor);
    setFormData({
      name: mentor.name,
      role: mentor.role,
      company: mentor.company,
      expertise: mentor.expertise.join(", "),
      experience: mentor.experience,
      bio: mentor.bio,
      image: mentor.image || "",
      rating: mentor.rating,
      availability: mentor.availability as any,
      specialization: mentor.specialization,
      linkedin: mentor.linkedin || "",
      email: mentor.email || "",
      active: mentor.active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mentor?")) return;
    try {
      const response = await fetch(`/api/admin/mentors/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({ title: "Success", description: "Mentor deleted successfully" });
        fetchMentors();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete mentor",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingMentor(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      expertise: "",
      experience: "",
      bio: "",
      image: "",
      rating: 5,
      availability: "available",
      specialization: specializationOptions[0],
      linkedin: "",
      email: "",
      active: true,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mentors Management
          </h1>
          <p className="text-muted-foreground">
            Manage mentorship program and mentors
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Mentor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMentor ? "Edit Mentor" : "Add New Mentor"}
              </DialogTitle>
              <DialogDescription>
                {editingMentor
                  ? "Update mentor details"
                  : "Add a new mentor to the program"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
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
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="e.g., 15+ years"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise">Expertise (comma-separated) *</Label>
                <Input
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) =>
                    setFormData({ ...formData, expertise: e.target.value })
                  }
                  placeholder="AI Governance, Legal Policy"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Select
                    value={formData.specialization}
                    onValueChange={(value) =>
                      setFormData({ ...formData, specialization: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {specializationOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, availability: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                />
                <Label htmlFor="active">Active</Label>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMentor ? "Update" : "Create"} Mentor
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mentors.filter((m) => m.availability === "available").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mentors.reduce((sum, m) => sum + m.sessions, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mentors.length > 0
                ? (
                    mentors.reduce((sum, m) => sum + m.rating, 0) /
                    mentors.length
                  ).toFixed(1)
                : "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Mentors</CardTitle>
          <CardDescription>Manage mentorship program mentors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Mentees</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No mentors found. Click "Add Mentor" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                mentors.map((mentor) => (
                  <TableRow key={mentor.id}>
                    <TableCell>
                      <div className="font-medium">{mentor.name}</div>
                      {!mentor.active && (
                        <Badge className="mt-1" variant="secondary">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{mentor.role}</TableCell>
                    <TableCell>{mentor.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{mentor.specialization}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          mentor.availability === "available"
                            ? "default"
                            : mentor.availability === "limited"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {mentor.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{mentor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{mentor.sessions}</TableCell>
                    <TableCell>{mentor.mentees}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(mentor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(mentor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}
