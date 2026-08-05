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
    color: "blue",
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
    color: "orange",
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
    color: "purple",
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
    color: "red",
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
    color: "green",
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
    color: "teal",
    icon: Building,
    slug: "law-firm",
  },
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> =
    {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
      },
      red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
      green: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
      },
      teal: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
      },
    };
  return colorMap[color] || colorMap.blue;
};

export function CommitteesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Committees
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our expert-led committees working on critical issues at the
            intersection of law and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCommittees.map((committee) => {
            const colors = getColorClasses(committee.color);
            const Icon = committee.icon;

            return (
              <Card
                key={committee.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-gray-900 transition-colors">
                    {committee.name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {committee.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {committee.members} Members
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${colors.border} ${colors.text}`}
                    >
                      {committee.status}
                    </Badge>
                  </div>
                  <Link href={`/community/committees/${committee.slug}`}>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-gray-100"
                      size="sm"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/community/committees">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
              View All Committees
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
