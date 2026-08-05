import { generateMetadata } from "@/lib/seo"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Globe, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = generateMetadata({
  title: "About Us - The Black Silk",
  description:
    "Learn about The Black Silk's mission to bridge law, technology, and policy through collaborative discussions and innovative solutions.",
  canonical: "https://theblacksilk.org/about",
})

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
            alt="Legal professionals in discussion"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              About The Black Silk
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Driving Ethical Digital Transformation for a Better Future
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-prussian-blue mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To create a trusted forum for open and frank discussions on
                  the future of global technologies, bringing together diverse
                  perspectives to address complex challenges in digital
                  transformation, legal frameworks, and policy development.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Globe className="h-8 w-8 text-prussian-blue mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading global platform that shapes the future of
                  law and technology, fostering inclusive discussions that lead
                  to practical, implementable solutions for the digital age.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600">
              We believe in collaborative problem-solving and inclusive dialogue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Collaborative",
                description:
                  "Bringing together diverse stakeholders from law, technology, and policy sectors",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
              },
              {
                icon: Target,
                title: "Solution-Focused",
                description:
                  "Identifying practical, implementable solutions to complex technological challenges",
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
              },
              {
                icon: Award,
                title: "Excellence-Driven",
                description:
                  "Maintaining the highest standards of research, discussion, and thought leadership",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg text-center overflow-hidden"
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
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
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
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Become part of India's leading legal technology community and help
              shape the future of legal practice.
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
                className="border-white text-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/about/mission">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
