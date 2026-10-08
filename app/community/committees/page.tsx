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
      return "bg-black text-white border-black";
    case "Open for Collaboration":
      return "bg-neutral-900 text-white border-neutral-900";
    case "Active Research":
    case "Active Development":
      return "bg-neutral-100 text-neutral-900 border-neutral-300";
    case "Policy Review":
    default:
      return "bg-neutral-100 text-neutral-700 border-neutral-300";
  }
};

export default function CommitteesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-white" />
              <span>13 Active Committees</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Expert Committees
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Join specialized committees working on the most pressing issues at
              the intersection of law and technology
            </p>
          </div>
        </div>
      </section>

      {/* Committees Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {committees.map((committee) => {
                return (
                  <Card
                    key={committee.id}
                    className="border border-neutral-200 shadow-sm hover:shadow-md hover:border-black transition-all duration-300 bg-white rounded-none overflow-hidden group flex flex-col justify-between"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-black rounded-none flex items-center justify-center text-white border border-black">
                          <committee.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            committee.status
                          )} rounded-none px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border`}
                        >
                          {committee.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-serif font-normal text-black leading-tight group-hover:text-neutral-700 transition-colors">
                        {committee.name}
                      </CardTitle>
                      <p className="text-neutral-600 text-sm leading-relaxed mt-2 font-sans">
                        {committee.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-0">
                      {/* Committee Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                          <div className="flex items-center justify-center mb-1.5">
                            <Users className="h-4 w-4 text-neutral-500" />
                          </div>
                          <p className="text-lg font-bold text-black font-mono">
                            {committee.members}
                          </p>
                          <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">
                            Members
                          </p>
                        </div>
                        <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                          <div className="flex items-center justify-center mb-1.5">
                            <FileText className="h-4 w-4 text-neutral-500" />
                          </div>
                          <p className="text-lg font-bold text-black font-mono">
                            {committee.publications}
                          </p>
                          <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">
                            Pubs
                          </p>
                        </div>
                        <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                          <div className="flex items-center justify-center mb-1.5">
                            <Calendar className="h-4 w-4 text-neutral-500" />
                          </div>
                          <p className="text-lg font-bold text-black font-mono">
                            {committee.established}
                          </p>
                          <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">
                            Est.
                          </p>
                        </div>
                      </div>

                      {/* Committee Details */}
                      <div className="space-y-4 text-sm">
                        <div className="border-t border-neutral-100 pt-3">
                          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                            Committee Chair
                          </p>
                          <p className="text-sm text-black font-medium">
                            {committee.chair}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                            Focus Areas
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {committee.focus.map((area, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-[11px] rounded-none border-neutral-300 text-neutral-700 bg-neutral-50 hover:bg-neutral-100 transition-colors"
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                            Next Meeting
                          </p>
                          <p className="text-sm text-black font-medium">
                            {committee.nextMeeting}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-neutral-200">
                        <Button
                          className="flex-1 bg-black hover:bg-neutral-800 !text-white rounded-none transition-all duration-200 text-xs uppercase font-mono tracking-wider cursor-pointer"
                          asChild
                        >
                          <Link href={`/community/committees/${committee.id}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 !text-white" />
                          </Link>
                        </Button>
                        {(committee.status === "Accepting Members" ||
                          committee.status === "Open for Collaboration") && (
                          <Button
                            variant="outline"
                            className="border-neutral-300 text-black hover:border-black hover:bg-black hover:!text-white rounded-none text-xs uppercase font-mono tracking-wider transition-all duration-200 cursor-pointer"
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
    </main>
  );
}
