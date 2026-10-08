import { generateMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PartnershipSidebar } from "@/components/partnership-sidebar"
import { Calendar, Users, CheckCircle, ArrowRight, MapPin, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = generateMetadata({
  title: "Conference Sponsorship - The Black Silk",
  description:
    "Sponsor our flagship legal technology conferences and events. Gain maximum exposure to industry leaders and decision-makers.",
  canonical: "https://theblacksilk.org/partnerships/conference-sponsorship",
})

const upcomingEvents = [
  {
    name: "Legal Tech Summit 2024",
    date: "March 15-16, 2024",
    location: "New Delhi",
    attendees: "500+",
    type: "Flagship Conference",
    image: "/images/event-summit-2024.jpg",
    description:
      "India's premier legal technology conference bringing together industry leaders, innovators, and decision-makers.",
    sponsorshipDeadline: "February 15, 2024",
  },
  {
    name: "AI in Legal Practice Workshop",
    date: "April 20, 2024",
    location: "Mumbai",
    attendees: "200+",
    type: "Workshop",
    image: "/images/event-ai-workshop.jpg",
    description: "Intensive workshop on implementing AI solutions in legal practice.",
    sponsorshipDeadline: "March 20, 2024",
  },
  {
    name: "Digital Courts Symposium",
    date: "May 10-11, 2024",
    location: "Bangalore",
    attendees: "300+",
    type: "Symposium",
    image: "/images/event-digital-courts.jpg",
    description: "Exploring the future of digital transformation in Indian judiciary.",
    sponsorshipDeadline: "April 10, 2024",
  },
]

const sponsorshipPackages = [
  {
    name: "Title Sponsor",
    price: "₹10,00,000",
    color: "purple",
    exclusive: true,
    benefits: [
      "Event naming rights",
      "Logo on all marketing materials",
      "Opening keynote opportunity",
      "Premium booth space (6x6m)",
      "20 complimentary tickets",
      "VIP networking dinner hosting",
      "Post-event attendee list",
      "Social media campaign inclusion",
      "Press release co-branding",
    ],
  },
  {
    name: "Platinum Sponsor",
    price: "₹5,00,000",
    color: "gray",
    exclusive: false,
    benefits: [
      "Logo on stage backdrop",
      "Speaking opportunity (30 mins)",
      "Premium booth space (4x4m)",
      "10 complimentary tickets",
      "Networking lunch sponsorship",
      "Conference app advertisement",
      "Email marketing inclusion",
      "Welcome kit insert",
    ],
  },
  {
    name: "Gold Sponsor",
    price: "₹2,50,000",
    color: "yellow",
    exclusive: false,
    benefits: [
      "Logo on conference materials",
      "Panel discussion participation",
      "Standard booth space (3x3m)",
      "5 complimentary tickets",
      "Coffee break sponsorship",
      "Conference bag insert",
      "Social media mentions",
    ],
  },
  {
    name: "Silver Sponsor",
    price: "₹1,25,000",
    color: "gray",
    exclusive: false,
    benefits: [
      "Logo on website and signage",
      "Exhibition space (2x2m)",
      "3 complimentary tickets",
      "Networking session access",
      "Conference program listing",
      "Digital marketing inclusion",
    ],
  },
]

const additionalOpportunities = [
  {
    name: "Keynote Sponsorship",
    price: "₹2,00,000",
    description: "Sponsor a keynote session and introduce the speaker",
  },
  {
    name: "Networking Dinner",
    price: "₹3,00,000",
    description: "Host the exclusive networking dinner for VIP attendees",
  },
  {
    name: "Workshop Sponsorship",
    price: "₹1,50,000",
    description: "Sponsor a specialized workshop session",
  },
  {
    name: "Digital Lounge",
    price: "₹1,00,000",
    description: "Sponsor the digital networking and charging lounge",
  },
]

export default function ConferenceSponsorshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Calendar className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Event Partnerships</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">Conference Sponsorship</h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Sponsor our flagship conferences and events to gain maximum exposure to legal technology leaders,
              decision-makers, and innovators across India.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PartnershipSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Upcoming Events */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="relative h-48 md:h-full">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.name}
                            fill
                            className="object-cover rounded-l-lg"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-blue-600 text-white">{event.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.attendees} attendees</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Deadline: {event.sponsorshipDeadline}</span>
                          </div>
                        </div>

                        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href="#sponsorship-packages">
                            View Sponsorship Options
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Sponsorship Packages */}
            <section id="sponsorship-packages">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Sponsorship Packages</h2>
                <p className="text-xl text-gray-600">Choose the sponsorship level that maximizes your event ROI</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sponsorshipPackages.map((pkg, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                      pkg.exclusive ? "ring-2 ring-purple-500" : ""
                    }`}
                  >
                    {pkg.exclusive && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600 text-white px-4 py-1">Exclusive</Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className={`h-5 w-5 text-${pkg.color}-500`} />
                        <CardTitle className="text-xl font-bold text-gray-900">{pkg.name}</CardTitle>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{pkg.price}</div>
                      <p className="text-sm text-gray-600">per event</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${pkg.exclusive ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-900 hover:bg-gray-800"}`}
                        asChild
                      >
                        <Link href="#contact-form">
                          Select {pkg.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Additional Opportunities */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Sponsorship Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalOpportunities.map((opportunity, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">{opportunity.price}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link href="#contact-form">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Contact Form */}
            <section id="contact-form">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                    Conference Sponsorship Inquiry
                  </CardTitle>
                  <p className="text-gray-600 text-center">
                    Interested in sponsoring our events? Let's discuss the perfect package for your goals.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event of Interest *</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select an event</option>
                          <option value="legal-tech-summit">Legal Tech Summit 2024</option>
                          <option value="ai-workshop">AI in Legal Practice Workshop</option>
                          <option value="digital-courts">Digital Courts Symposium</option>
                          <option value="all-events">All Events</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter contact person's name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Sponsorship Package
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select a package</option>
                        <option value="title">Title Sponsor - ₹10,00,000</option>
                        <option value="platinum">Platinum Sponsor - ₹5,00,000</option>
                        <option value="gold">Gold Sponsor - ₹2,50,000</option>
                        <option value="silver">Silver Sponsor - ₹1,25,000</option>
                        <option value="custom">Custom Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sponsorship Goals & Requirements
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        placeholder="Tell us about your sponsorship goals and any specific requirements..."
                      ></textarea>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-black hover:bg-neutral-800 !text-white text-base py-3 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer">
                      Submit Sponsorship Inquiry
                      <ArrowRight className="ml-2 h-4 w-4 !text-white" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      We'll respond within 24 hours with detailed sponsorship information and next steps.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
