import { generateMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = generateMetadata({
  title: "Our Mission - The Black Silk",
  description:
    "Learn about The Black Silk's mission to bridge law and technology, fostering innovation and collaboration in the legal profession.",
  canonical: "https://theblacksilk.org/about/mission",
});

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
            alt="Our Mission"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="relative container mx-auto px-4 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-6">
              <Target className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Our Methodology</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Empowering legal professionals to navigate and shape the digital
              transformation of law
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-gray-900 text-white">
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 mx-auto mb-6 text-white/80" />
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Ethical Digital Development for the Greater Good
                </h2>
                <p className="text-xl leading-relaxed text-gray-400 text-justify">
                  At The Black Silk, our mission is clear: to promote the
                  ethical development and judicious use of digital technologies
                  for the greater good. We firmly believe that digital
                  advancements have the power to transform our lives, but their
                  impact should be guided by ethical considerations and a
                  commitment to safeguarding the interests of all stakeholders.
                  By fostering inclusive discussions, setting ethical
                  thresholds, and addressing the challenges posed by the digital
                  world, we strive to create a future where technology serves as
                  a force for positive change.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vision */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Eye className="h-8 w-8 text-gray-900 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    To be the leading global platform that shapes the future of
                    law and technology, fostering inclusive discussions that
                    lead to practical, implementable solutions for the digital
                    age.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>
                        Bridge the gap between legal practice and technological
                        innovation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>
                        Influence policy development through evidence-based
                        research
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>
                        Create a global network of legal technology leaders
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Values */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Heart className="h-8 w-8 text-gray-900 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Values
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Collaboration
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We believe in the power of diverse perspectives and
                        inclusive dialogue
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Innovation
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We embrace technological advancement while respecting
                        legal traditions
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Excellence
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We maintain the highest standards in research,
                        discussion, and thought leadership
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Impact
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We focus on creating practical solutions that make a
                        real difference
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-600">
              Our mission-driven approach combines research, dialogue, and
              action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Convene",
                description:
                  "We bring together leading experts from law, technology, and policy sectors for meaningful dialogue",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
              },
              {
                icon: Target,
                title: "Research",
                description:
                  "We conduct rigorous research on emerging issues at the intersection of law and technology",
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
              },
              {
                icon: Eye,
                title: "Advocate",
                description:
                  "We translate insights into actionable policy recommendations and best practices",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg text-center overflow-hidden bg-white"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-gray-900/20 backdrop-blur-sm rounded-lg">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
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
