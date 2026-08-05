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
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Plus,
  Send,
  Users,
  UserCheck,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  audience: string;
  status: "draft" | "scheduled" | "sent";
  scheduledFor?: string;
  sentAt?: string;
  recipients: number;
  readCount: number;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    audience: "all",
    scheduledFor: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Simulate API call
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "New Event: AI in Legal Practice Summit",
          message:
            "Join us for our upcoming summit on AI in legal practice. Register now!",
          type: "info",
          audience: "all-members",
          status: "sent",
          sentAt: "2025-11-28T10:00:00Z",
          recipients: 449,
          readCount: 312,
          createdAt: "2025-11-28T09:00:00Z",
        },
        {
          id: "2",
          title: "System Maintenance Scheduled",
          message:
            "Platform maintenance scheduled for December 1st, 2025 from 2-4 AM EST.",
          type: "warning",
          audience: "all-users",
          status: "scheduled",
          scheduledFor: "2025-11-30T18:00:00Z",
          recipients: 523,
          readCount: 0,
          createdAt: "2025-11-27T14:00:00Z",
        },
        {
          id: "3",
          title: "Membership Renewal Reminder",
          message:
            "Your annual membership is due for renewal. Renew now to continue enjoying benefits.",
          type: "info",
          audience: "expiring-members",
          status: "sent",
          sentAt: "2025-11-25T08:00:00Z",
          recipients: 87,
          readCount: 65,
          createdAt: "2025-11-25T07:00:00Z",
        },
        {
          id: "4",
          title: "New Publication Available",
          message:
            "Check out our latest research paper on blockchain in legal systems.",
          type: "success",
          audience: "all-members",
          status: "draft",
          recipients: 0,
          readCount: 0,
          createdAt: "2025-11-29T16:00:00Z",
        },
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate API call
      const newNotification: Notification = {
        id: String(notifications.length + 1),
        title: formData.title,
        message: formData.message,
        type: formData.type as any,
        audience: formData.audience,
        status: formData.scheduledFor ? "scheduled" : "sent",
        scheduledFor: formData.scheduledFor || undefined,
        sentAt: formData.scheduledFor ? undefined : new Date().toISOString(),
        recipients: 449,
        readCount: 0,
        createdAt: new Date().toISOString(),
      };

      setNotifications([newNotification, ...notifications]);
      setIsCreateDialogOpen(false);
      setFormData({
        title: "",
        message: "",
        type: "info",
        audience: "all",
        scheduledFor: "",
      });

      toast({
        title: "Success",
        description: formData.scheduledFor
          ? "Notification scheduled successfully"
          : "Notification sent successfully",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      draft: { color: "bg-gray-100 text-gray-800", icon: FileText },
      scheduled: { color: "bg-blue-100 text-blue-800", icon: Clock },
      sent: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    };
    const { color, icon: Icon } =
      config[status as keyof typeof config] || config.draft;
    return (
      <Badge variant="outline" className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      info: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    };
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type}
      </Badge>
    );
  };

  const filteredNotifications =
    filterStatus === "all"
      ? notifications
      : notifications.filter((n) => n.status === filterStatus);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage platform notifications</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            Send and manage platform notifications
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <form onSubmit={handleSendNotification}>
              <DialogHeader>
                <DialogTitle>Create Notification</DialogTitle>
                <DialogDescription>
                  Send a notification to users or schedule for later
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter notification title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Enter notification message"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Audience</Label>
                    <Select
                      value={formData.audience}
                      onValueChange={(value) =>
                        setFormData({ ...formData, audience: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="all-members">All Members</SelectItem>
                        <SelectItem value="admins">Admins</SelectItem>
                        <SelectItem value="committee-chairs">
                          Committee Chairs
                        </SelectItem>
                        <SelectItem value="event-registrants">
                          Event Registrants
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduledFor">
                    Schedule (Optional - leave empty to send now)
                  </Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduledFor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {formData.scheduledFor ? (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      Schedule
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Now
                    </>
                  )}
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
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.status === "sent").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.status === "scheduled").length}
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
              {notifications.filter((n) => n.status === "draft").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recipients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.reduce((sum, n) => sum + n.recipients, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>
                View and manage all platform notifications
              </CardDescription>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Read Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {notification.message}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>
                    <div className="text-sm">{notification.audience}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{notification.recipients}</div>
                  </TableCell>
                  <TableCell>
                    {notification.status === "sent" ? (
                      <div className="text-sm">
                        {notification.readCount > 0
                          ? `${Math.round(
                              (notification.readCount /
                                notification.recipients) *
                                100
                            )}%`
                          : "0%"}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {notification.sentAt
                        ? new Date(notification.sentAt).toLocaleDateString()
                        : notification.scheduledFor
                        ? new Date(
                            notification.scheduledFor
                          ).toLocaleDateString()
                        : new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
