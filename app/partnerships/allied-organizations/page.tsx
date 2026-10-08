import { generateMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PartnershipSidebar } from "@/components/partnership-sidebar"
import { Building2, Users, CheckCircle, ArrowRight, Award, Network, Target, BookOpen, Calendar } from "lucide-react"
import Image from "next/image"

export const metadata = generateMetadata({
  title: "Allied Organizations - The Black Silk",
  description:
    "Join our network of allied organizations and collaborate with leading institutions in legal technology advancement.",
  canonical: "https://theblacksilk.org/partnerships/allied-organizations",
})

const alliedBenefits = [
  {
    icon: Network,
    title: "Collaborative Network",
    description: "Join a prestigious network of organizations working together to advance legal technology",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description: "Access to shared research, best practices, and industry insights",
  },
  {
    icon: Calendar,
    title: "Joint Events",
    description: "Collaborate on conferences, workshops, and educational programs",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Official recognition as an allied organization with certificate and branding rights",
  },
  {
    icon: Users,
    title: "Member Exchange",
    description: "Cross-promotion opportunities and member exchange programs",
  },
  {
    icon: Target,
    title: "Shared Goals",
    description: "Work together towards common objectives in legal technology advancement",
  },
]

const organizationTypes = [
  {
    type: "Legal Associations",
    description: "Bar associations, legal societies, and professional legal organizations",
    examples: ["State Bar Councils", "Legal Aid Organizations", "Judicial Academies"],
    benefits: [
      "Joint continuing education programs",
      "Shared legal technology training",
      "Collaborative policy advocacy",
      "Member networking opportunities",
    ],
  },
  {
    type: "Academic Institutions",
    description: "Law schools, universities, and research institutions",
    examples: ["National Law Universities", "Legal Research Centers", "Technology Institutes"],
    benefits: [
      "Student exchange programs",
      "Joint research initiatives",
      "Faculty collaboration",
      "Curriculum development support",
    ],
  },
  {
    type: "Technology Organizations",
    description: "Tech companies, startups, and innovation hubs focused on legal technology",
    examples: ["LegalTech Startups", "Innovation Labs", "Tech Accelerators"],
    benefits: [
      "Product development collaboration",
      "Market validation support",
      "Technology showcase opportunities",
      "Investor network access",
    ],
  },
  {
    type: "Government Bodies",
    description: "Government departments, regulatory bodies, and public institutions",
    examples: ["Ministry of Law & Justice", "Regulatory Authorities", "Court Systems"],
    benefits: [
      "Policy development collaboration",
      "Digital transformation support",
      "Training and capacity building",
      "Best practices sharing",
    ],
  },
]

const currentAllies = [
  {
    name: "National Law School of India University",
    type: "Academic Institution",
    since: "2022",
    logo: "/images/ally-nlsiu.jpg",
    collaboration: "Joint research on AI in legal education and student exchange programs",
    achievements: [
      "5 joint research papers published",
      "50+ students participated in exchange",
      "3 collaborative conferences organized",
    ],
  },
  {
    name: "Delhi High Court",
    type: "Government Body",
    since: "2023",
    logo: "/images/ally-delhi-hc.jpg",
    collaboration: "Digital courts implementation and judicial training programs",
    achievements: [
      "Digital case management system deployed",
      "200+ judges trained on legal tech",
      "40% reduction in case processing time",
    ],
  },
  {
    name: "LegalTech India Association",
    type: "Technology Organization",
    since: "2021",
    logo: "/images/ally-legaltech-india.jpg",
    collaboration: "Industry advocacy and startup ecosystem development",
    achievements: [
      "25 startups supported through programs",
      "₹50 Cr in funding facilitated",
      "3 policy recommendations adopted",
    ],
  },
  {
    name: "Bar Council of Maharashtra",
    type: "Legal Association",
    since: "2022",
    logo: "/images/ally-bcm.jpg",
    collaboration: "Continuing legal education and technology adoption programs",
    achievements: [
      "1000+ lawyers trained on legal tech",
      "15 CLE programs conducted",
      "Digital practice adoption increased by 60%",
    ],
  },
]

const collaborationAreas = [
  {
    area: "Research & Development",
    description: "Joint research projects on legal technology innovation and policy development",
    activities: [
      "Collaborative research papers",
      "Policy white papers",
      "Technology impact studies",
      "Best practices documentation",
    ],
  },
  {
    area: "Education & Training",
    description: "Shared educational programs and professional development initiatives",
    activities: [
      "Joint certification programs",
      "Faculty exchange programs",
      "Student internship opportunities",
      "Continuing education courses",
    ],
  },
  {
    area: "Events & Conferences",
    description: "Co-hosted events, conferences, and networking opportunities",
    activities: [
      "Annual joint conferences",
      "Specialized workshops",
      "Networking events",
      "Awards and recognition programs",
    ],
  },
  {
    area: "Advocacy & Policy",
    description: "Collaborative advocacy for legal technology advancement and policy reform",
    activities: [
      "Policy position papers",
      "Government consultations",
      "Industry standards development",
      "Regulatory framework advocacy",
    ],
  },
]

export default function AlliedOrganizationsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Building2 className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Institutional Alliance</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">Allied Organizations</h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Join our network of leading organizations committed to advancing legal technology in India. Collaborate,
              share knowledge, and drive innovation together.
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
            {/* Benefits Overview */}
            <section>
              <h2 className="text-3xl font-serif text-black mb-8">Benefits of Allied Partnership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alliedBenefits.map((benefit, index) => (
                  <Card key={index} className="border border-neutral-200 shadow-none hover:border-black transition-all duration-300 rounded-none bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-black rounded-none flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Organization Types */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Types of Allied Organizations</h2>
              <div className="space-y-6">
                {organizationTypes.map((orgType, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        {orgType.type}
                      </CardTitle>
                      <p className="text-gray-600">{orgType.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Examples</h4>
                          <ul className="space-y-2">
                            {orgType.examples.map((example, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Collaboration Benefits</h4>
                          <ul className="space-y-2">
                            {orgType.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Current Allied Organizations */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Current Allied Organizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentAllies.map((ally, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image
                            src={ally.logo || "/placeholder.svg"}
                            alt={ally.name}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{ally.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {ally.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Since {ally.since}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{ally.collaboration}</p>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Achievements</h4>
                        <ul className="space-y-1">
                          {ally.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Collaboration Areas */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Collaboration Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaborationAreas.map((area, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-900">{area.area}</CardTitle>
                      <p className="text-gray-600 text-sm">{area.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <ArrowRight className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Application Form */}
            <section>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                    Apply to Become an Allied Organization
                  </CardTitle>
                  <p className="text-gray-600 text-center">
                    Join our network of leading organizations advancing legal technology in India
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter organization name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type *</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select organization type</option>
                          <option value="legal-association">Legal Association</option>
                          <option value="academic">Academic Institution</option>
                          <option value="technology">Technology Organization</option>
                          <option value="government">Government Body</option>
                          <option value="other">Other</option>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position/Title *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter position or title"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Website</label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://your-organization.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Description *</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        placeholder="Describe your organization, its mission, and activities..."
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Interests *</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        placeholder="Describe how you would like to collaborate with The Black Silk..."
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous Partnerships</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Describe any previous partnerships or collaborations..."
                      ></textarea>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-black hover:bg-neutral-800 !text-white text-base py-3 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer">
                      Submit Allied Organization Application
                      <ArrowRight className="ml-2 h-4 w-4 !text-white" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      We'll review your application and get back to you within 7 business days to discuss next steps.
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
