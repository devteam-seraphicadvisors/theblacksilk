import { generateMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PartnershipSidebar } from "@/components/partnership-sidebar"
import {
  Globe,
  Crown,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  Target,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = generateMetadata({
  title: "Global Sponsor - The Black Silk",
  description:
    "Become our premier global partner with exclusive benefits and maximum brand visibility across all our initiatives.",
  canonical: "https://theblacksilk.org/partnerships/global-sponsor",
})

const globalBenefits = [
  {
    icon: Crown,
    title: "Exclusive Partnership Status",
    description: "Become our sole global partner with exclusive rights and recognition across all platforms",
  },
  {
    icon: Globe,
    title: "International Visibility",
    description: "Global brand exposure across our international network and partnerships",
  },
  {
    icon: Award,
    title: "Thought Leadership Platform",
    description: "Position your organization as the leading voice in legal technology innovation",
  },
  {
    icon: Users,
    title: "Executive Access",
    description: "Direct access to our executive team and advisory board for strategic collaboration",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Exclusive access to market research, trends, and industry insights",
  },
  {
    icon: Target,
    title: "Custom Solutions",
    description: "Tailored partnership benefits designed specifically for your business objectives",
  },
]

const packageIncludes = [
  {
    category: "Brand Visibility",
    benefits: [
      "Exclusive logo placement on all digital and physical materials",
      "Co-branding opportunities across all initiatives",
      "Dedicated partnership announcement and press release",
      "Featured placement in all marketing campaigns",
      "Custom branded content series",
      "Social media campaign co-creation",
    ],
  },
  {
    category: "Event Benefits",
    benefits: [
      "Title sponsorship rights for all major events",
      "Keynote speaking opportunities at every conference",
      "VIP networking dinner hosting rights",
      "Unlimited complimentary event tickets",
      "Custom exhibition space at all events",
      "Post-event attendee data and analytics",
    ],
  },
  {
    category: "Content & Media",
    benefits: [
      "Monthly featured articles and thought leadership pieces",
      "Podcast series co-hosting opportunities",
      "Webinar series partnership",
      "Newsletter dedicated sections",
      "Research report co-authoring",
      "Media interview opportunities",
    ],
  },
  {
    category: "Strategic Partnership",
    benefits: [
      "Quarterly strategic planning sessions",
      "Advisory board membership",
      "Product development collaboration",
      "Market expansion support",
      "Custom research and insights",
      "Executive mentorship programs",
    ],
  },
]

const successMetrics = [
  {
    metric: "Brand Reach",
    value: "50,000+",
    description: "Monthly impressions across all channels",
  },
  {
    metric: "Event Attendance",
    value: "2,000+",
    description: "Annual event participants",
  },
  {
    metric: "Media Coverage",
    value: "100+",
    description: "Annual media mentions and features",
  },
  {
    metric: "Network Growth",
    value: "25%",
    description: "Year-over-year community expansion",
  },
]

const currentGlobalPartner = {
  name: "TechLegal Global",
  since: "2023",
  testimonial:
    "Our global partnership with The Black Silk has transformed our market presence in India. The exclusive benefits and strategic collaboration have exceeded our expectations, resulting in 300% growth in brand recognition and significant business opportunities.",
  results: [
    "300% increase in brand recognition",
    "150+ qualified leads generated",
    "25 strategic partnerships formed",
    "₹2.5 Cr in attributed revenue",
  ],
  logo: "/images/partner-techlegal-global.jpg",
}

export default function GlobalSponsorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Crown className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Exclusive Partnership</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">Global Sponsor</h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-8">
              Become our premier global partner and gain exclusive access to India's most influential legal technology
              community with unparalleled benefits and strategic collaboration opportunities.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Badge className="bg-white text-black border border-white px-3 py-1 rounded-none font-mono text-xs uppercase tracking-wider">
                <Star className="h-3.5 w-3.5 mr-1.5 text-black" />
                Premier Tier
              </Badge>
              <Badge className="bg-neutral-900 text-neutral-300 border border-neutral-700 px-3 py-1 rounded-none font-mono text-xs uppercase tracking-wider">
                <Shield className="h-3.5 w-3.5 mr-1.5 text-white" />
                Limited Partnership
              </Badge>
            </div>
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
            {/* Partnership Overview */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Global Sponsorship?</h2>
                <p className="text-xl text-gray-600">
                  Exclusive partnership benefits designed for maximum impact and strategic value
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {globalBenefits.map((benefit, index) => (
                  <Card key={index} className="border border-neutral-200 shadow-none hover:border-black transition-all duration-300 rounded-none bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-black rounded-none flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-serif text-black mb-2">{benefit.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Success Metrics */}
            <section className="bg-neutral-50 rounded-none p-8 border border-neutral-200">
              <h2 className="text-2xl font-serif text-black mb-8 text-center">Partnership Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {successMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-mono font-bold text-black mb-1">{metric.value}</div>
                    <div className="text-sm font-semibold text-neutral-900 mb-1">{metric.metric}</div>
                    <div className="text-xs text-neutral-500">{metric.description}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Package Details */}
            <section>
              <h2 className="text-3xl font-serif text-black mb-8">Global Sponsorship Package</h2>
              <div className="space-y-6">
                {packageIncludes.map((section, index) => (
                  <Card key={index} className="border border-neutral-200 shadow-none rounded-none bg-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-serif text-black flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        {section.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Current Global Partner */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Global Partner Success Story</h2>
              <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                      <Image
                        src={currentGlobalPartner.logo || "/placeholder.svg"}
                        alt={currentGlobalPartner.name}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentGlobalPartner.name}</h3>
                      <Badge className="bg-purple-600 text-white">
                        Global Partner since {currentGlobalPartner.since}
                      </Badge>
                    </div>
                  </div>

                  <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    "{currentGlobalPartner.testimonial}"
                  </blockquote>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentGlobalPartner.results.map((result, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">{result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Investment & Application */}
            <section>
              <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-purple-900 text-white">
                <CardContent className="p-8 text-center">
                  <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold mb-4">Global Sponsorship Investment</h2>
                  <div className="text-5xl font-bold mb-2">₹25,00,000</div>
                  <p className="text-xl text-gray-300 mb-6">Annual Partnership Investment</p>

                  <div className="bg-white/10 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Exclusive global partnership status</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>All event title sponsorships</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Strategic advisory board seat</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Custom partnership benefits</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4" asChild>
                    <Link href="#application-form">
                      Apply for Global Partnership
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-300 mt-4">
                    Limited to one exclusive partner. Application review process required.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Application Form */}
            <section id="application-form">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                    Global Partnership Application
                  </CardTitle>
                  <p className="text-gray-600 text-center">
                    Apply for our exclusive global partnership. We'll review your application and schedule a strategic
                    discussion.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select company size</option>
                          <option value="startup">Startup (1-50 employees)</option>
                          <option value="medium">Medium (51-500 employees)</option>
                          <option value="large">Large (501-2000 employees)</option>
                          <option value="enterprise">Enterprise (2000+ employees)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CEO/Decision Maker Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter CEO or decision maker's name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue Range *</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        >
                          <option value="">Select revenue range</option>
                          <option value="10-50cr">₹10-50 Crores</option>
                          <option value="50-100cr">₹50-100 Crores</option>
                          <option value="100-500cr">₹100-500 Crores</option>
                          <option value="500cr+">₹500+ Crores</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Strategic Partnership Goals *
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        rows={4}
                        placeholder="Describe your strategic goals for this global partnership..."
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Previous Partnership Experience
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        rows={3}
                        placeholder="Describe any previous strategic partnerships or sponsorships..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Readiness *</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                      >
                        <option value="">Select investment readiness</option>
                        <option value="immediate">Ready to invest immediately</option>
                        <option value="30-days">Ready within 30 days</option>
                        <option value="60-days">Ready within 60 days</option>
                        <option value="exploring">Currently exploring options</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-black hover:bg-neutral-800 !text-white text-base py-3 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Submit Global Partnership Application
                      <ArrowRight className="ml-2 h-4 w-4 !text-white" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      Applications are reviewed by our executive team. We'll contact qualified candidates within 5
                      business days to schedule a strategic partnership discussion.
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
