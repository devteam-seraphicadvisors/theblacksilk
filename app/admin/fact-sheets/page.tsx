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
  FileText,
  Download,
  Eye,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

interface FactSheet {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  publishedAt: string;
  downloads: number;
  image?: string;
  tags: string[];
  featured: boolean;
  pdfUrl?: string;
  rating: number;
  published: boolean;
}

const categories = [
  "AI & Courts",
  "Cybersecurity",
  "Blockchain",
  "Data Privacy",
  "Digital Evidence",
  "Legal Tech",
];

export default function AdminFactSheetsPage() {
  const [factSheets, setFactSheets] = useState<FactSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFactSheet, setEditingFactSheet] = useState<FactSheet | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categories[0],
    pages: 1,
    image: "",
    tags: "",
    featured: false,
    pdfUrl: "",
    rating: 5.0,
    published: true,
  });

  useEffect(() => {
    fetchFactSheets();
  }, []);

  const fetchFactSheets = async () => {
    try {
      const response = await fetch("/api/admin/fact-sheets");
      if (response.ok) {
        const data = await response.json();
        setFactSheets(data.factSheets || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch fact sheets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingFactSheet
        ? `/api/admin/fact-sheets/${editingFactSheet.id}`
        : "/api/admin/fact-sheets";
      const method = editingFactSheet ? "PUT" : "POST";

      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Fact sheet ${
            editingFactSheet ? "updated" : "created"
          } successfully`,
        });
        setDialogOpen(false);
        resetForm();
        fetchFactSheets();
      } else {
        throw new Error("Failed to save fact sheet");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          editingFactSheet ? "update" : "create"
        } fact sheet`,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (factSheet: FactSheet) => {
    setEditingFactSheet(factSheet);
    setFormData({
      title: factSheet.title,
      description: factSheet.description,
      category: factSheet.category,
      pages: factSheet.pages,
      image: factSheet.image || "",
      tags: factSheet.tags.join(", "),
      featured: factSheet.featured,
      pdfUrl: factSheet.pdfUrl || "",
      rating: factSheet.rating,
      published: factSheet.published,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fact sheet?")) return;

    try {
      const response = await fetch(`/api/admin/fact-sheets/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Fact sheet deleted successfully",
        });
        fetchFactSheets();
      } else {
        throw new Error("Failed to delete fact sheet");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete fact sheet",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingFactSheet(null);
    setFormData({
      title: "",
      description: "",
      category: categories[0],
      pages: 1,
      image: "",
      tags: "",
      featured: false,
      pdfUrl: "",
      rating: 5.0,
      published: true,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Fact Sheets Management
          </h1>
          <p className="text-muted-foreground">
            Manage fact sheets and quick reference guides
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Fact Sheet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFactSheet ? "Edit Fact Sheet" : "Create New Fact Sheet"}
              </DialogTitle>
              <DialogDescription>
                {editingFactSheet
                  ? "Update fact sheet details"
                  : "Add a new fact sheet to the knowledge hub"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter fact sheet title"
                  required
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
                  placeholder="Enter fact sheet description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    type="number"
                    min="1"
                    value={formData.pages}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pages: parseInt(e.target.value),
                      })
                    }
                    required
                  />
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
                  <Label htmlFor="pdfUrl">PDF URL</Label>
                  <Input
                    id="pdfUrl"
                    value={formData.pdfUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, pdfUrl: e.target.value })
                    }
                    placeholder="https://example.com/factsheet.pdf"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="AI, Technology, Legal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="1"
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

              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked })
                    }
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
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
                  {editingFactSheet ? "Update Fact Sheet" : "Create Fact Sheet"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Fact Sheets
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{factSheets.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {factSheets.filter((f) => f.published).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {factSheets.filter((f) => f.featured).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Downloads
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {factSheets
                .reduce((sum, f) => sum + f.downloads, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Fact Sheets</CardTitle>
          <CardDescription>Manage your fact sheets and guides</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factSheets.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No fact sheets found. Click "Add Fact Sheet" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                factSheets.map((factSheet) => (
                  <TableRow key={factSheet.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{factSheet.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {factSheet.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{factSheet.category}</Badge>
                    </TableCell>
                    <TableCell>{factSheet.pages}</TableCell>
                    <TableCell>
                      {factSheet.downloads.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{factSheet.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {factSheet.featured && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={factSheet.published ? "default" : "secondary"}
                      >
                        {factSheet.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(factSheet)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(factSheet.id)}
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
