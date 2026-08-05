import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  FileText,
  ArrowRight,
  Target,
  Briefcase,
  Shield,
  Globe,
  Code,
  Heart,
  UserCheck,
  Building,
  Database,
  Lock,
  Scale,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Committees - The Black Silk",
  description:
    "Join specialized committees working on cutting-edge legal and technology issues. Collaborate with experts and contribute to policy development.",
  canonical: "https://theblacksilk.org/committees",
});

const committees = [
  {
    id: "young-members",
    name: "Young Members Committee",
    description:
      "Empowering the next generation of legal professionals with technology skills and networking opportunities.",
    members: 3,
    status: "Accepting Members",
    chair: "Arjun Sharma",
    established: "2023",
    focus: ["Career Development", "Networking", "Skill Building"],
    nextMeeting: "Jan 15, 2025",
    publications: 0,
    icon: UserCheck,
    color: "blue",
  },
  {
    id: "sponsorship",
    name: "Sponsorship Committee",
    description:
      "Building strategic partnerships and securing funding for community initiatives and events.",
    members: 4,
    status: "Active Research",
    chair: "Priya Patel",
    established: "2022",
    focus: ["Partnership Development", "Fundraising", "Corporate Relations"],
    nextMeeting: "Jan 18, 2025",
    publications: 0,
    icon: Briefcase,
    color: "emerald",
  },
  {
    id: "law-firm",
    name: "Law Firm Committee",
    description:
      "Addressing challenges and opportunities specific to law firm operations and technology adoption.",
    members: 4,
    status: "Accepting Members",
    chair: "Rajesh Kumar",
    established: "2023",
    focus: ["Firm Management", "Technology Integration", "Best Practices"],
    nextMeeting: "Jan 20, 2025",
    publications: 0,
    icon: Building,
    color: "purple",
  },
  {
    id: "data-policy",
    name: "Data Policy Committee",
    description:
      "Developing comprehensive data governance policies and privacy frameworks for the legal sector.",
    members: 4,
    status: "Open for Collaboration",
    chair: "Dr. Meera Singh",
    established: "2024",
    focus: ["Data Governance", "Privacy Laws", "Compliance"],
    nextMeeting: "Jan 22, 2025",
    publications: 0,
    icon: Database,
    color: "orange",
  },
  {
    id: "internet",
    name: "Internet Committee",
    description:
      "Exploring internet governance, digital rights, and online legal frameworks in the Indian context.",
    members: 2,
    status: "Accepting Members",
    chair: "Vikram Reddy",
    established: "2023",
    focus: ["Internet Governance", "Digital Rights", "Online Regulation"],
    nextMeeting: "Jan 25, 2025",
    publications: 0,
    icon: Globe,
    color: "blue",
  },
  {
    id: "skill-development",
    name: "Skill Development Committee",
    description:
      "Creating training programs and certification courses for legal technology skills.",
    members: 3,
    status: "Accepting Members",
    chair: "Anita Desai",
    established: "2022",
    focus: ["Training Programs", "Certification", "Professional Development"],
    nextMeeting: "Jan 17, 2025",
    publications: 0,
    icon: BookOpen,
    color: "emerald",
  },
  {
    id: "personal-data",
    name: "Personal Data Committee",
    description:
      "Focusing on personal data protection laws and individual privacy rights in digital environments.",
    members: 4,
    status: "Research Phase",
    chair: "Sanjay Gupta",
    established: "2024",
    focus: ["Personal Data Protection", "Privacy Rights", "GDPR Compliance"],
    nextMeeting: "Jan 19, 2025",
    publications: 0,
    icon: Lock,
    color: "purple",
  },
  {
    id: "community-data",
    name: "Community Data Committee",
    description:
      "Addressing data sharing and privacy concerns within community platforms and social networks.",
    members: 3,
    status: "Accepting Members",
    chair: "Kavya Nair",
    established: "2024",
    focus: ["Community Data", "Social Networks", "Data Sharing"],
    nextMeeting: "Jan 24, 2025",
    publications: 0,
    icon: Users,
    color: "orange",
  },
  {
    id: "privacy-rights",
    name: "Privacy Rights Committee",
    description:
      "Advocating for comprehensive privacy rights and developing frameworks for digital privacy protection.",
    members: 4,
    status: "Open for Collaboration",
    chair: "Dr. Ravi Krishnan",
    established: "2022",
    focus: ["Privacy Advocacy", "Digital Rights", "Legal Frameworks"],
    nextMeeting: "Jan 16, 2025",
    publications: 0,
    icon: Shield,
    color: "blue",
  },
  {
    id: "pro-bono",
    name: "Pro-Bono Committee",
    description:
      "Coordinating pro-bono legal services and technology assistance for underserved communities.",
    members: 3,
    status: "Accepting Members",
    chair: "Deepika Sharma",
    established: "2023",
    focus: ["Pro-Bono Services", "Community Outreach", "Legal Aid"],
    nextMeeting: "Jan 21, 2025",
    publications: 0,
    icon: Heart,
    color: "emerald",
  },
  {
    id: "website",
    name: "Website Committee",
    description:
      "Managing and improving the organization's digital presence and online platforms.",
    members: 15,
    status: "Active Development",
    chair: "Rohit Agarwal",
    established: "2023",
    focus: ["Web Development", "Digital Strategy", "User Experience"],
    nextMeeting: "Jan 23, 2025",
    publications: 0,
    icon: Code,
    color: "purple",
  },
  {
    id: "programs",
    name: "Programs Committee",
    description:
      "Designing and implementing educational programs, workshops, and community initiatives.",
    members: 4,
    status: "Accepting Members",
    chair: "Sunita Joshi",
    established: "2022",
    focus: ["Program Development", "Education", "Community Engagement"],
    nextMeeting: "Jan 26, 2025",
    publications: 0,
    icon: Target,
    color: "orange",
  },
  {
    id: "member-policy",
    name: "Member Policy Committee",
    description:
      "Developing membership policies, guidelines, and governance frameworks for the organization.",
    members: 3,
    status: "Policy Review",
    chair: "Amit Verma",
    established: "2022",
    focus: ["Membership Policies", "Governance", "Community Guidelines"],
    nextMeeting: "Jan 27, 2025",
    publications: 0,
    icon: Scale,
    color: "blue",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepting Members":
      return "bg-green-100 text-green-800 border-green-200";
    case "Open for Collaboration":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Active Research":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Active Development":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Policy Review":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function CommitteesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">
                13 Active Committees
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Expert Committees
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join specialized committees working on the most pressing issues at
              the intersection of law and technology
            </p>
          </div>
        </div>
      </section>

      {/* Committees Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {committees.map((committee) => {
                return (
                  <Card
                    key={committee.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center mb-4 shadow-lg">
                          <committee.icon className="h-7 w-7 text-white" />
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            committee.status
                          )} font-medium`}
                        >
                          {committee.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                        {committee.name}
                      </CardTitle>
                      <p className="text-gray-600 leading-relaxed">
                        {committee.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Committee Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-4 w-4 text-gray-500" />
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {committee.members}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Members
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-center mb-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {committee.publications}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Publications
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-center mb-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {committee.established}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Established
                          </p>
                        </div>
                      </div>

                      {/* Committee Details */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Committee Chair
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            {committee.chair}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Focus Areas
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {committee.focus.map((area, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Next Meeting
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            {committee.nextMeeting}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <Button
                          className="flex-1 bg-gray-900 hover:bg-black text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl"
                          asChild
                        >
                          <Link href={`/community/committees/${committee.id}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        {(committee.status === "Accepting Members" ||
                          committee.status === "Open for Collaboration") && (
                          <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                            asChild
                          >
                            <Link
                              href={`/community/committees/${committee.id}/apply`}
                            >
                              Apply
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Contribute?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Join a committee and help shape the future of law and technology
              in India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8 py-3 font-semibold"
                asChild
              >
                <Link href="/membership">Become a Member</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 rounded-xl px-8 py-3 font-semibold transition-all duration-200"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
