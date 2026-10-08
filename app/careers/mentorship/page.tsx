"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generateMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Star,
  Clock,
  Target,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  experience: string;
  bio: string;
  image?: string;
  rating: number;
  availability: string;
  specialization: string;
  sessions: number;
  mentees: number;
  linkedin?: string;
  email?: string;
  active: boolean;
}

const programBenefits = [
  {
    icon: Users,
    title: "1-on-1 Mentoring",
    description:
      "Personalized guidance from industry experts tailored to your career goals and interests",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description:
      "Structured program with clear milestones and measurable outcomes for your development",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Access to exclusive content, case studies, and industry insights from our knowledge base",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Certification",
    description:
      "Receive a certificate of completion and recognition for your participation in the program",
    color: "from-orange-500 to-orange-600",
  },
];

const programStats = [
  {
    label: "Active Mentors",
    value: "50+",
    icon: Users,
    color: "text-white",
    bg: "bg-black",
  },
  {
    label: "Success Rate",
    value: "92%",
    icon: Star,
    color: "text-white",
    bg: "bg-black",
  },
  {
    label: "Program Duration",
    value: "6 months",
    icon: Clock,
    color: "text-white",
    bg: "bg-black",
  },
  {
    label: "Career Advancement",
    value: "78%",
    icon: TrendingUp,
    color: "text-white",
    bg: "bg-black",
  },
];

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Legal Tech Analyst",
    company: "TechCorp Legal",
    content:
      "The mentorship program was transformative for my career. My mentor helped me navigate the complex world of legal technology and land my dream job.",
    image: "/images/testimonial-rahul.jpg",
    mentor: "Dr. Priya Sharma",
    rating: 5,
    outcome: "Promoted to Senior Analyst",
  },
  {
    name: "Sneha Gupta",
    role: "Blockchain Developer",
    company: "CryptoLegal Solutions",
    content:
      "Working with my mentor gave me the confidence and knowledge to transition into blockchain law. The guidance was invaluable.",
    image: "/images/testimonial-sneha.jpg",
    mentor: "Arjun Reddy",
    rating: 5,
    outcome: "Career Transition Success",
  },
  {
    name: "Amit Patel",
    role: "Privacy Consultant",
    company: "DataSecure Legal",
    content:
      "The structured approach and expert guidance helped me develop specialized skills in data protection law. Highly recommended!",
    image: "/images/testimonial-amit.jpg",
    mentor: "Meera Patel",
    rating: 5,
    outcome: "Started Own Practice",
  },
];

export default function MentorshipPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch("/api/careers/mentors");

        // Check if response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Server returned an invalid response. Please try again later."
          );
        }

        const data = await response.json();

        // Even if response is not OK, try to use the mentors array if available
        if (data.mentors) {
          setMentors(data.mentors);
          setError(null);
        } else if (!response.ok) {
          throw new Error(data.message || "Failed to fetch mentors");
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load mentors. Please try again later."
        );
        if (mentors.length === 0) {
          setMentors([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-slate-900 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading mentors...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Error Loading Mentors
          </h2>
          <p className="text-slate-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-6">
            Try Again
          </Button>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Users className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Career Development</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Mentorship Program
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              Connect with industry experts and accelerate your career in legal
              technology through personalized mentorship and structured guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white !text-black hover:bg-neutral-200 px-8 py-3 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer"
                asChild
              >
                <Link href="#application">
                  Apply for Mentorship
                  <ArrowRight className="ml-2 h-4 w-4 !text-black" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-400 text-white hover:bg-white hover:!text-black px-8 py-3 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer"
                asChild
              >
                <Link href="#mentors">Meet Our Mentors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Stats */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {programStats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg text-center group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-20 h-20 ${stat.bg} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className={`h-10 w-10 ${stat.color}`} />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-slate-600 font-medium text-lg">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                <Award className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Program Benefits
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Accelerate Your Growth
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our comprehensive mentorship program is designed to accelerate
                your career growth and professional development through
                structured guidance and expert insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {programBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg text-center group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full mb-6">
                <Users className="h-4 w-4 mr-2 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Expert Mentors
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Meet Our Mentors
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Learn from industry leaders and experts who are passionate about
                sharing their knowledge and helping you succeed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentors.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    No Mentors Available
                  </h3>
                  <p className="text-slate-600">
                    Check back soon for available mentors.
                  </p>
                </div>
              ) : (
                mentors.map((mentor) => (
                  <Card
                    key={mentor.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group bg-gradient-to-br from-white to-slate-50"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={
                            mentor.availability === "Available"
                              ? "bg-emerald-500 text-white shadow-lg"
                              : "bg-yellow-500 text-white shadow-lg"
                          }
                        >
                          {mentor.availability}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="font-semibold">{mentor.rating}</span>
                          <span>•</span>
                          <span>{mentor.sessions} sessions</span>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30">
                          {mentor.specialization}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                          {mentor.name}
                        </CardTitle>
                        <p className="text-sm font-semibold text-blue-600">
                          {mentor.role}
                        </p>
                        <p className="text-xs text-slate-500">
                          {mentor.company}
                        </p>
                      </CardHeader>

                      <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                        {mentor.bio}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.slice(0, 2).map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs border-slate-300 text-slate-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {mentor.expertise.length > 2 && (
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-300 text-slate-700"
                            >
                              +{mentor.expertise.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <span className="font-medium">
                          {mentor.experience} experience
                        </span>
                        <span className="font-medium">
                          {mentor.mentees} mentees
                        </span>
                      </div>

                      <Button
                        size="sm"
                        className={`w-full ${
                          mentor.availability === "Available"
                            ? "bg-slate-900 hover:bg-slate-800 text-white"
                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        } shadow-lg`}
                        disabled={mentor.availability === "Limited"}
                        onClick={() => {
                          if (status === "unauthenticated") {
                            router.push(
                              `/login?callbackUrl=/careers/mentorship`
                            );
                          } else {
                            // Scroll to application form
                            document
                              .getElementById("application")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        {status === "unauthenticated"
                          ? "Sign in to Request"
                          : mentor.availability === "Available"
                          ? "Request Mentorship"
                          : "Join Waitlist"}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="application"
        className="py-24 bg-gradient-to-br from-slate-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                <MessageSquare className="h-4 w-4 mr-2 text-purple-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Application
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Apply for Mentorship
              </h2>
              <p className="text-xl text-slate-600">
                Take the first step towards accelerating your career in legal
                technology
              </p>
            </div>

            {status === "unauthenticated" ? (
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Sign In Required
                  </h3>
                  <p className="text-slate-600 mb-8">
                    You need to be signed in to apply for mentorship. Please
                    sign in or create an account to continue.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() =>
                        router.push("/login?callbackUrl=/careers/mentorship")
                      }
                      className="bg-slate-900 hover:bg-slate-800"
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() =>
                        router.push("/register?callbackUrl=/careers/mentorship")
                      }
                    >
                      Create Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <form className="space-y-8">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          First Name *
                        </label>
                        <Input
                          placeholder="Enter your first name"
                          className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          Last Name *
                        </label>
                        <Input
                          placeholder="Enter your last name"
                          className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg"
                      />
                    </div>

                    {/* Professional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          Current Role *
                        </label>
                        <Input
                          placeholder="Your current job title"
                          className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          Organization
                        </label>
                        <Input
                          placeholder="Your current organization"
                          className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          Experience Level *
                        </label>
                        <Select required>
                          <SelectTrigger className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">
                              Entry Level (0-2 years)
                            </SelectItem>
                            <SelectItem value="mid">
                              Mid Level (3-5 years)
                            </SelectItem>
                            <SelectItem value="senior">
                              Senior Level (6-10 years)
                            </SelectItem>
                            <SelectItem value="executive">
                              Executive Level (10+ years)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          Area of Interest *
                        </label>
                        <Select required>
                          <SelectTrigger className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg">
                            <SelectValue placeholder="Select your area of interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai-governance">
                              AI Governance
                            </SelectItem>
                            <SelectItem value="blockchain-law">
                              Blockchain Law
                            </SelectItem>
                            <SelectItem value="cybersecurity">
                              Cybersecurity Law
                            </SelectItem>
                            <SelectItem value="data-privacy">
                              Data Privacy
                            </SelectItem>
                            <SelectItem value="legal-tech">
                              Legal Technology
                            </SelectItem>
                            <SelectItem value="digital-courts">
                              Digital Courts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                        Preferred Mentor
                      </label>
                      <Select>
                        <SelectTrigger className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3 text-lg">
                          <SelectValue placeholder="Select a preferred mentor (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {mentors.map((mentor) => (
                            <SelectItem
                              key={mentor.id}
                              value={mentor.id.toString()}
                            >
                              {mentor.name} - {mentor.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Goals and Motivation */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                        Career Goals *
                      </label>
                      <Textarea
                        placeholder="Describe your career goals and what you hope to achieve through this mentorship program..."
                        className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 min-h-[140px] text-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                        Why do you want to join this program? *
                      </label>
                      <Textarea
                        placeholder="Tell us about your motivation and what specific areas you'd like guidance on..."
                        className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 min-h-[140px] text-lg"
                        required
                      />
                    </div>

                    {/* Commitment */}
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">
                        Program Commitment
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                          <div className="text-slate-700">
                            <strong className="font-semibold">Duration:</strong>{" "}
                            6-month program with monthly check-ins and progress
                            reviews
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                          <div className="text-slate-700">
                            <strong className="font-semibold">
                              Time Commitment:
                            </strong>{" "}
                            2-3 hours per month for mentoring sessions and
                            assignments
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                          <div className="text-slate-700">
                            <strong className="font-semibold">
                              Requirements:
                            </strong>{" "}
                            Active participation and completion of assigned
                            tasks and goals
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xl py-6 shadow-lg"
                    >
                      Submit Application
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>

                    <p className="text-slate-500 text-center text-lg">
                      Applications are reviewed on a rolling basis. You'll hear
                      back from us within 2 weeks.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-6">
                <Star className="h-4 w-4 mr-2 text-yellow-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Success Stories
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Transformative Experiences
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Hear from our mentees about their journey and the impact our
                mentorship program had on their careers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg text-center bg-gradient-to-br from-white to-slate-50 hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-current text-yellow-400"
                        />
                      ))}
                    </div>

                    <blockquote className="text-slate-600 mb-6 italic leading-relaxed text-lg">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="mb-4">
                      <p className="font-bold text-slate-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-slate-500">
                        {testimonial.company}
                      </p>
                    </div>

                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-3">
                      {testimonial.outcome}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="text-xs border-slate-300 text-slate-700"
                    >
                      Mentored by {testimonial.mentor}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
