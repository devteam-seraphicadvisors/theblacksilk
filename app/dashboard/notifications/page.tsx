"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  FileText,
  MessageSquare,
  Award,
  Settings,
  Check,
  X,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    type: "event",
    title: "New Event Registration Open",
    message:
      "Digital Rights & Privacy Symposium 2025 registration is now open. Early bird pricing available until January 15th.",
    timestamp: "1 hour ago",
    read: false,
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    type: "committee",
    title: "Committee Meeting Reminder",
    message: "AI & Ethics Committee meeting scheduled for tomorrow at 2:00 PM. Please review the agenda beforehand.",
    timestamp: "3 hours ago",
    read: false,
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    type: "publication",
    title: "New Publication Available",
    message: '"Blockchain in Legal Documentation" white paper has been published. Download now from the Knowledge Hub.',
    timestamp: "1 day ago",
    read: true,
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 4,
    type: "message",
    title: "New Message from Dr. Priya Sharma",
    message: "Thanks for your input on the AI ethics guidelines. Let's schedule a follow-up meeting.",
    timestamp: "2 days ago",
    read: true,
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 5,
    type: "achievement",
    title: "Milestone Achieved",
    message:
      'Congratulations! You\'ve attended 10 committee meetings this year and earned the "Active Contributor" badge.',
    timestamp: "3 days ago",
    read: true,
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

const notificationSettings = [
  {
    category: "Events",
    description: "Get notified about new events and registration updates",
    settings: [
      { name: "New event announcements", enabled: true },
      { name: "Registration confirmations", enabled: true },
      { name: "Event reminders", enabled: true },
      { name: "Event updates and changes", enabled: false },
    ],
  },
  {
    category: "Committees",
    description: "Stay updated on committee activities and meetings",
    settings: [
      { name: "Meeting reminders", enabled: true },
      { name: "New document uploads", enabled: true },
      { name: "Discussion updates", enabled: false },
      { name: "Committee announcements", enabled: true },
    ],
  },
  {
    category: "Publications",
    description: "Be informed about new publications and research",
    settings: [
      { name: "New publications", enabled: true },
      { name: "Publication updates", enabled: false },
      { name: "Research highlights", enabled: true },
    ],
  },
  {
    category: "Messages",
    description: "Manage your messaging notifications",
    settings: [
      { name: "Direct messages", enabled: true },
      { name: "Group messages", enabled: true },
      { name: "Message reactions", enabled: false },
    ],
  },
]

export default function NotificationsPage() {
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const handleMarkAsRead = (ids: number[]) => {
    // Handle marking notifications as read
    setSelectedNotifications([])
  }

  const handleDeleteNotifications = (ids: number[]) => {
    // Handle deleting notifications
    setSelectedNotifications([])
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true
  })

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with the latest activities and announcements
            {unreadCount > 0 && <Badge className="ml-2 bg-red-100 text-red-800">{unreadCount} unread</Badge>}
          </p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Settings className="mr-2 h-4 w-4" />
          Notification Settings
        </Button>
      </div>

      {/* Notifications Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-gray-600">{selectedNotifications.length} notification(s) selected</p>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(selectedNotifications)}
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteNotifications(selectedNotifications)}
                    className="flex-1 sm:flex-none text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-gray-50",
                  !notification.read && "border-l-4 border-l-blue-500 bg-blue-50/30",
                  selectedNotifications.includes(notification.id) && "ring-2 ring-primary",
                )}
                onClick={() => handleSelectNotification(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={cn("p-2 rounded-full", notification.bgColor)}>
                      <notification.icon className={cn("h-5 w-5", notification.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn("font-medium text-gray-900", !notification.read && "font-semibold")}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{notification.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <MarkAsUnread className="mr-1 h-3 w-3" />
                              Mark as Read
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-red-600">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className="cursor-pointer transition-colors hover:bg-gray-50 border-l-4 border-l-blue-500 bg-blue-50/30"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={cn("p-2 rounded-full", notification.bgColor)}>
                      <notification.icon className={cn("h-5 w-5", notification.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{notification.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="space-y-6">
            {notificationSettings.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{setting.name}</span>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
