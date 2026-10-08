import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  FileText,
  ArrowLeft,
  Mail,
  Linkedin,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import committeesData from "@/data/committees.json";
import ApplicationDialog from "@/components/committees/application-dialog";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const committee = committeesData[slug as keyof typeof committeesData];

  if (!committee) {
    return generateSeoMetadata({
      title: "Committee Not Found - The Black Silk",
      description: "The requested committee could not be found.",
    });
  }

  return generateSeoMetadata({
    title: `${committee.name} - The Black Silk`,
    description: committee.description,
    canonical: `https://theblacksilk.org/community/committees/${committee.slug}`,
    keywords: `${committee.name}, legal committee, law and technology, ${
      committee.focus?.join(", ") || ""
    }, The Black Silk`,
  });
}

export default async function CommitteeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const committee = committeesData[slug as keyof typeof committeesData] as any;

  if (!committee) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={committee.image || "/placeholder.svg"}
            alt={committee.name}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/community/committees"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Committees
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Badge
                className={
                  committee.status === "Accepting Members"
                    ? "bg-white text-black border-white font-mono text-xs uppercase tracking-wider rounded-none"
                    : committee.status === "Open for Collaboration"
                    ? "bg-neutral-800 text-white border-neutral-700 font-mono text-xs uppercase tracking-wider rounded-none"
                    : "bg-neutral-900 text-neutral-300 border-neutral-800 font-mono text-xs uppercase tracking-wider rounded-none"
                }
              >
                {committee.status}
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 font-mono text-xs uppercase tracking-wider rounded-none">
                Est. {committee.established}
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 font-mono text-xs uppercase tracking-wider rounded-none">
                {committee.members} Members
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white leading-tight tracking-tight">
              {committee.name}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 font-sans font-light leading-relaxed mb-10 max-w-3xl">
              {committee.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {(committee.status === "Accepting Members" ||
                committee.status === "Open for Collaboration") && (
                <ApplicationDialog
                  committeeSlug={committee.slug}
                  committeeName={committee.name}
                  focusAreas={committee.focus}
                  triggerButton={
                    <Button
                      size="lg"
                      className="bg-white !text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider rounded-none px-8 py-3 cursor-pointer"
                    >
                      Join Committee
                    </Button>
                  }
                />
              )}
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-400 text-white hover:bg-white hover:!text-black font-mono text-xs uppercase tracking-wider rounded-none px-8 py-3 cursor-pointer"
                asChild
              >
                <Link href={`mailto:${committee.chair.email}`}>
                  Contact Chair
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Committee Leadership
              </h2>
              <p className="text-xl text-gray-600">
                Meet the leaders driving our committee's mission forward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {/* Chair */}
              <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={committee.chair.image || "/placeholder.svg"}
                      alt={committee.chair.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {committee.chair.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-1">Chair</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {committee.chair.designation}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {committee.chair.bio}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      asChild
                    >
                      <Link href={`mailto:${committee.chair.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      asChild
                    >
                      <Link href={committee.chair.linkedin} target="_blank">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Co-Chair (if exists) */}
              {committee.coChair && (
                <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={committee.coChair.image || "/placeholder.svg"}
                        alt={committee.coChair.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {committee.coChair.name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-1">Co-Chair</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {committee.coChair.designation}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {committee.coChair.bio}
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        asChild
                      >
                        <Link href={`mailto:${committee.coChair.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        asChild
                      >
                        <Link href={committee.coChair.linkedin} target="_blank">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Committee Members Grid */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Committee Members
              </h3>
              <p className="text-lg text-gray-600">
                Active contributors to our committee's initiatives
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {committee.committeeMembers?.map((member, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full rounded-xl"
                      asChild
                    >
                      <Link href={member.linkedin} target="_blank">
                        <Linkedin className="h-3 w-3 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Committee Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* About */}
                <Card className="border-0 shadow-lg bg-white rounded-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      About This Committee
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {committee.fullDescription
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index} className="mb-4 leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Focus Areas */}
                {committee.focus && committee.focus.length > 0 && (
                  <Card className="border-0 shadow-lg bg-white rounded-2xl">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-3xl font-bold text-gray-900">
                        Focus Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {committee.focus?.map((area: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-l-gray-900"
                          >
                            <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                            <h3 className="font-semibold text-gray-900">
                              {area}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Activities */}
                {committee.activities && committee.activities.length > 0 && (
                  <Card className="border-0 shadow-lg bg-white rounded-2xl">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-3xl font-bold text-gray-900">
                        Committee Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {committee.activities?.map(
                          (activity: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                            >
                              <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-700 leading-relaxed">
                                {activity}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Publications */}
                {committee.recentPublications &&
                  committee.recentPublications.length > 0 && (
                    <Card className="border-0 shadow-lg bg-white rounded-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-gray-900">
                          Recent Publications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {committee.recentPublications?.map(
                            (pub: any, index: number) => (
                              <div
                                key={index}
                                className="p-6 bg-gray-50 rounded-xl"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                      {pub.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                      {pub.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {pub.date}
                                    </p>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-gray-700 border-gray-300 ml-4"
                                  >
                                    {pub.type}
                                  </Badge>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {/* Upcoming Events */}
                {committee.upcomingEvents &&
                  committee.upcomingEvents.length > 0 && (
                    <Card className="border-0 shadow-lg bg-white rounded-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-gray-900">
                          Upcoming Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {committee.upcomingEvents?.map(
                            (event: any, index: number) => (
                              <div
                                key={index}
                                className="p-6 bg-gray-50 rounded-xl"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                      {event.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                      {event.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                      <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {event.date}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {event.location}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-green-700 border-green-300 bg-green-50 ml-4"
                                  >
                                    {event.type}
                                  </Badge>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Committee Stats */}
                <Card className="border-0 shadow-lg bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Committee Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Users className="h-8 w-8 text-gray-900 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">
                        {committee.members}
                      </p>
                      <p className="text-sm text-gray-600">Active Members</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <FileText className="h-8 w-8 text-gray-900 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">
                        {committee.publications}
                      </p>
                      <p className="text-sm text-gray-600">Publications</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Calendar className="h-8 w-8 text-gray-900 mx-auto mb-2" />
                      <p className="text-lg font-bold text-gray-900">
                        {committee.nextMeeting}
                      </p>
                      <p className="text-sm text-gray-600">Next Meeting</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Join Committee */}
                {(committee.status === "Accepting Members" ||
                  committee.status === "Open for Collaboration") && (
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">
                        Join This Committee
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Contribute your expertise and collaborate with industry
                        leaders
                      </p>
                      <ApplicationDialog
                        committeeSlug={committee.slug}
                        committeeName={committee.name}
                        focusAreas={committee.focus}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Contact */}
                <Card className="border-0 shadow-lg bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Questions?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Learn more about this committee and how to get involved.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                      asChild
                    >
                      <Link href="/get-involved/contact">Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
