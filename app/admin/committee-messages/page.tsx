"use client";

import { useState, useEffect, useRef } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Send,
  Building2,
  Users,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";

interface CommitteeMessage {
  id: string;
  committeeId: string;
  userId: string;
  content: string;
  attachments: string[];
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface Committee {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export default function CommitteeMessagesManagement() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>("");
  const [messages, setMessages] = useState<CommitteeMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCommittees();
  }, []);

  useEffect(() => {
    if (selectedCommitteeId) {
      fetchMessages();
      // Set up polling for new messages
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedCommitteeId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/committees");
      if (!response.ok) throw new Error("Failed to fetch committees");

      const data = await response.json();
      setCommittees(data.committees || []);
    } catch (error) {
      console.error("Error fetching committees:", error);
      toast({
        title: "Error",
        description: "Failed to load committees",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedCommitteeId) return;

    try {
      setMessagesLoading(true);
      const response = await fetch(
        `/api/admin/committee-messages?committeeId=${selectedCommitteeId}`
      );
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedCommitteeId) return;

    try {
      const response = await fetch("/api/admin/committee-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          committeeId: selectedCommitteeId,
          content: newMessage,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setNewMessage("");
      fetchMessages();

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/admin/committee-messages/${id}`, {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getSelectedCommittee = () => {
    return committees.find((c) => c.id === selectedCommitteeId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Committee Messages
        </h1>
        <p className="text-slate-600 mt-2">
          View and manage messages in committee chats
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Committees Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Committees
            </CardTitle>
            <CardDescription>
              Select a committee to view messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
              </div>
            ) : (
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {committees.map((committee) => (
                    <button
                      key={committee.id}
                      onClick={() => setSelectedCommitteeId(committee.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedCommitteeId === committee.id
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-medium text-slate-900">
                        {committee.name}
                      </div>
                      <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {committee.memberCount} members
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="lg:col-span-2">
          {selectedCommitteeId ? (
            <>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {getSelectedCommittee()?.name}
                  </div>
                  <Badge variant="outline">
                    {messages.length} message{messages.length !== 1 ? "s" : ""}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {getSelectedCommittee()?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages List */}
                <ScrollArea className="h-[500px] p-4">
                  {messagesLoading && messages.length === 0 ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex gap-3 group">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {message.user.name.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-900">
                                {message.user.name}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(message.createdAt).toLocaleString()}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                                onClick={() => handleDeleteMessage(message.id)}
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                            <div className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={2}
                      className="flex-1 resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="self-end"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Press Enter to send, Shift + Enter for new line
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[600px]">
              <div className="text-center text-slate-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">Select a Committee</p>
                <p className="text-sm">
                  Choose a committee to view and manage messages
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
