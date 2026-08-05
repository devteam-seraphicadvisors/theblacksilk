import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import leadershipData from "@/data/leadership.json";

export const metadata = generateSeoMetadata({
  title: "Leadership Team - The Black Silk",
  description:
    "Meet the visionary leaders driving The Black Silk's mission to bridge law and technology in India.",
  canonical: "https://theblacksilk.org/about/leadership",
});

const leadership = leadershipData.executiveBoard;

// const advisors = [
//   {
//     name: "Justice (Retd.) Vikram Singh",
//     position: "Senior Advisor",
//     organization: "Former Supreme Court Judge",
//     image:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
//   },
// ];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop"
            alt="Leadership Team"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="container mx-auto px-4 relative ">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Executive Board
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Inspiring Visionaries Leading Ethical Digital Transformation
            </p>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Executive Leadership
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our executive team brings together decades of experience in law,
                technology, and policy
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {leadership.map((leader, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <Image
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <CardContent className="md:w-2/3 p-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                          {leader.name}
                        </h3>
                        <p className="text-lg font-medium text-gray-700 mb-4">
                          {leader.position}
                        </p>
                      </div>

                      <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
                        {leader.bio}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.expertise.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="outline"
                              className="text-xs border-gray-300 text-gray-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link href={leader.social.linkedin}>
                            <Linkedin className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link href={leader.social.twitter}>
                            <Twitter className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          asChild
                        >
                          <Link href={`mailto:${leader.social.email}`}>
                            <Mail className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advisory Board
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Distinguished advisors providing strategic guidance and industry
                expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advisors.map((advisor, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group bg-white"
                >
                  <CardContent className="p-8">
                    <div className="relative w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                      <Image
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {advisor.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {advisor.position}
                    </p>
                    <p className="text-sm text-gray-600">
                      {advisor.organization}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Join Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're always looking for passionate individuals who share our
              vision of transforming the legal landscape through technology and
              innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white"
                asChild
              >
                <Link href="/careers/jobs">
                  View Open Positions
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                asChild
              >
                <Link href="/get-involved/contact">Contact Leadership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
