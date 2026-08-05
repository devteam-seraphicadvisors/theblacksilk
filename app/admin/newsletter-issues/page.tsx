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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Calendar,
  FileText,
  Users,
} from "lucide-react";

interface NewsletterIssue {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  topics: string[];
  image?: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function NewsletterIssuesPage() {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<NewsletterIssue | null>(
    null
  );
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    topics: "",
    image: "",
    readTime: "",
    published: false,
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      // Simulate API call
      const mockIssues: NewsletterIssue[] = [
        {
          id: "1",
          title: "Legal Tech Innovation in 2025",
          excerpt:
            "Exploring the latest trends in legal technology and AI adoption",
          content: "Full newsletter content here...",
          topics: ["Technology", "AI", "Innovation"],
          readTime: "5 min",
          published: true,
          publishedAt: "2025-11-28T10:00:00Z",
          createdAt: "2025-11-25T10:00:00Z",
        },
        {
          id: "2",
          title: "Data Privacy Updates & Compliance",
          excerpt:
            "Important updates on data privacy regulations and compliance requirements",
          content: "Full newsletter content here...",
          topics: ["Privacy", "Compliance", "Regulations"],
          readTime: "7 min",
          published: true,
          publishedAt: "2025-11-21T10:00:00Z",
          createdAt: "2025-11-18T10:00:00Z",
        },
        {
          id: "3",
          title: "December Community Highlights",
          excerpt:
            "Celebrating our community's achievements and upcoming events",
          content: "Full newsletter content here...",
          topics: ["Community", "Events", "Updates"],
          readTime: "4 min",
          published: false,
          publishedAt: "2025-12-01T10:00:00Z",
          createdAt: "2025-11-29T10:00:00Z",
        },
      ];
      setIssues(mockIssues);
    } catch (error) {
      console.error("Error fetching newsletter issues:", error);
      toast({
        title: "Error",
        description: "Failed to fetch newsletter issues",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newIssue: NewsletterIssue = {
        id: String(issues.length + 1),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        topics: formData.topics.split(",").map((t) => t.trim()),
        image: formData.image,
        readTime: formData.readTime,
        published: formData.published,
        publishedAt: formData.published
          ? new Date().toISOString()
          : new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setIssues([newIssue, ...issues]);
      setIsCreateDialogOpen(false);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        topics: "",
        image: "",
        readTime: "",
        published: false,
      });

      toast({
        title: "Success",
        description: formData.published
          ? "Newsletter issue created and published"
          : "Newsletter issue created as draft",
      });
    } catch (error) {
      console.error("Error creating newsletter issue:", error);
      toast({
        title: "Error",
        description: "Failed to create newsletter issue",
        variant: "destructive",
      });
    }
  };

  const handleEditIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingIssue) return;

    try {
      const updatedIssue: NewsletterIssue = {
        ...editingIssue,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        topics: formData.topics.split(",").map((t) => t.trim()),
        image: formData.image,
        readTime: formData.readTime,
        published: formData.published,
      };

      setIssues(
        issues.map((issue) =>
          issue.id === editingIssue.id ? updatedIssue : issue
        )
      );
      setIsEditDialogOpen(false);
      setEditingIssue(null);

      toast({
        title: "Success",
        description: "Newsletter issue updated successfully",
      });
    } catch (error) {
      console.error("Error updating newsletter issue:", error);
      toast({
        title: "Error",
        description: "Failed to update newsletter issue",
        variant: "destructive",
      });
    }
  };

  const handleDeleteIssue = async (issueId: string) => {
    if (!confirm("Are you sure you want to delete this newsletter issue?"))
      return;

    try {
      setIssues(issues.filter((issue) => issue.id !== issueId));
      toast({
        title: "Success",
        description: "Newsletter issue deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting newsletter issue:", error);
      toast({
        title: "Error",
        description: "Failed to delete newsletter issue",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (issue: NewsletterIssue) => {
    setEditingIssue(issue);
    setFormData({
      title: issue.title,
      excerpt: issue.excerpt,
      content: issue.content,
      topics: issue.topics.join(", "),
      image: issue.image || "",
      readTime: issue.readTime,
      published: issue.published,
    });
    setIsEditDialogOpen(true);
  };

  const handlePublishIssue = async (issueId: string) => {
    try {
      setIssues(
        issues.map((issue) =>
          issue.id === issueId
            ? {
                ...issue,
                published: true,
                publishedAt: new Date().toISOString(),
              }
            : issue
        )
      );
      toast({
        title: "Success",
        description: "Newsletter issue published successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish newsletter issue",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Newsletter Issues
            </h1>
            <p className="text-gray-600">Manage newsletter content</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Newsletter Issues
          </h1>
          <p className="text-gray-600">Create and manage newsletter content</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <form onSubmit={handleCreateIssue} className="flex flex-col h-full">
              <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
                <DialogTitle>Create Newsletter Issue</DialogTitle>
                <DialogDescription>
                  Create a new newsletter to send to subscribers
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="flex-1 px-6 overflow-y-auto">
                <div className="grid gap-4 py-4 pb-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter newsletter title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      placeholder="Brief summary of the newsletter"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Full newsletter content (supports HTML)"
                      rows={10}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="topics">Topics (comma-separated)</Label>
                      <Input
                        id="topics"
                        value={formData.topics}
                        onChange={(e) =>
                          setFormData({ ...formData, topics: e.target.value })
                        }
                        placeholder="e.g., Technology, Privacy, Updates"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) =>
                          setFormData({ ...formData, readTime: e.target.value })
                        }
                        placeholder="e.g., 5 min"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Feature Image URL (optional)</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter className="px-6 py-4 border-t bg-muted/20 flex-shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, published: false })}
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  onClick={() => setFormData({ ...formData, published: true })}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{issues.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {issues.filter((i) => i.published).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {issues.filter((i) => !i.published).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">678</div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletter Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Newsletter Issues</CardTitle>
          <CardDescription>
            Manage and publish newsletter content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Topics</TableHead>
                <TableHead>Read Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{issue.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {issue.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {issue.topics.slice(0, 2).map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {issue.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{issue.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{issue.readTime}</div>
                  </TableCell>
                  <TableCell>
                    {issue.published ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-600">
                        Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(issue.publishedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(issue)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!issue.published && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePublishIssue(issue.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <form onSubmit={handleEditIssue} className="flex flex-col h-full">
            <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
              <DialogTitle>Edit Newsletter Issue</DialogTitle>
              <DialogDescription>
                Update newsletter content and settings
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1 px-6 overflow-y-auto">
              <div className="grid gap-4 py-4 pb-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea
                    id="edit-excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={10}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-topics">
                      Topics (comma-separated)
                    </Label>
                    <Input
                      id="edit-topics"
                      value={formData.topics}
                      onChange={(e) =>
                        setFormData({ ...formData, topics: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-readTime">Read Time</Label>
                    <Input
                      id="edit-readTime"
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-image">
                    Feature Image URL (optional)
                  </Label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="px-6 py-4 border-t bg-muted/20 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Issue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
