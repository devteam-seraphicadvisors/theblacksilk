"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MapPin,
  Users,
  Linkedin,
  Twitter,
  Mail,
  Filter,
  Star,
  Verified,
} from "lucide-react";
import Link from "next/link";

interface Member {
  id: number | string;
  name: string;
  title: string;
  organization: string;
  location: string;
  expertise: string[];
  memberSince: string;
  image: string;
  verified: boolean;
  committees: string[];
  social: {
    linkedin: string;
    twitter: string;
    email: string;
  };
}

const defaultMembers: Member[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    title: "Senior Partner",
    organization: "Kumar & Associates",
    location: "New Delhi",
    expertise: ["Corporate Law", "Technology Law", "AI Ethics"],
    memberSince: "2022",
    image: "/images/member-rajesh-kumar.jpg",
    verified: true,
    committees: ["AI & Ethics Committee"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rajesh@example.com",
    },
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Chief Technology Officer",
    organization: "LegalTech Innovations",
    location: "Bangalore",
    expertise: [
      "Legal Technology",
      "Product Development",
      "Digital Transformation",
    ],
    memberSince: "2023",
    image: "/images/member-priya-sharma.jpg",
    verified: true,
    committees: ["Cybersecurity Policy Group"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "priya@example.com",
    },
  },
  {
    id: 3,
    name: "Arjun Reddy",
    title: "Data Protection Officer",
    organization: "Tech Mahindra",
    location: "Hyderabad",
    expertise: ["Data Privacy", "GDPR Compliance", "Cybersecurity"],
    memberSince: "2022",
    image: "/images/member-arjun-reddy.jpg",
    verified: true,
    committees: ["Privacy & Data Protection"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "arjun@example.com",
    },
  },
  {
    id: 4,
    name: "Meera Patel",
    title: "Blockchain Consultant",
    organization: "Blockchain Legal Solutions",
    location: "Mumbai",
    expertise: [
      "Blockchain Technology",
      "Smart Contracts",
      "Legal Documentation",
    ],
    memberSince: "2023",
    image: "/images/member-meera-patel.jpg",
    verified: true,
    committees: ["Blockchain & Legal Tech"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "meera@example.com",
    },
  },
  {
    id: 5,
    name: "Vikram Singh",
    title: "Fintech Legal Advisor",
    organization: "HDFC Bank",
    location: "Mumbai",
    expertise: ["Financial Technology", "Banking Law", "Regulatory Compliance"],
    memberSince: "2024",
    image: "/images/member-vikram-singh.jpg",
    verified: true,
    committees: ["Fintech Regulation Committee"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "vikram@example.com",
    },
  },
  {
    id: 6,
    name: "Anita Desai",
    title: "Policy Research Director",
    organization: "Digital India Foundation",
    location: "New Delhi",
    expertise: ["Digital Governance", "Public Policy", "E-Government"],
    memberSince: "2022",
    image: "/images/member-anita-desai.jpg",
    verified: true,
    committees: ["Digital Governance Initiative"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "anita@example.com",
    },
  },
];

const filters = [
  { label: "All Members", value: "all", count: 500, active: true },
  { label: "Legal Professionals", value: "legal", count: 280, active: false },
  { label: "Technology Experts", value: "tech", count: 150, active: false },
  { label: "Policy Makers", value: "policy", count: 70, active: false },
];

const cities = [
  { label: "All Cities", value: "all" },
  { label: "New Delhi", value: "delhi" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Pune", value: "pune" },
];

export default function DirectoryPage() {
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/community/directory");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setMembers(data);
        }
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      // Use default members if API fails
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCity =
      selectedCity === "all" ||
      member.location.toLowerCase().includes(selectedCity.toLowerCase());

    return matchesSearch && matchesCity;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading members...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Users className="h-3.5 w-3.5 text-white mr-2" />
              <span>500+ Active Members</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Member Directory
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Connect with legal professionals, technologists, and policymakers
              shaping the future of legal technology
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search members by name, organization..."
                  className="pl-10 pr-4 py-2 border-neutral-300 focus:border-black focus:ring-black rounded-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={filter.active ? "default" : "outline"}
                    size="sm"
                    className={`rounded-none transition-all duration-200 text-xs uppercase font-mono tracking-wider cursor-pointer ${
                      filter.active
                        ? "bg-black hover:bg-neutral-800 !text-white border-black"
                        : "border-neutral-300 text-black hover:border-black hover:bg-neutral-50"
                    }`}
                  >
                    {filter.label}
                    <Badge
                      variant="secondary"
                      className={`ml-2 text-[10px] rounded-none ${
                        filter.active
                          ? "bg-neutral-800 text-white"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* City Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <select
                  className="pl-9 pr-8 py-2 border border-neutral-300 rounded-none text-xs font-mono uppercase tracking-wider focus:border-black focus:ring-black bg-white cursor-pointer"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  aria-label="Filter by city"
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-black mb-2">
                  No members found
                </h3>
                <p className="text-neutral-500 font-sans text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="border border-neutral-200 shadow-sm hover:shadow-md hover:border-black transition-all duration-300 overflow-hidden group bg-white rounded-none flex flex-col justify-between"
                    >
                      <CardContent className="p-0">
                        {/* Header with Avatar */}
                        <div className="relative bg-black p-6 text-white border-b border-neutral-800">
                          <div className="absolute top-4 right-4">
                            {member.verified && (
                              <div className="flex items-center gap-1 bg-white text-black px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider">
                                <Verified className="h-3 w-3" />
                                Verified
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <Avatar className="w-14 h-14 border border-neutral-700 rounded-none">
                              <AvatarImage
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                              />
                              <AvatarFallback className="bg-neutral-800 text-white font-mono text-sm rounded-none">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-serif text-white truncate">
                                {member.name}
                              </h3>
                              <p className="text-neutral-300 text-xs font-sans truncate">
                                {member.title}
                              </p>
                            </div>
                          </div>
                          <p className="text-neutral-400 text-xs font-sans truncate">
                            {member.organization}
                          </p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Location and Member Since */}
                          <div className="flex items-center justify-between mb-4 text-xs font-mono uppercase tracking-wider text-neutral-500">
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1.5 text-neutral-400" />
                              <span>{member.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                              <span>Since {member.memberSince}</span>
                            </div>
                          </div>

                          {/* Expertise */}
                          <div className="mb-4">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                              Expertise
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.expertise
                                .slice(0, 3)
                                .map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-[11px] rounded-none border-neutral-300 text-neutral-700 bg-neutral-50 hover:bg-neutral-100"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {member.expertise.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-[11px] rounded-none border-neutral-300 text-neutral-500 bg-neutral-50"
                                >
                                  +{member.expertise.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Committees */}
                          {member.committees &&
                            member.committees.length > 0 && (
                              <div className="mb-6">
                                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                                  Committees
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {member.committees.map((committee, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-none text-[11px] font-mono uppercase tracking-wider"
                                    >
                                      {committee}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Social Links */}
                          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                            <div className="flex space-x-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-neutral-300 text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-100 rounded-none h-8 w-8 p-0"
                                asChild
                              >
                                <Link href={member.social.linkedin} aria-label="LinkedIn">
                                  <Linkedin className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-neutral-300 text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-100 rounded-none h-8 w-8 p-0"
                                asChild
                              >
                                <Link href={member.social.twitter} aria-label="Twitter">
                                  <Twitter className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-neutral-300 text-neutral-700 hover:border-black hover:text-black hover:bg-neutral-100 rounded-none h-8 w-8 p-0"
                                asChild
                              >
                                <Link href={`mailto:${member.social.email}`} aria-label="Email">
                                  <Mail className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              className="bg-black hover:bg-neutral-800 !text-white rounded-none px-4 text-xs font-mono uppercase tracking-wider cursor-pointer"
                            >
                              Connect
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Results Info */}
                <div className="text-center mt-12">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                    Showing {filteredMembers.length} of {members.length} members
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
