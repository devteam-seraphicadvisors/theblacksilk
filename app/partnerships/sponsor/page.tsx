import { generateMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PartnershipSidebar } from "@/components/partnership-sidebar"
import { Award, Users, Eye, TrendingUp, CheckCircle, Star, ArrowRight, Target, Megaphone, Network } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = generateMetadata({
  title: "Become A Sponsor - The Black Silk",
  description:
    "Support The Black Silk's mission and gain valuable brand visibility. Explore our sponsorship packages and benefits.",
  canonical: "https://theblacksilk.org/partnerships/sponsor",
})

const sponsorshipTiers = [
  {
    name: "Bronze Sponsor",
    price: "₹50,000",
    duration: "per year",
    color: "amber",
    popular: false,
    benefits: [
      "Logo on website footer",
      "Social media mentions (2/month)",
      "Newsletter inclusion (quarterly)",
      "Event program listing",
      "Certificate of partnership",
    ],
    features: ["Basic brand visibility", "Community recognition", "Networking opportunities"],
  },
  {
    name: "Silver Sponsor",
    price: "₹1,25,000",
    duration: "per year",
    color: "gray",
    popular: true,
    benefits: [
      "Logo on website header",
      "Social media mentions (4/month)",
      "Newsletter inclusion (monthly)",
      "Event program prominent listing",
      "Speaking opportunity (1/year)",
      "Complimentary event tickets (2)",
      "Quarterly impact report",
    ],
    features: ["Enhanced brand visibility", "Thought leadership platform", "Direct community engagement"],
  },
  {
    name: "Gold Sponsor",
    price: "₹2,50,000",
    duration: "per year",
    color: "yellow",
    popular: false,
    benefits: [
      "Premium logo placement",
      "Social media mentions (8/month)",
      "Newsletter inclusion (bi-weekly)",
      "Event program featured listing",
      "Speaking opportunities (2/year)",
      "Complimentary event tickets (5)",
      "Monthly impact report",
      "Co-branded content opportunities",
      "Advisory board invitation",
    ],
    features: ["Premium brand visibility", "Strategic partnership benefits", "Exclusive networking access"],
  },
  {
    name: "Platinum Sponsor",
    price: "₹5,00,000",
    duration: "per year",
    color: "purple",
    popular: false,
    benefits: [
      "Exclusive logo placement",
      "Social media mentions (12/month)",
      "Newsletter inclusion (weekly)",
      "Event program title sponsor",
      "Keynote speaking opportunities",
      "Complimentary event tickets (10)",
      "Weekly impact report",
      "Co-branded events",
      "Advisory board membership",
      "Custom partnership benefits",
    ],
    features: ["Maximum brand visibility", "Strategic partnership", "Exclusive benefits package"],
  },
]

const sponsorshipBenefits = [
  {
    icon: Eye,
    title: "Brand Visibility",
    description: "Gain exposure to our community of 5,000+ legal professionals, technologists, and policymakers",
  },
  {
    icon: Users,
    title: "Thought Leadership",
    description: "Position your organization as a thought leader in the legal technology space",
  },
  {
    icon: Network,
    title: "Networking Opportunities",
    description: "Connect with industry leaders, decision-makers, and potential clients",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Generate leads and business opportunities through our engaged community",
  },
  {
    icon: Target,
    title: "Targeted Audience",
    description: "Reach a highly targeted audience of legal and technology professionals",
  },
  {
    icon: Megaphone,
    title: "Content Amplification",
    description: "Amplify your content and messaging through our established channels",
  },
]

const currentSponsors = [
  {
    name: "LegalTech Solutions",
    tier: "Platinum",
    logo: "/images/sponsor-legaltech.jpg",
    testimonial:
      "Partnering with The Black Silk has significantly increased our brand visibility in the legal tech community.",
  },
  {
    name: "AI Legal Systems",
    tier: "Gold",
    logo: "/images/sponsor-ai-legal.jpg",
    testimonial: "The networking opportunities and thought leadership platform have been invaluable for our growth.",
  },
  {
    name: "Digital Law Firm",
    tier: "Silver",
    logo: "/images/sponsor-digital-law.jpg",
    testimonial: "Excellent ROI on our sponsorship investment. Highly recommend to other legal tech companies.",
  },
]

export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Award className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Sponsorship Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">Become A Sponsor</h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Support our mission to advance legal technology in India while gaining valuable brand visibility and
              connecting with industry leaders.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Sponsor The Black Silk?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsorshipBenefits.map((benefit, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Sponsorship Tiers */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Sponsorship Packages</h2>
                <p className="text-xl text-gray-600">
                  Choose the sponsorship level that best fits your goals and budget
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sponsorshipTiers.map((tier, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                      tier.popular ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className={`h-5 w-5 text-${tier.color}-500`} />
                        <CardTitle className="text-xl font-bold text-gray-900">{tier.name}</CardTitle>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {tier.price}
                        <span className="text-lg font-normal text-gray-600">/{tier.duration}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Benefits Included</h4>
                        <ul className="space-y-2">
                          {tier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className={`w-full ${tier.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                        asChild
                      >
                        <Link href="#sponsorship-form">
                          Choose {tier.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Current Sponsors */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Current Sponsors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentSponsors.map((sponsor, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image
                            src={sponsor.logo || "/placeholder.svg"}
                            alt={sponsor.name}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{sponsor.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {sponsor.tier} Sponsor
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{sponsor.testimonial}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Sponsorship Form */}
            <section id="sponsorship-form">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">Apply for Sponsorship</CardTitle>
                  <p className="text-gray-600 text-center">
                    Fill out the form below and we'll get in touch to discuss your sponsorship package
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                        <Input
                          placeholder="Enter your company name"
                          className="border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Sponsorship Tier *
                        </label>
                        <Select required>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500">
                            <SelectValue placeholder="Select sponsorship tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bronze">Bronze Sponsor - ₹50,000</SelectItem>
                            <SelectItem value="silver">Silver Sponsor - ₹1,25,000</SelectItem>
                            <SelectItem value="gold">Gold Sponsor - ₹2,50,000</SelectItem>
                            <SelectItem value="platinum">Platinum Sponsor - ₹5,00,000</SelectItem>
                            <SelectItem value="custom">Custom Package</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                        <Input
                          placeholder="Enter contact person's name"
                          className="border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          className="border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                        <Input
                          type="url"
                          placeholder="https://your-company.com"
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sponsorship Goals</label>
                      <Textarea
                        placeholder="Tell us about your sponsorship goals and what you hope to achieve..."
                        className="border-gray-300 focus:border-blue-500 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                      <Textarea
                        placeholder="Any specific requirements or custom benefits you'd like to discuss..."
                        className="border-gray-300 focus:border-blue-500 min-h-[80px]"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-black hover:bg-neutral-800 !text-white text-base py-3 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer">
                      Submit Sponsorship Application
                      <ArrowRight className="ml-2 h-4 w-4 !text-white" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      We'll review your application and get back to you within 3 business days.
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
