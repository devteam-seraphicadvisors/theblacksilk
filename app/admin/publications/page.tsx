"use client";

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Download,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Publication {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime?: string;
  author: string;
  authorImage?: string;
  image?: string;
  views: number;
  downloads: number;
  type: string;
  tags: string[];
  pdfUrl?: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
}

export default function AdminPublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPublication, setEditingPublication] =
    useState<Publication | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await fetch("/api/publications");
      if (response.ok) {
        const data = await response.json();
        setPublications(data.publications || []);
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const tags =
      (formData.get("tags") as string)
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [];

    const data = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category: formData.get("category"),
      readTime: formData.get("readTime"),
      author: formData.get("author"),
      authorImage: formData.get("authorImage"),
      image: formData.get("image"),
      type: formData.get("type"),
      tags,
      pdfUrl: formData.get("pdfUrl"),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      publishedAt: formData.get("publishedAt"),
    };

    try {
      const url = editingPublication
        ? `/api/publications/${editingPublication.id}`
        : "/api/publications";
      const method = editingPublication ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Publication ${
            editingPublication ? "updated" : "created"
          } successfully`,
        });
        setIsDialogOpen(false);
        setEditingPublication(null);
        fetchPublications();
      } else {
        throw new Error("Failed to save publication");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save publication",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Publication deleted successfully",
        });
        fetchPublications();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete publication",
        variant: "destructive",
      });
    }
  };

  const openDialog = (publication?: Publication) => {
    setEditingPublication(publication || null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Publications Management</h1>
          <p className="text-gray-500 mt-2">
            Manage articles, white papers, and research reports
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Create Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPublication
                  ? "Edit Publication"
                  : "Create New Publication"}
              </DialogTitle>
              <DialogDescription>
                {editingPublication
                  ? "Update publication details"
                  : "Add a new publication to the platform"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingPublication?.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={3}
                  defaultValue={editingPublication?.excerpt}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Full Content (Optional)</Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={8}
                  defaultValue={editingPublication?.content || ""}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingPublication?.category}
                    placeholder="e.g., Tech Policy, Privacy"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    defaultValue={editingPublication?.readTime || ""}
                    placeholder="e.g., 8 min read"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    defaultValue={editingPublication?.author}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorImage">Author Image URL</Label>
                  <Input
                    id="authorImage"
                    name="authorImage"
                    defaultValue={editingPublication?.authorImage || ""}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={editingPublication?.image || ""}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Publication Type</Label>
                <Select
                  name="type"
                  defaultValue={editingPublication?.type || "article"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="white-paper">White Paper</SelectItem>
                    <SelectItem value="research-report">
                      Research Report
                    </SelectItem>
                    <SelectItem value="policy-brief">Policy Brief</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  defaultValue={editingPublication?.tags?.join(", ")}
                  placeholder="AI, Governance, Policy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdfUrl">PDF URL (Optional)</Label>
                <Input
                  id="pdfUrl"
                  name="pdfUrl"
                  defaultValue={editingPublication?.pdfUrl || ""}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishedAt">Publish Date</Label>
                <Input
                  id="publishedAt"
                  name="publishedAt"
                  type="datetime-local"
                  defaultValue={
                    editingPublication?.publishedAt
                      ? new Date(editingPublication.publishedAt)
                          .toISOString()
                          .slice(0, 16)
                      : new Date().toISOString().slice(0, 16)
                  }
                />
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    name="featured"
                    defaultChecked={editingPublication?.featured}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    name="published"
                    defaultChecked={editingPublication?.published ?? true}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPublication
                    ? "Update Publication"
                    : "Create Publication"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {publications.map((publication) => (
          <Card key={publication.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{publication.type}</Badge>
                    <Badge variant="outline">{publication.category}</Badge>
                    {publication.featured && (
                      <Badge className="bg-yellow-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {!publication.published && (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{publication.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {publication.excerpt}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span>By {publication.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span>{publication.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-gray-500" />
                  <span>{publication.downloads} downloads</span>
                </div>
                <div className="text-gray-500">
                  {new Date(publication.publishedAt).toLocaleDateString()}
                </div>
              </div>

              {publication.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {publication.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 justify-end">
                {publication.pdfUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(publication.pdfUrl, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openDialog(publication)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(publication.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {publications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No publications yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first publication to get started
              </p>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Create Publication
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
