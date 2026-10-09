"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Compass,
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

const DEFAULT_MENTOR_IMAGES: Record<string, string> = {
  "Dr. Anjali Sharma": "/members/prerna-kapoor.png",
  "Rajesh Kumar": "/members/subhash-bhutoria.png",
  "Priya Menon": "/images/member-1.jpg",
  "Vikram Desai": "/members/mayank-grover.png",
  "Kavita Iyer": "/images/member-4.jpg",
  "Arjun Nair": "/members/sukanta-dey.png",
};

const DEFAULT_TESTIMONIAL_IMAGES: Record<string, string> = {
  "Rahul Kumar": "/members/neil-dawes.png",
  "Sneha Gupta": "/images/roopa.jpg",
  "Amit Patel": "/members/girija-krishan-varma.png",
};

function ProfileAvatar({
  name,
  image,
  className = "",
  monogramClassName = "text-xl",
}: {
  name: string;
  image?: string | null;
  className?: string;
  monogramClassName?: string;
}) {
  const [imageError, setImageError] = useState(false);

  const initials =
    name
      .replace(/^Dr\.\s+|^Adv\.\s+/i, "")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BS";

  if (image && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-black text-white border border-neutral-800 font-serif select-none ${className}`}
    >
      <span className={`tracking-widest ${monogramClassName}`}>{initials}</span>
    </div>
  );
}

const programBenefits = [
  {
    icon: Users,
    title: "1-on-1 Mentoring",
    description:
      "Personalized guidance from industry experts tailored to your career goals and interests",
  },
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description:
      "Structured program with clear milestones and measurable outcomes for your development",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Access to exclusive content, case studies, and industry insights from our knowledge base",
  },
  {
    icon: Award,
    title: "Certification",
    description:
      "Receive a certificate of completion and recognition for your participation in the program",
  },
];

const programStats = [
  {
    label: "Active Mentors",
    value: "50+",
    icon: Users,
  },
  {
    label: "Success Rate",
    value: "92%",
    icon: Star,
  },
  {
    label: "Program Duration",
    value: "6 months",
    icon: Clock,
  },
  {
    label: "Career Advancement",
    value: "78%",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Legal Tech Analyst",
    company: "TechCorp Legal",
    content:
      "The mentorship program was transformative for my career. My mentor helped me navigate the complex world of legal technology and land my dream job.",
    image: DEFAULT_TESTIMONIAL_IMAGES["Rahul Kumar"],
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
    image: DEFAULT_TESTIMONIAL_IMAGES["Sneha Gupta"],
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
    image: DEFAULT_TESTIMONIAL_IMAGES["Amit Patel"],
    mentor: "Meera Patel",
    rating: 5,
    outcome: "Started Own Practice",
  },
];

export default function MentorshipPage() {
  const router = useRouter();
  const { status } = useSession();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch("/api/careers/mentors");

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned an invalid response. Please try again later.");
        }

        const data = await response.json();

        if (data.mentors) {
          setMentors(data.mentors);
          setError(null);
        } else if (!response.ok) {
          throw new Error(data.message || "Failed to fetch mentors");
        }
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load mentors. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-black mx-auto mb-4" />
          <p className="text-neutral-600 text-xs font-mono uppercase tracking-widest">
            Loading mentors...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-8 border border-neutral-200">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4 font-mono text-xl">
            !
          </div>
          <h2 className="text-2xl font-serif text-black mb-2">
            Error Loading Mentors
          </h2>
          <p className="text-neutral-600 text-sm mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider"
          >
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
              <Compass className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Career Development</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Mentorship Program
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              Connect with industry leaders and accelerate your career in legal
              technology through personalized 1-on-1 mentorship and structured guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white !text-black hover:bg-neutral-200 px-8 py-3.5 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer border border-white"
                asChild
              >
                <Link href="#application">
                  Apply for Mentorship
                  <ArrowRight className="ml-2 h-4 w-4 !text-black" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-transparent border border-white !text-white hover:bg-white hover:!text-black px-8 py-3.5 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors"
                asChild
              >
                <Link href="#mentors">Meet Our Mentors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Stats */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {programStats.map((stat, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 bg-white p-8 text-center hover:border-black transition-colors"
                >
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4 border border-neutral-800">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-3xl font-serif text-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 text-xs font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                <Award className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Program Benefits</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Accelerate Your Growth
              </h2>
              <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                Our structured mentorship initiative provides targeted career acceleration,
                direct industry advisory, and comprehensive professional development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 bg-white rounded-none shadow-none text-center p-8 hover:border-black transition-all group"
                >
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-black text-white flex items-center justify-center mx-auto mb-6 rounded-none group-hover:bg-neutral-900 transition-colors border border-neutral-800">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-serif text-black mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
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
      <section id="mentors" className="py-24 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                <Users className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Expert Mentors</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Meet Our Mentors
              </h2>
              <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                Learn from industry authorities, legal tech architects, and senior policy advisors
                who actively shape the field.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.length === 0 ? (
                <div className="col-span-full text-center py-16 border border-neutral-200 p-8">
                  <Users className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-serif text-black mb-2">
                    No Mentors Available
                  </h3>
                  <p className="text-neutral-600 text-sm font-sans">
                    Check back soon for available mentors or join the waitlist below.
                  </p>
                </div>
              ) : (
                mentors.map((mentor) => {
                  const resolvedImage =
                    mentor.image || DEFAULT_MENTOR_IMAGES[mentor.name] || null;

                  return (
                    <Card
                      key={mentor.id}
                      className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group overflow-hidden"
                    >
                      {/* Mentor Avatar Header */}
                      <div className="relative h-64 w-full bg-neutral-900 border-b border-neutral-200">
                        <ProfileAvatar
                          name={mentor.name}
                          image={resolvedImage}
                          className="w-full h-full"
                          monogramClassName="text-3xl font-serif"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Availability Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge
                            className={`rounded-none font-mono text-[10px] uppercase tracking-wider ${
                              mentor.availability === "Available"
                                ? "bg-black text-white border border-neutral-700"
                                : "bg-neutral-800 text-neutral-300 border border-neutral-600"
                            }`}
                          >
                            {mentor.availability}
                          </Badge>
                        </div>

                        {/* Specialization & Sessions */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-1.5">
                            <span className="flex items-center gap-1 text-white">
                              <Star className="h-3.5 w-3.5 fill-white text-white" />
                              {mentor.rating}
                            </span>
                            <span className="text-neutral-400">•</span>
                            <span className="text-neutral-300">{mentor.sessions} sessions</span>
                          </div>
                          <Badge className="bg-white/20 text-white border border-white/30 rounded-none font-mono text-[10px] uppercase tracking-wider">
                            {mentor.specialization}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-1">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl font-serif text-black mb-1">
                            {mentor.name}
                          </CardTitle>
                          <p className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                            {mentor.role}
                          </p>
                          <p className="text-xs text-neutral-500 font-sans">
                            {mentor.company}
                          </p>
                        </CardHeader>

                        <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6 line-clamp-3">
                          {mentor.bio}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {mentor.expertise.slice(0, 3).map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-[10px] font-mono uppercase tracking-wider border-neutral-200 text-neutral-700 rounded-none bg-neutral-50"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {mentor.expertise.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-[10px] font-mono uppercase tracking-wider border-neutral-200 text-neutral-500 rounded-none bg-neutral-50"
                              >
                                +{mentor.expertise.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 py-3 border-y border-neutral-100 mb-6 mt-auto">
                          <span>{mentor.experience} Exp</span>
                          <span>{mentor.mentees} Mentees</span>
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-2.5 cursor-pointer"
                          disabled={mentor.availability === "Limited"}
                          onClick={() => {
                            if (status === "unauthenticated") {
                              router.push(`/login?callbackUrl=/careers/mentorship`);
                            } else {
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
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                <Star className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Transformative Experiences
              </h2>
              <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                Real accounts from mentees whose trajectory advanced through our structured mentorship cohort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 bg-white rounded-none shadow-none text-center p-8 hover:border-black transition-all flex flex-col"
                >
                  <CardContent className="p-0 flex flex-col flex-1">
                    {/* Custom Avatar Container */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border border-neutral-300">
                      <ProfileAvatar
                        name={testimonial.name}
                        image={testimonial.image}
                        className="w-full h-full"
                        monogramClassName="text-lg font-serif"
                      />
                    </div>

                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-black text-black"
                        />
                      ))}
                    </div>

                    <blockquote className="text-neutral-700 mb-6 italic leading-relaxed text-sm font-sans flex-1">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    <div className="mb-4 pt-4 border-t border-neutral-100">
                      <p className="font-serif text-black text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-xs font-mono uppercase tracking-wider text-neutral-600 font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-neutral-400 font-sans">
                        {testimonial.company}
                      </p>
                    </div>

                    <div className="mt-auto space-y-2">
                      <Badge className="bg-black text-white border border-neutral-800 rounded-none text-[10px] font-mono uppercase tracking-wider w-full justify-center">
                        {testimonial.outcome}
                      </Badge>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                        Mentored by {testimonial.mentor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                <MessageSquare className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Application</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Apply for Mentorship
              </h2>
              <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                Submit your profile and areas of focus. Applications are reviewed on a rolling basis.
              </p>
            </div>

            {status === "unauthenticated" ? (
              <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-black mb-3">
                    Sign In Required
                  </h3>
                  <p className="text-neutral-600 text-sm max-w-md mx-auto mb-8 font-sans">
                    You need to be signed in to apply for mentorship. Please sign in or create an
                    account to continue.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() =>
                        router.push("/login?callbackUrl=/careers/mentorship")
                      }
                      className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider px-8"
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() =>
                        router.push("/register?callbackUrl=/careers/mentorship")
                      }
                      className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider px-8"
                    >
                      Create Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                <CardContent className="p-8 md:p-12">
                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          First Name *
                        </label>
                        <Input
                          placeholder="Your first name"
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Last Name *
                        </label>
                        <Input
                          placeholder="Your last name"
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="you@domain.com"
                        className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 (optional)"
                        className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                      />
                    </div>

                    {/* Professional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Current Role *
                        </label>
                        <Input
                          placeholder="e.g. Legal Analyst"
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Organization
                        </label>
                        <Input
                          placeholder="Current firm or company"
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Experience Level *
                        </label>
                        <Select required>
                          <SelectTrigger className="border-neutral-300 rounded-none focus:border-black text-sm">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                            <SelectItem value="executive">Executive Level (10+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Area of Interest *
                        </label>
                        <Select required>
                          <SelectTrigger className="border-neutral-300 rounded-none focus:border-black text-sm">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="ai-governance">AI Governance</SelectItem>
                            <SelectItem value="blockchain-law">Blockchain & Smart Contracts</SelectItem>
                            <SelectItem value="cybersecurity">Cybersecurity Law</SelectItem>
                            <SelectItem value="data-privacy">Data Privacy & DPDP</SelectItem>
                            <SelectItem value="legal-tech">Legal Technology</SelectItem>
                            <SelectItem value="digital-courts">Digital Courts & Dispute Resolution</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                        Preferred Mentor
                      </label>
                      <Select>
                        <SelectTrigger className="border-neutral-300 rounded-none focus:border-black text-sm">
                          <SelectValue placeholder="Select a preferred mentor (optional)" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          {mentors.map((mentor) => (
                            <SelectItem key={mentor.id} value={mentor.id.toString()}>
                              {mentor.name} — {mentor.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Goals and Motivation */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                        Career Goals *
                      </label>
                      <Textarea
                        placeholder="Describe your goals and what you hope to achieve during the mentorship cohort..."
                        className="border-neutral-300 rounded-none focus:border-black focus:ring-0 min-h-[120px] text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                        Why do you want to join? *
                      </label>
                      <Textarea
                        placeholder="Detail your motivation and specific technical/legal competencies you want guidance on..."
                        className="border-neutral-300 rounded-none focus:border-black focus:ring-0 min-h-[120px] text-sm"
                        required
                      />
                    </div>

                    {/* Commitment Box */}
                    <div className="bg-neutral-50 p-6 border border-neutral-200">
                      <h3 className="text-sm font-mono uppercase tracking-wider text-black font-semibold mb-4">
                        Program Commitment
                      </h3>
                      <div className="space-y-3 text-xs text-neutral-700 font-sans">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Duration:</strong> 6-month structured program with monthly reviews
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Time Commitment:</strong> 2-3 hours per month for sessions and preparation
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Requirement:</strong> Active participation and progress on stated milestones
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-4 cursor-pointer"
                    >
                      Submit Application
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-neutral-500 text-center text-xs font-mono">
                      Applications are reviewed on a rolling basis. You will hear back within 14 days.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
