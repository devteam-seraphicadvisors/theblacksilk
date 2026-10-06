import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  Shield,
  Database,
  Brain,
  Handshake,
  Building,
} from "lucide-react";

const featuredCommittees = [
  {
    id: "young-members",
    name: "Young Members Committee",
    description:
      "Empowering the next generation of legal professionals with technology skills and networking opportunities.",
    members: 4,
    status: "Accepting Members",
    icon: Users,
    slug: "young-members",
  },
  {
    id: "data-policy",
    name: "Data Policy Committee",
    description:
      "Developing comprehensive data governance policies and privacy frameworks for the legal sector.",
    members: 4,
    status: "Open for Collaboration",
    icon: Database,
    slug: "data-policy",
  },
  {
    id: "ai-ethics",
    name: "AI Ethics Committee",
    description:
      "Establishing ethical guidelines and best practices for artificial intelligence implementation in legal services.",
    members: 3,
    status: "Accepting Members",
    icon: Brain,
    slug: "ai-ethics",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Committee",
    description:
      "Advancing cybersecurity standards and practices for legal organizations and their clients.",
    members: 4,
    status: "Open for Collaboration",
    icon: Shield,
    slug: "cybersecurity",
  },
  {
    id: "sponsorship",
    name: "Sponsorship Committee",
    description:
      "Oversees sponsorship opportunities, partnerships, and fundraising initiatives for The Black Silk.",
    members: 4,
    status: "Active",
    icon: Handshake,
    slug: "sponsorship",
  },
  {
    id: "law-firm",
    name: "Law Firm Committee",
    description:
      "Engages law firms to promote best practices, training, and collaboration.",
    members: 4,
    status: "Active",
    icon: Building,
    slug: "law-firm",
  },
];

export function CommitteesSection() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50 text-black border-b border-neutral-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
            Practice Groups
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal text-black mb-4">
            Specialized Practice Committees
          </h2>
          <p className="text-base md:text-lg text-neutral-600 font-light">
            Working groups focused on high-priority intersections of digital
            policy, corporate practice, and law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCommittees.map((committee) => {
            const Icon = committee.icon;

            return (
              <Card
                key={committee.id}
                className="group border border-black bg-white rounded-none shadow-none hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <CardHeader className="p-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-serif font-normal text-black">
                    {committee.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-neutral-600 mt-2 font-sans leading-relaxed">
                    {committee.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center justify-between mb-4 border-t border-neutral-200 pt-4">
                    <span className="text-xs font-mono text-neutral-500">
                      {committee.members} Members
                    </span>
                    <Badge
                      className="bg-black text-white border border-black rounded-none text-xs font-medium px-2.5 py-0.5 hover:bg-neutral-800 transition-colors"
                    >
                      {committee.status}
                    </Badge>
                  </div>
                  <Link href={`/community/committees/${committee.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full border-black text-black hover:bg-black hover:text-white rounded-none text-xs uppercase tracking-wider font-medium"
                      size="sm"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/community/committees">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-neutral-800 rounded-none px-8 py-5 text-sm uppercase tracking-wider font-medium"
            >
              View All Committees
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
