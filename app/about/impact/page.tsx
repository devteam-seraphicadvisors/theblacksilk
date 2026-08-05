import { generateMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Award,
  Target,
  Globe,
  Zap,
} from "lucide-react";
import Image from "next/image";

export const metadata = generateMetadata({
  title: "Our Impact - The Black Silk",
  description:
    "Discover the measurable impact The Black Silk has made in advancing legal technology and policy in India.",
  canonical: "https://theblacksilk.org/about/impact",
});

const impactMetrics = [
  {
    icon: Users,
    value: "500+",
    label: "Community Members",
    description: "Legal professionals, technologists, and policymakers",
    growth: "+89 this month",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: FileText,
    value: "50+",
    label: "Research Publications",
    description: "White papers, policy briefs, and research reports",
    growth: "+6 this quarter",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Calendar,
    value: "25+",
    label: "Events Annually",
    description: "Symposiums, workshops, and networking events",
    growth: "+12 this year",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Cities Reached",
    description: "Pan-India presence with global connections",
    growth: "+3 new cities",
    color: "from-orange-500 to-orange-600",
  },
];

const achievements = [
  {
    year: "2024",
    title: "Best Legal Tech Platform Award",
    description:
      "Recognized by the Indian Legal Technology Association for outstanding contribution to legal innovation",
    impact: "Industry Recognition",
    image: "/images/achievement-award.jpg",
  },
  {
    year: "2024",
    title: "AI Ethics Framework Adoption",
    description:
      "Our AI ethics guidelines adopted by 15+ state high courts across India",
    impact: "Policy Implementation",
    image: "/images/achievement-ai-ethics.jpg",
  },
  {
    year: "2023",
    title: "Digital Evidence Standards",
    description:
      "Developed and implemented digital evidence protocols in 200+ courts nationwide",
    impact: "Judicial Reform",
    image: "/images/achievement-digital-evidence.jpg",
  },
  {
    year: "2023",
    title: "Legal Tech Startup Incubator",
    description:
      "Launched India's first legal technology startup accelerator, supporting 50+ startups",
    impact: "Ecosystem Development",
    image: "/images/achievement-incubator.jpg",
  },
];

const caseStudies = [
  {
    title: "Transforming Court Operations with AI",
    client: "Delhi High Court",
    challenge: "Manual case management leading to delays and inefficiencies",
    solution:
      "Implemented AI-powered case scheduling and document analysis system",
    results: [
      "40% reduction in case processing time",
      "60% improvement in scheduling efficiency",
      "Enhanced access to justice for citizens",
    ],
    image: "/images/case-study-court-ai.jpg",
  },
  {
    title: "Blockchain for Legal Documentation",
    client: "Maharashtra State Legal Services",
    challenge: "Document forgery and verification issues in legal proceedings",
    solution: "Deployed blockchain-based document verification system",
    results: [
      "99.9% reduction in document forgery",
      "Instant verification capabilities",
      "Increased trust in legal processes",
    ],
    image: "/images/case-study-blockchain.jpg",
  },
  {
    title: "Legal Tech Education Initiative",
    client: "National Law Universities",
    challenge: "Lack of technology training in legal education curriculum",
    solution:
      "Developed comprehensive legal technology curriculum and training programs",
    results: [
      "10,000+ law students trained",
      "50+ faculty members certified",
      "Integration in 25+ law schools",
    ],
    image: "/images/case-study-education.jpg",
  },
];

export default function ImpactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/impact-hero.jpg"
            alt="Our Impact"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Measurable Impact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading mb-6">
              Our Impact
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Transforming legal practice through technology, creating
              measurable change across India's legal ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-gray-900 mb-6">
                Impact by Numbers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quantifiable results that demonstrate our commitment to
                advancing legal technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${metric.color}`} />
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <metric.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      {metric.label}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {metric.description}
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {metric.growth}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-gray-900 mb-6">
                Key Achievements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Milestones that showcase our progress in transforming the legal
                technology landscape
              </p>
            </div>

            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative lg:w-1/3 h-64 lg:h-auto overflow-hidden">
                      <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gray-900 text-white">
                          {achievement.year}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-white/90 text-gray-900">
                          {achievement.impact}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="lg:w-2/3 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-heading text-gray-900 group-hover:text-gray-800 transition-colors">
                          {achievement.title}
                        </h3>
                        <Award className="h-6 w-6 text-yellow-500 flex-shrink-0 ml-4" />
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-gray-900 mb-6">
                Case Studies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real-world examples of how our solutions have transformed legal
                operations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white">
                        {study.client}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {study.title}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Challenge
                        </h4>
                        <p className="text-sm text-gray-600">
                          {study.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Solution
                        </h4>
                        <p className="text-sm text-gray-600">
                          {study.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Results
                        </h4>
                        <ul className="space-y-1">
                          {study.results.map((result, resultIndex) => (
                            <li
                              key={resultIndex}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <Target className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading mb-6">Looking Ahead</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Our ambitious goals for the next phase of legal technology
                transformation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  target: "1,000+",
                  label: "Community Members",
                  timeline: "By 2025",
                },
                {
                  icon: Globe,
                  target: "50+",
                  label: "Cities Covered",
                  timeline: "By 2025",
                },
                {
                  icon: FileText,
                  target: "100+",
                  label: "Research Papers",
                  timeline: "By 2026",
                },
                {
                  icon: Zap,
                  target: "500+",
                  label: "Courts Digitized",
                  timeline: "By 2026",
                },
              ].map((goal, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                >
                  <CardContent className="p-6 text-center">
                    <goal.icon className="h-12 w-12 mx-auto mb-4 text-white/80" />
                    <div className="text-3xl font-bold mb-2">{goal.target}</div>
                    <div className="text-lg font-medium mb-2">{goal.label}</div>
                    <div className="text-sm text-white/70">{goal.timeline}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
