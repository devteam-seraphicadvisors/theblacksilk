"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Clock, Search, Plus, Pin, TrendingUp } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import Link from "next/link"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    image?: string
  }
  category: string
  replies: number
  views: number
  lastActivity: string
  isPinned?: boolean
  isTrending?: boolean
}

export default function ForumPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNewPost, setShowNewPost] = useState(false)

  const categories = [
    { id: "all", name: "All Topics", count: 156 },
    { id: "ai-law", name: "AI & Law", count: 42 },
    { id: "cybersecurity", name: "Cybersecurity", count: 38 },
    { id: "data-privacy", name: "Data Privacy", count: 35 },
    { id: "fintech", name: "Fintech", count: 28 },
    { id: "blockchain", name: "Blockchain", count: 13 },
  ]

  const mockPosts: ForumPost[] = [
    {
      id: "1",
      title: "AI Governance Framework: Implementation Challenges in Indian Courts",
      content: "Discussing the practical challenges of implementing AI governance frameworks...",
      author: { name: "Dr. Priya Sharma", image: "/placeholder.svg?height=40&width=40" },
      category: "AI & Law",
      replies: 23,
      views: 156,
      lastActivity: "2 hours ago",
      isPinned: true,
    },
    {
      id: "2",
      title: "GDPR vs Indian Data Protection Bill: A Comparative Analysis",
      content:
        "Let's discuss the key differences and similarities between GDPR and India's proposed data protection legislation...",
      author: { name: "Rajesh Kumar", image: "/placeholder.svg?height=40&width=40" },
      category: "Data Privacy",
      replies: 18,
      views: 234,
      lastActivity: "4 hours ago",
      isTrending: true,
    },
    {
      id: "3",
      title: "Cybersecurity Compliance for Startups: Best Practices",
      content: "What are the essential cybersecurity compliance requirements for Indian startups?",
      author: { name: "Anita Desai", image: "/placeholder.svg?height=40&width=40" },
      category: "Cybersecurity",
      replies: 15,
      views: 189,
      lastActivity: "6 hours ago",
    },
    {
      id: "4",
      title: "Smart Contracts in Real Estate: Legal Implications",
      content: "Exploring the legal framework needed for smart contracts in Indian real estate transactions...",
      author: { name: "Vikram Singh", image: "/placeholder.svg?height=40&width=40" },
      category: "Blockchain",
      replies: 12,
      views: 98,
      lastActivity: "8 hours ago",
    },
  ]

  useEffect(() => {
    setPosts(mockPosts)

    // Subscribe to real-time updates
    const channel = pusherClient.subscribe("forum")

    channel.bind("new-post", (data: ForumPost) => {
      setPosts((prev) => [data, ...prev])
    })

    channel.bind("new-reply", (data: { postId: string; replyCount: number }) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === data.postId ? { ...post, replies: data.replyCount, lastActivity: "Just now" } : post,
        ),
      )
    })

    return () => {
      pusherClient.unsubscribe("forum")
    }
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase().replace(" & ", "-").replace(" ", "-") === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="py-20 bg-black text-white border-b border-neutral-800 mb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-6">
            <MessageSquare className="h-3.5 w-3.5 mr-2 text-white" />
            <span>Discussion & Exchange</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-white mb-4 tracking-tight">Community Forum</h1>
          <p className="text-lg text-neutral-300 font-sans font-light max-w-2xl">Engage in discussions about law, technology, ethics, and digital policy with fellow practitioners</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6 border border-neutral-200 shadow-none rounded-none bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-serif">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Forum Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Total Posts</span>
                  </div>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Active Members</span>
                  </div>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">This Week</span>
                  </div>
                  <span className="font-semibold">89</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {session && (
                <Button onClick={() => setShowNewPost(true)} className="bg-black hover:bg-gray-800">
                  <Plus className="mr-2 h-4 w-4" />
                  New Discussion
                </Button>
              )}
            </div>

            {/* New Post Form */}
            {showNewPost && session && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Start a New Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Discussion title..." />
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select Category</option>
                    {categories.slice(1).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <Textarea placeholder="What would you like to discuss?" rows={4} />
                  <div className="flex gap-2">
                    <Button className="bg-black hover:bg-gray-800">Post Discussion</Button>
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.author.image || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {post.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                            {post.isTrending && <TrendingUp className="h-4 w-4 text-green-500" />}
                            <Link href={`/forum/${post.id}`} className="hover:underline">
                              <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                            </Link>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>By {post.author.name}</span>
                            <span>{post.lastActivity}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {post.replies}
                            </span>
                            <span>{post.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or browse different categories</p>
                  {session && (
                    <Button onClick={() => setShowNewPost(true)} className="bg-black hover:bg-gray-800">
                      Start the first discussion
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
