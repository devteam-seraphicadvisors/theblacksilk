"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Paperclip, MoreVertical, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";

const conversations = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Committee Chair",
    lastMessage:
      "Thanks for your input on the AI ethics guidelines. Let's schedule a follow-up meeting.",
    timestamp: "2 hours ago",
    unread: true,
    avatar: "/images/author-priya.jpg",
    online: true,
  },
  {
    id: 2,
    name: "AI & Ethics Committee",
    role: "Group Chat",
    lastMessage:
      "The draft document has been uploaded for review. Please provide feedback by Friday.",
    timestamp: "5 hours ago",
    unread: true,
    avatar: "/images/committee-ai.jpg",
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Legal Advisor",
    lastMessage:
      "I've reviewed the contract terms. Everything looks good to proceed.",
    timestamp: "1 day ago",
    unread: false,
    avatar: "/images/member-1.jpg",
    online: false,
  },
  {
    id: 4,
    name: "Data Policy Committee",
    role: "Group Chat",
    lastMessage: "Meeting minutes from yesterday's session are now available.",
    timestamp: "2 days ago",
    unread: false,
    avatar: "/images/committee-cyber.jpg",
    online: false,
    isGroup: true,
  },
];

const messages = [
  {
    id: 1,
    sender: "Dr. Priya Sharma",
    content:
      "Hi John, I hope you're doing well. I wanted to follow up on our discussion about the AI ethics guidelines.",
    timestamp: "10:30 AM",
    isOwn: false,
    avatar: "/images/author-priya.jpg",
  },
  {
    id: 2,
    sender: "You",
    content:
      "Hi Dr. Sharma, thanks for reaching out. I've been working on the draft and have some thoughts to share.",
    timestamp: "10:35 AM",
    isOwn: true,
    avatar: "/images/avatar-placeholder.jpg",
  },
  {
    id: 3,
    sender: "Dr. Priya Sharma",
    content:
      "That's great! I'd love to hear your thoughts. The committee is particularly interested in the implementation framework.",
    timestamp: "10:40 AM",
    isOwn: false,
    avatar: "/images/author-priya.jpg",
  },
  {
    id: 4,
    sender: "You",
    content:
      "I think we should focus on three key areas: transparency, accountability, and bias mitigation. I can prepare a detailed proposal for the next meeting.",
    timestamp: "10:45 AM",
    isOwn: true,
    avatar: "/images/avatar-placeholder.jpg",
  },
  {
    id: 5,
    sender: "Dr. Priya Sharma",
    content:
      "Perfect! That aligns well with our objectives. Thanks for your input on the AI ethics guidelines. Let's schedule a follow-up meeting.",
    timestamp: "2 hours ago",
    isOwn: false,
    avatar: "/images/author-priya.jpg",
  },
];

export default function MessagesPage() {
  const { data: session } = useSession();
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [messageList, setMessageList] = useState(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // Pusher real-time messaging
  useEffect(() => {
    if (!selectedConversation || !session?.user) return;

    const channelName = `private-chat-${selectedConversation.id}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (data: any) => {
      setMessageList((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: data.sender,
          content: data.content,
          timestamp: data.timestamp,
          isOwn: data.senderId === session.user.email,
          avatar: data.avatar,
        },
      ]);
    });

    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [selectedConversation, session]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !session?.user) return;

    const messageData = {
      conversationId: selectedConversation.id,
      content: newMessage,
      sender: session.user.name || "User",
      senderId: session.user.email,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: session.user.image || "/images/avatar-placeholder.jpg",
    };

    // Optimistically add message
    setMessageList((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        content: newMessage,
        timestamp: messageData.timestamp,
        isOwn: true,
        avatar: messageData.avatar,
      },
    ]);

    setNewMessage("");

    // Send to backend
    try {
      await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] flex flex-col lg:flex-row">
      {/* Conversations List */}
      <div
        className={cn(
          "w-full lg:w-80 border-r border-gray-200 bg-white flex flex-col",
          showMobileChat && "hidden lg:flex"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation);
                setShowMobileChat(true);
              }}
              className={cn(
                "p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors",
                selectedConversation.id === conversation.id &&
                  "bg-blue-50 border-blue-200"
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={conversation.avatar || "/placeholder.svg"}
                      alt={conversation.name}
                    />
                    <AvatarFallback>
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {conversation.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-white",
          !showMobileChat && "hidden lg:flex"
        )}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowMobileChat(false)}
            >
              ←
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={selectedConversation.avatar || "/placeholder.svg"}
                alt={selectedConversation.name}
              />
              <AvatarFallback>
                {selectedConversation.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-gray-900">
                {selectedConversation.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedConversation.role}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messageList.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex space-x-3",
                message.isOwn && "flex-row-reverse space-x-reverse"
              )}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.sender}
                />
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "max-w-xs lg:max-w-md xl:max-w-lg",
                  message.isOwn && "items-end"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2",
                    message.isOwn
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-900"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[40px] max-h-32 resize-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-black hover:bg-gray-800 text-white flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
