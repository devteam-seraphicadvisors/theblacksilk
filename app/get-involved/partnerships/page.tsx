import { generateMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Handshake,
  Building,
  GraduationCap,
  Globe,
  Users,
  Target,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = generateMetadata({
  title: "Partnerships - The Black Silk",
  description:
    "Partner with The Black Silk to advance legal technology innovation. Explore collaboration opportunities for organizations, institutions, and businesses.",
  canonical: "https://theblacksilk.org/get-involved/partnerships",
});

const partnershipTypes = [
  {
    id: 1,
    title: "Corporate Partnerships",
    description:
      "Collaborate with us on legal technology initiatives, research projects, and innovation programs.",
    icon: Building,
    color: "navy",
    benefits: [
      "Access to legal tech expertise and insights",
      "Collaboration on research and development",
      "Brand visibility in legal tech community",
      "Networking opportunities with industry leaders",
    ],
    examples: [
      "Joint research on AI in legal practice",
      "Technology pilot programs",
      "Industry white papers and reports",
      "Conference sponsorships and speaking opportunities",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Academic Partnerships",
    description:
      "Partner with educational institutions to advance legal technology education and research.",
    icon: GraduationCap,
    color: "emerald",
    benefits: [
      "Curriculum development collaboration",
      "Student internship and placement programs",
      "Joint research publications",
      "Faculty exchange programs",
    ],
    examples: [
      "Legal tech curriculum development",
      "Student research projects",
      "Academic conferences and symposiums",
      "Scholarship programs",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Government Partnerships",
    description:
      "Work with government agencies to develop policies and implement legal technology solutions.",
    icon: Globe,
    color: "gold",
    benefits: [
      "Policy development consultation",
      "Digital transformation support",
      "Training and capacity building",
      "Best practices sharing",
    ],
    examples: [
      "Digital courts implementation",
      "Legal tech policy frameworks",
      "Judicial training programs",
      "E-governance initiatives",
    ],
    featured: false,
  },
  {
    id: 4,
    title: "Technology Partnerships",
    description:
      "Collaborate with technology companies to develop innovative legal solutions.",
    icon: Target,
    color: "navy",
    benefits: [
      "Product development collaboration",
      "Technical expertise sharing",
      "Market validation and testing",
      "Go-to-market strategy support",
    ],
    examples: [
      "Legal AI tool development",
      "Blockchain legal applications",
      "Legal analytics platforms",
      "Integration partnerships",
    ],
    featured: false,
  },
];

const currentPartners = [
  {
    name: "Supreme Court of India",
    type: "Government",
    description:
      "Collaborating on digital transformation initiatives for the Indian judiciary",
    logo: "/images/partner-supreme-court.jpg",
    partnership: "Digital Courts Initiative",
  },
  {
    name: "Indian Institute of Technology",
    type: "Academic",
    description:
      "Joint research on AI applications in legal practice and policy development",
    logo: "/images/partner-iit.jpg",
    partnership: "AI Legal Research Program",
  },
  {
    name: "LegalTech Innovations Pvt Ltd",
    type: "Corporate",
    description:
      "Developing next-generation legal technology solutions for Indian market",
    logo: "/images/partner-legaltech.jpg",
    partnership: "Innovation Lab",
  },
  {
    name: "Bar Council of India",
    type: "Professional",
    description:
      "Training and capacity building programs for legal professionals",
    logo: "/images/partner-bar-council.jpg",
    partnership: "Professional Development",
  },
];

const partnershipBenefits = [
  {
    icon: Users,
    title: "Expert Network Access",
    description:
      "Connect with leading experts in law, technology, and policy across India and globally",
  },
  {
    icon: Award,
    title: "Thought Leadership",
    description:
      "Position your organization as a thought leader in the legal technology space",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Gain valuable insights into legal technology trends and market opportunities",
  },
  {
    icon: Target,
    title: "Impact Amplification",
    description:
      "Amplify your impact through collaborative initiatives and shared resources",
  },
];

const partnershipStats = [
  { label: "Active Partners", value: "25+", icon: Handshake },
  { label: "Joint Projects", value: "40+", icon: Target },
  { label: "Research Papers", value: "15+", icon: Award },
  { label: "Events Organized", value: "30+", icon: Users },
];

const successStories = [
  {
    title: "Digital Courts Transformation",
    partner: "Supreme Court of India",
    description:
      "Successfully implemented AI-powered case management system across 50+ courts, reducing case processing time by 40%.",
    impact: "40% faster case processing",
    image: "/images/success-digital-courts.jpg",
  },
  {
    title: "Legal AI Ethics Framework",
    partner: "IIT Delhi",
    description:
      "Developed comprehensive ethical guidelines for AI implementation in legal practice, adopted by multiple law firms.",
    impact: "Industry-wide adoption",
    image: "/images/success-ai-ethics.jpg",
  },
  {
    title: "Blockchain Legal Documentation",
    partner: "LegalTech Innovations",
    description:
      "Created blockchain-based legal documentation platform, ensuring tamper-proof contracts and agreements.",
    impact: "99.9% document integrity",
    image: "/images/success-blockchain-docs.jpg",
  },
];

export default function PartnershipsPage() {
  const featuredPartnerships = partnershipTypes.filter((type) => type.featured);
  const regularPartnerships = partnershipTypes.filter((type) => !type.featured);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Handshake className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Collaborate with Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Partnerships
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Join forces with us to advance legal technology innovation and
              transform the future of legal practice in India
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-16 bg-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {partnershipStats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-brand text-center group hover:shadow-brand-lg transition-all duration-300 interactive-lift"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 gradient-navy rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-text-secondary">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partnership Types */}
      <section className="py-24 gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-text-primary mb-6">
                Partnership Opportunities
              </h2>
              <p className="text-xl text-text-secondary">
                Explore different ways to collaborate with us and make a
                meaningful impact
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredPartnerships.map((partnership) => (
                <Card
                  key={partnership.id}
                  className="border-0 shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 group interactive-lift"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 gradient-${partnership.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <partnership.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Badge className="bg-brand-gold-600 text-white mb-2">
                          Featured
                        </Badge>
                        <CardTitle className="text-xl font-heading text-text-primary group-hover:text-gray-900 transition-colors">
                          {partnership.title}
                        </CardTitle>
                      </div>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {partnership.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-text-secondary mb-3">
                        Partnership Benefits
                      </h4>
                      <ul className="space-y-2">
                        {partnership.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="text-sm text-text-secondary flex items-start"
                          >
                            <CheckCircle className="h-4 w-4 text-brand-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-text-secondary mb-3">
                        Collaboration Examples
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {partnership.examples.slice(0, 3).map((example) => (
                          <Badge
                            key={example}
                            variant="outline"
                            className="text-xs"
                          >
                            {example}
                          </Badge>
                        ))}
                        {partnership.examples.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{partnership.examples.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-black hover:bg-gray-800"
                      asChild
                    >
                      <Link href="#partnership-form">
                        Explore Partnership
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Regular Partnership Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularPartnerships.map((partnership) => (
                <Card
                  key={partnership.id}
                  className="border-0 shadow-brand hover:shadow-brand-lg transition-all duration-500 group interactive-lift"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 gradient-${partnership.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <partnership.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-heading text-text-primary group-hover:text-gray-900 transition-colors">
                        {partnership.title}
                      </h3>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">
                      {partnership.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-text-secondary mb-2">
                        Key Benefits
                      </h4>
                      <ul className="space-y-1">
                        {partnership.benefits
                          .slice(0, 2)
                          .map((benefit, index) => (
                            <li
                              key={index}
                              className="text-xs text-text-secondary flex items-start"
                            >
                              <div className="w-1 h-1 bg-brand-emerald-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="#partnership-form">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-24 bg-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-text-primary mb-6">
                Our Partners
              </h2>
              <p className="text-xl text-text-secondary">
                We're proud to collaborate with leading organizations across
                various sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentPartners.map((partner, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-brand hover:shadow-brand-lg transition-all duration-500 overflow-hidden group interactive-lift"
                >
                  <div className="relative h-32 overflow-hidden bg-surface-tertiary">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="text-xs bg-white/90">
                        {partner.type}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading text-text-primary mb-2 group-hover:text-gray-900 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                      {partner.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {partner.partnership}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 gradient-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-text-primary mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-text-secondary">
                Discover the impact of our collaborative partnerships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-brand hover:shadow-brand-lg transition-all duration-500 overflow-hidden group interactive-lift"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-brand-emerald-600 text-white mb-2">
                        {story.impact}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading text-text-primary mb-2 group-hover:text-gray-900 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-brand-gold-700 font-medium mb-3">
                      with {story.partner}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {story.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-24 bg-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-text-primary mb-6">
                Why Partner with Us?
              </h2>
              <p className="text-xl text-text-secondary">
                Discover the unique advantages of collaborating with The Black
                Silk
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partnershipBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-brand text-center group hover:shadow-brand-lg transition-all duration-300 interactive-lift"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-heading text-text-primary mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-24 gradient-surface" id="partnership-form">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading text-text-primary mb-6">
                Start a Partnership
              </h2>
              <p className="text-xl text-text-secondary">
                Ready to collaborate? Fill out the form below and we'll get in
                touch to discuss opportunities
              </p>
            </div>

            <Card className="border-0 shadow-brand-xl">
              <CardContent className="p-8 md:p-12">
                <form className="space-y-8">
                  {/* Organization Information */}
                  <div>
                    <h3 className="text-lg font-heading text-text-primary mb-6">
                      Organization Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Organization Name *
                        </label>
                        <Input
                          placeholder="Enter your organization name"
                          className="border-border-primary focus:border-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Organization Type *
                        </label>
                        <Select required>
                          <SelectTrigger className="border-border-primary focus:border-gray-900">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="academic">
                              Academic Institution
                            </SelectItem>
                            <SelectItem value="government">
                              Government Agency
                            </SelectItem>
                            <SelectItem value="nonprofit">
                              Non-Profit Organization
                            </SelectItem>
                            <SelectItem value="startup">
                              Technology Startup
                            </SelectItem>
                            <SelectItem value="law-firm">Law Firm</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Industry/Sector
                      </label>
                      <Input
                        placeholder="e.g., Legal Technology, Education, Government"
                        className="border-border-primary focus:border-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Organization Size
                      </label>
                      <Select>
                        <SelectTrigger className="border-border-primary focus:border-gray-900">
                          <SelectValue placeholder="Select organization size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">
                            Startup (1-10 employees)
                          </SelectItem>
                          <SelectItem value="small">
                            Small (11-50 employees)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium (51-200 employees)
                          </SelectItem>
                          <SelectItem value="large">
                            Large (201-1000 employees)
                          </SelectItem>
                          <SelectItem value="enterprise">
                            Enterprise (1000+ employees)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Website
                    </label>
                    <Input
                      type="url"
                      placeholder="https://your-organization.com"
                      className="border-border-primary focus:border-gray-900"
                    />
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-heading text-text-primary mb-6">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Contact Person Name *
                        </label>
                        <Input
                          placeholder="Enter contact person's full name"
                          className="border-border-primary focus:border-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Job Title *
                        </label>
                        <Input
                          placeholder="Enter job title or position"
                          className="border-border-primary focus:border-gray-900"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        className="border-border-primary focus:border-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        className="border-border-primary focus:border-gray-900"
                      />
                    </div>
                  </div>

                  {/* Partnership Details */}
                  <div>
                    <h3 className="text-lg font-heading text-text-primary mb-6">
                      Partnership Details
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Partnership Type of Interest *
                      </label>
                      <Select required>
                        <SelectTrigger className="border-border-primary focus:border-gray-900">
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporate">
                            Corporate Partnership
                          </SelectItem>
                          <SelectItem value="academic">
                            Academic Partnership
                          </SelectItem>
                          <SelectItem value="government">
                            Government Partnership
                          </SelectItem>
                          <SelectItem value="technology">
                            Technology Partnership
                          </SelectItem>
                          <SelectItem value="research">
                            Research Collaboration
                          </SelectItem>
                          <SelectItem value="event">
                            Event Partnership
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Partnership Objectives *
                    </label>
                    <Textarea
                      placeholder="Describe what you hope to achieve through this partnership..."
                      className="border-border-primary focus:border-gray-900 min-h-[120px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Proposed Collaboration Areas
                    </label>
                    <Textarea
                      placeholder="Describe specific areas where you'd like to collaborate (e.g., research, technology development, events, training)..."
                      className="border-border-primary focus:border-gray-900 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Expected Timeline
                      </label>
                      <Select>
                        <SelectTrigger className="border-border-primary focus:border-gray-900">
                          <SelectValue placeholder="Select expected timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            Immediate (within 1 month)
                          </SelectItem>
                          <SelectItem value="short">
                            Short-term (1-3 months)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium-term (3-6 months)
                          </SelectItem>
                          <SelectItem value="long">
                            Long-term (6+ months)
                          </SelectItem>
                          <SelectItem value="ongoing">
                            Ongoing partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Budget Range (Optional)
                      </label>
                      <Select>
                        <SelectTrigger className="border-border-primary focus:border-gray-900">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1l">
                            Under ₹1 Lakh
                          </SelectItem>
                          <SelectItem value="1l-5l">₹1-5 Lakhs</SelectItem>
                          <SelectItem value="5l-10l">₹5-10 Lakhs</SelectItem>
                          <SelectItem value="10l-25l">₹10-25 Lakhs</SelectItem>
                          <SelectItem value="25l-50l">₹25-50 Lakhs</SelectItem>
                          <SelectItem value="50l-plus">₹50+ Lakhs</SelectItem>
                          <SelectItem value="discuss">
                            To be discussed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Additional Information
                    </label>
                    <Textarea
                      placeholder="Any additional information about your organization, previous partnerships, or specific requirements..."
                      className="border-border-primary focus:border-gray-900 min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black hover:bg-gray-800 text-lg py-4"
                  >
                    Submit Partnership Proposal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-sm text-text-tertiary text-center">
                    We'll review your proposal and get back to you within 5
                    business days to discuss next steps.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </main>
  );
}
