import { generateMetadata } from "@/lib/seo"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Lightbulb, Rocket, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = generateMetadata({
  title: "Our Approach - The Black Silk",
  description:
    "Discover how The Black Silk approaches legal technology challenges through collaborative research, inclusive dialogue, and practical solutions.",
  canonical: "https://theblacksilk.org/about/approach",
})

export default function ApproachPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/approach-hero.png"
            alt="Our Approach"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Target className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Our Approach</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading mb-6 animate-fade-in">
              Inclusive Discussions and Collaborative Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed animate-slide-in-left">
              How we bridge the gap between legal practice and technological
              innovation through collaborative research and inclusive dialogue
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-gray-900 mb-6">
                Core Principles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our approach is built on four fundamental principles that guide
                everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Users,
                  title: "Collaborative Excellence",
                  description:
                    "We bring together diverse stakeholders from law, technology, and policy sectors to foster meaningful dialogue and cross-pollination of ideas.",
                  image: "/images/principle-collaborative.png",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Target,
                  title: "Solution-Focused Research",
                  description:
                    "Every research initiative is designed to produce practical, implementable solutions that address real-world challenges in legal technology.",
                  image: "/images/principle-research.png",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation-Driven Thinking",
                  description:
                    "We embrace emerging technologies while respecting legal traditions, finding innovative ways to enhance legal practice and access to justice.",
                  image: "/images/principle-innovation.png",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Rocket,
                  title: "Impact-Oriented Action",
                  description:
                    "We measure success by the real-world impact of our work, focusing on outcomes that benefit legal professionals and society at large.",
                  image: "/images/principle-impact.png",
                  color: "from-orange-500 to-orange-600",
                },
              ].map((principle, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={principle.image || "/placeholder.svg"}
                      alt={principle.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${principle.color} opacity-80`}
                    />
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <principle.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-heading text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-gray-900 mb-6">
                Our Methodology
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A systematic approach to addressing complex challenges at the
                intersection of law and technology
              </p>
            </div>

            <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Research & Analysis",
                  description:
                    "We begin by conducting comprehensive research to understand the current landscape, identify gaps, and analyze emerging trends in legal technology.",
                  features: [
                    "Market analysis and trend identification",
                    "Stakeholder interviews and surveys",
                    "Comparative studies across jurisdictions",
                    "Technology assessment and evaluation",
                  ],
                  image: "/images/methodology-research.png",
                },
                {
                  step: "02",
                  title: "Collaborative Dialogue",
                  description:
                    "We facilitate inclusive discussions bringing together diverse perspectives from legal professionals, technologists, policymakers, and academics.",
                  features: [
                    "Multi-stakeholder workshops and symposiums",
                    "Expert panel discussions",
                    "Committee-based working groups",
                    "Public consultation processes",
                  ],
                  image: "/images/methodology-dialogue.png",
                },
                {
                  step: "03",
                  title: "Solution Development",
                  description:
                    "Based on research and dialogue, we develop practical solutions, frameworks, and recommendations that can be implemented in real-world scenarios.",
                  features: [
                    "Policy framework development",
                    "Best practice guidelines",
                    "Implementation roadmaps",
                    "Pilot program design",
                  ],
                  image: "/images/methodology-solution.png",
                },
                {
                  step: "04",
                  title: "Implementation & Impact",
                  description:
                    "We work with partners to implement solutions, monitor their effectiveness, and continuously refine our approach based on real-world feedback.",
                  features: [
                    "Partnership development",
                    "Implementation support",
                    "Impact measurement and evaluation",
                    "Continuous improvement processes",
                  ],
                  image: "/images/methodology-impact.png",
                },
              ].map((phase, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <div className="text-6xl font-bold text-gray-100 mb-4">
                        {phase.step}
                      </div>
                      <h3 className="text-3xl font-heading text-gray-900 mb-6">
                        {phase.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="space-y-3">
                        {phase.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={phase.image || "/placeholder.svg"}
                        alt={phase.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading text-gray-900 mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real examples of how our approach has created meaningful impact
                in the legal technology landscape
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Ethics Framework",
                  description:
                    "Developed comprehensive guidelines for ethical AI use in Indian courts",
                  impact: "Adopted by 15+ state high courts",
                  image: "/images/success-ai-ethics.jpg",
                },
                {
                  title: "Digital Evidence Standards",
                  description:
                    "Created standardized protocols for digital evidence handling",
                  impact: "Implemented across 200+ courts",
                  image: "/images/success-digital-evidence.jpg",
                },
                {
                  title: "Legal Tech Startup Incubator",
                  description:
                    "Launched India's first legal technology startup accelerator program",
                  impact: "Supported 50+ startups",
                  image: "/images/success-incubator.png",
                },
              ].map((story, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group"
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
                      <div className="text-sm font-medium bg-green-500 px-2 py-1 rounded">
                        {story.impact}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-600">{story.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading mb-6">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community and be part of shaping the future of legal
              technology in India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href="/community/membership">
                  Become a Member
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-gray-900 hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/get-involved/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
