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
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/directory-hero.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Users className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">
                500+ Active Members
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Member Directory
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Connect with legal professionals, technologists, and policymakers
              shaping the future of legal technology
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search members by name, organization, or expertise..."
                  className="pl-12 pr-4 py-3 border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-xl"
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
                    className={`rounded-full transition-all duration-200 ${
                      filter.active
                        ? "bg-gray-900 hover:bg-black text-white shadow-lg"
                        : "border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                    }`}
                  >
                    {filter.label}
                    <Badge
                      variant="secondary"
                      className={`ml-2 text-xs ${
                        filter.active
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* City Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl text-sm focus:border-gray-900 focus:ring-gray-900 bg-white"
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No members found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white rounded-2xl"
                    >
                      <CardContent className="p-0">
                        {/* Header with Avatar */}
                        <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 text-white">
                          <div className="absolute top-4 right-4">
                            {member.verified && (
                              <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                <Verified className="h-3 w-3" />
                                Verified
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="w-16 h-16 border-3 border-white/20 shadow-lg">
                              <AvatarImage
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                              />
                              <AvatarFallback className="bg-white/20 text-white font-semibold">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-1 text-white group-hover:text-gray-200 transition-colors">
                                {member.name}
                              </h3>
                              <p className="text-white/80 text-sm font-medium">
                                {member.title}
                              </p>
                            </div>
                          </div>
                          <p className="text-white/70 text-sm">
                            {member.organization}
                          </p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Location and Member Since */}
                          <div className="flex items-center justify-between mb-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="font-medium">
                                {member.location}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              <span className="font-medium">
                                Since {member.memberSince}
                              </span>
                            </div>
                          </div>

                          {/* Expertise */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                              Expertise
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {member.expertise
                                .slice(0, 3)
                                .map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {member.expertise.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-gray-300 text-gray-500 bg-gray-50"
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
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                  Committees
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {member.committees.map((committee, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium"
                                    >
                                      {committee}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Social Links */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                asChild
                              >
                                <Link href={member.social.linkedin}>
                                  <Linkedin className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                                asChild
                              >
                                <Link href={member.social.twitter}>
                                  <Twitter className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                                asChild
                              >
                                <Link href={`mailto:${member.social.email}`}>
                                  <Mail className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gray-900 hover:bg-black text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-lg px-4"
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
                <div className="text-center mt-16">
                  <p className="text-sm text-gray-500">
                    Showing {filteredMembers.length} of {members.length} members
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Connect with like-minded professionals and expand your network in
              legal technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8 py-3 font-semibold"
                asChild
              >
                <Link href="/community/membership">Become a Member</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-gray-900 hover:bg-white hover:text-gray-900 rounded-xl px-8 py-3 font-semibold transition-all duration-200"
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
