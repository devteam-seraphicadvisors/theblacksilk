import { generateMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard, Crown, Users, Zap } from "lucide-react"
import Link from "next/link"

export const metadata = generateMetadata({
  title: "Membership - The Black Silk",
  description:
    "Join The Black Silk community and access exclusive benefits, events, publications, and networking opportunities with legal and technology professionals.",
  canonical: "https://theblacksilk.org/community/membership",
})

const membershipTiers = [
  {
    name: "Student",
    price: "₹1,500",
    period: "/year",
    description: "Perfect for students and early-career professionals",
    features: [
      "Access to public events",
      "Newsletter subscription",
      "Basic forum access",
      "Student networking events",
      "Resource library access",
    ],
    popular: false,
    cta: "Choose Student",
    href: "/community/membership/payment?tier=student",
    priceValue: 1500,
    icon: Users,
  },
  {
    name: "Advocate (Up to 5 years)",
    price: "₹6,000",
    period: "/year",
    description: "For advocates with up to 5 years of experience",
    features: [
      "All Student benefits",
      "Premium event access",
      "Full publication library",
      "Committee participation",
      "Professional networking",
      "Monthly webinars",
      "Priority support",
    ],
    popular: false,
    cta: "Choose Advocate",
    href: "/community/membership/payment?tier=advocate-junior",
    priceValue: 6000,
    icon: Zap,
  },
  {
    name: "Government Employee / Law Professor",
    price: "₹6,500",
    period: "/year",
    description: "Special pricing for government employees and law professors",
    features: [
      "All Advocate benefits",
      "Academic resources",
      "Policy research access",
      "Government liaison programs",
      "Educational webinars",
      "Research collaboration",
    ],
    popular: false,
    cta: "Choose Government/Academic",
    href: "/community/membership/payment?tier=government-academic",
    priceValue: 6500,
    icon: Users,
  },
  {
    name: "In-house Counsel",
    price: "₹7,500",
    period: "/year",
    description: "For in-house legal professionals",
    features: [
      "All previous benefits",
      "Corporate legal resources",
      "Compliance updates",
      "Industry-specific content",
      "Executive briefings",
      "Corporate networking",
    ],
    popular: false,
    cta: "Choose In-house",
    href: "/community/membership/payment?tier=in-house",
    priceValue: 7500,
    icon: Zap,
  },
  {
    name: "Advocate (5+ years)",
    price: "₹8,500",
    period: "/year",
    description: "For experienced advocates with 5+ years of practice",
    features: [
      "All previous benefits",
      "Senior practitioner resources",
      "Mentorship opportunities",
      "Advanced legal tech training",
      "Leadership programs",
      "Expert panels access",
    ],
    popular: true,
    cta: "Choose Senior Advocate",
    href: "/community/membership/payment?tier=advocate-senior",
    priceValue: 8500,
    icon: Crown,
  },
  {
    name: "Non-lawyer Professional",
    price: "₹11,000",
    period: "/year",
    description: "For technology and business professionals",
    features: [
      "All core benefits",
      "Tech-focused content",
      "Cross-industry networking",
      "Innovation workshops",
      "Startup legal guidance",
      "Technology law updates",
    ],
    popular: false,
    cta: "Choose Professional",
    href: "/community/membership/payment?tier=non-lawyer",
    priceValue: 11000,
    icon: Zap,
  },
]

const corporateTiers = [
  {
    name: "Company (Up to 10 Members)",
    price: "₹55,000",
    period: "/year",
    description: "For small to medium companies",
    features: [
      "Up to 10 member accounts",
      "Corporate dashboard",
      "Team management tools",
      "Bulk event registrations",
      "Corporate resources",
      "Dedicated support",
    ],
    cta: "Choose Company",
    href: "/community/membership/payment?tier=company-small",
    priceValue: 55000,
  },
  {
    name: "Law Firm (Up to 10 Members)",
    price: "₹75,000",
    period: "/year",
    description: "For small to medium law firms",
    features: [
      "Up to 10 lawyer accounts",
      "Firm-wide resources",
      "Practice management tools",
      "Client development resources",
      "Firm branding opportunities",
      "Priority support",
    ],
    cta: "Choose Law Firm",
    href: "/community/membership/payment?tier=law-firm-small",
    priceValue: 75000,
  },
  {
    name: "Company (11-20 Members)",
    price: "₹90,000",
    period: "/year",
    description: "For medium to large companies",
    features: [
      "Up to 20 member accounts",
      "Advanced analytics",
      "Custom training programs",
      "Executive briefings",
      "Partnership opportunities",
      "Account manager",
    ],
    cta: "Choose Large Company",
    href: "/community/membership/payment?tier=company-medium",
    priceValue: 90000,
  },
  {
    name: "Law Firm (11-20 Members)",
    price: "₹125,000",
    period: "/year",
    description: "For medium to large law firms",
    features: [
      "Up to 20 lawyer accounts",
      "Premium firm resources",
      "Advanced practice tools",
      "Market intelligence",
      "Thought leadership platform",
      "Dedicated account manager",
    ],
    cta: "Choose Large Law Firm",
    href: "/community/membership/payment?tier=law-firm-medium",
    priceValue: 125000,
  },
]

const benefits = [
  {
    title: "Exclusive Events",
    description: "Access to premium symposiums, workshops, and networking events with industry leaders",
  },
  {
    title: "Research Library",
    description: "Comprehensive collection of research papers, white papers, and policy briefs",
  },
  {
    title: "Committee Participation",
    description: "Join specialized committees working on cutting-edge legal and technology issues",
  },
  {
    title: "Professional Network",
    description: "Connect with leading professionals across law, technology, and policy sectors",
  },
  {
    title: "Thought Leadership",
    description: "Contribute to publications and share your expertise with the community",
  },
  {
    title: "Career Opportunities",
    description: "Access to exclusive job postings and career advancement opportunities",
  },
]

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Crown className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">Premium Membership Plans</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Join Our Community</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Become part of India's premier platform for legal technology and policy professionals
            </p>
          </div>
        </div>
      </section>

      {/* Individual Membership Tiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Individual Memberships</h2>
              <p className="text-lg text-gray-600">Choose the plan that best fits your professional profile</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {membershipTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    tier.popular ? "ring-2 ring-gray-900" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gray-900 text-white px-4 py-2 shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 bg-gradient-to-br from-gray-50 to-white">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold mb-2 text-gray-900">
                      {tier.price}
                      <span className="text-lg font-normal text-gray-500">{tier.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{tier.description}</p>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl py-3 font-semibold ${
                        tier.popular
                          ? "bg-gray-900 hover:bg-black text-white"
                          : "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                      }`}
                      asChild
                    >
                      <Link href={tier.href}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        {tier.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Membership Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Corporate Memberships</h2>
              <p className="text-lg text-gray-600">Team plans for organizations and law firms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {corporateTiers.map((tier, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="text-center pb-4 bg-gradient-to-br from-gray-50 to-white">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold mb-2 text-gray-900">
                      {tier.price}
                      <span className="text-lg font-normal text-gray-500">{tier.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{tier.description}</p>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl py-3 font-semibold"
                      asChild
                    >
                      <Link href={tier.href}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        {tier.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Membership Benefits</h2>
              <p className="text-lg text-gray-600">Unlock exclusive opportunities and resources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg text-center bg-white rounded-2xl hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Join?</h2>
            <p className="text-xl mb-10 text-gray-300 leading-relaxed">
              Start your journey with The Black Silk community today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8 py-3 font-semibold"
                asChild
              >
                <Link href="/community/membership/payment?tier=advocate-senior">Start Professional Membership</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 rounded-xl px-8 py-3 font-semibold transition-all duration-200"
                asChild
              >
                <Link href="/get-involved/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
