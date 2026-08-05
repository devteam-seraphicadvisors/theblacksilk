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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Mail,
  MailOpen,
  Trash2,
  Eye,
  Search,
  Loader2,
  Send,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
  receiver: {
    id: string;
    name: string;
    email: string;
  };
}

interface Stats {
  total: number;
  unread: number;
  read: number;
}

export default function MessagesManagement() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, read: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchQuery, statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/messages");
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data.messages || []);
      calculateStats(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Message[]) => {
    const stats = {
      total: data.length,
      unread: data.filter((m) => !m.isRead).length,
      read: data.filter((m) => m.isRead).length,
    };
    setStats(stats);
  };

  const filterMessages = () => {
    let filtered = [...messages];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(query) ||
          msg.sender.name.toLowerCase().includes(query) ||
          msg.receiver.name.toLowerCase().includes(query) ||
          msg.content.toLowerCase().includes(query)
      );
    }

    if (statusFilter === "read") {
      filtered = filtered.filter((msg) => msg.isRead);
    } else if (statusFilter === "unread") {
      filtered = filtered.filter((msg) => !msg.isRead);
    }

    setFilteredMessages(filtered);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) throw new Error("Failed to mark as read");

      fetchMessages();
    } catch (error) {
      console.error("Error marking as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete message");

      toast({
        title: "Success",
        description: "Message deleted successfully",
      });

      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-600 mt-2">Manage all user-to-user messages</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Messages
            </CardTitle>
            <Mail className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {stats.total}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Unread
            </CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.unread}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Read
            </CardTitle>
            <MailOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.read}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "unread" ? "default" : "outline"}
                onClick={() => setStatusFilter("unread")}
              >
                Unread
              </Button>
              <Button
                variant={statusFilter === "read" ? "default" : "outline"}
                onClick={() => setStatusFilter("read")}
              >
                Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    No messages found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={!message.isRead ? "bg-blue-50" : ""}
                  >
                    <TableCell>
                      {message.isRead ? (
                        <MailOpen className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Mail className="h-4 w-4 text-blue-600" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{message.sender.name}</div>
                        <div className="text-sm text-slate-500">
                          {message.sender.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {message.receiver.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {message.receiver.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {message.subject}
                    </TableCell>
                    <TableCell>
                      {new Date(message.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(message.id)}
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

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">From</p>
                  <p className="text-sm text-slate-900">
                    {selectedMessage.sender.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedMessage.sender.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">To</p>
                  <p className="text-sm text-slate-900">
                    {selectedMessage.receiver.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedMessage.receiver.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Date</p>
                <p className="text-sm text-slate-900">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Subject
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {selectedMessage.subject}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Message
                </p>
                <div className="bg-slate-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
