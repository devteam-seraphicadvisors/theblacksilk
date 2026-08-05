import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"
import Link from "next/link"

export function LatestContent() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">Latest Insights & Events</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest research, discussions, and community events
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Latest Blog Posts */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 tracking-wide">Recent Publications</h3>
            <div className="space-y-6">
              {[
                {
                  title: "AI Governance Framework for Indian Legal System",
                  excerpt:
                    "Exploring the regulatory challenges and opportunities in implementing AI within India's judicial processes.",
                  date: "Dec 15, 2024",
                  category: "Policy",
                  readTime: "8 min read",
                },
                {
                  title: "Blockchain in Legal Documentation: A Comprehensive Analysis",
                  excerpt:
                    "How distributed ledger technology is transforming legal document management and verification.",
                  date: "Dec 10, 2024",
                  category: "Technology",
                  readTime: "12 min read",
                },
                {
                  title: "Data Privacy Laws: Global Perspectives and Local Implementation",
                  excerpt:
                    "Comparative study of data protection regulations across jurisdictions and their impact on Indian businesses.",
                  date: "Dec 5, 2024",
                  category: "Privacy",
                  readTime: "10 min read",
                },
              ].map((post, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 leading-tight">{post.title}</h4>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Button variant="ghost" className="p-0 h-auto text-black hover:text-gray-600">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/blogs">View All Publications</Link>
              </Button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 tracking-wide">Upcoming Events</h3>
            <div className="space-y-6">
              {[
                {
                  title: "Digital Rights & Privacy Symposium",
                  description:
                    "A comprehensive discussion on digital rights, privacy laws, and their implementation in the Indian context.",
                  date: "Jan 20, 2025",
                  time: "2:00 PM - 5:00 PM IST",
                  attendees: "150+ Expected",
                  type: "Symposium",
                },
                {
                  title: "AI Ethics in Legal Practice Workshop",
                  description:
                    "Hands-on workshop exploring ethical considerations when implementing AI tools in legal practice.",
                  date: "Jan 25, 2025",
                  time: "10:00 AM - 4:00 PM IST",
                  attendees: "50 Participants",
                  type: "Workshop",
                },
              ].map((event, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-100 text-green-800 text-xs">{event.type}</Badge>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 leading-tight">{event.title}</h4>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800">Register Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
