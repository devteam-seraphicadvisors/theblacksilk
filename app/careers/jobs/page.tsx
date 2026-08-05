"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";
import {
  generateJobPostingSchema,
  generateBreadcrumbSchema,
} from "@/lib/json-ld";

// This page is publicly accessible - no authentication required
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Clock,
  Users,
  Search,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Star,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  skills: string[];
  featured: boolean;
  urgency: string;
  status: string;
  applicants: number;
  createdAt: string;
}

const departments = [
  { name: "All Departments", count: 24, active: true },
  { name: "Consulting", count: 6 },
  { name: "Research", count: 4 },
  { name: "Legal", count: 8 },
  { name: "Policy", count: 3 },
  { name: "Product", count: 3 },
];

const benefits = [
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description:
      "Continuous learning opportunities, conference attendance, and skill development programs",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description:
      "Work with leading experts in law, technology, and policy in a collaborative setting",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Briefcase,
    title: "Flexible Work",
    description:
      "Hybrid work options, flexible hours, and work-life balance initiatives",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: MapPin,
    title: "Multiple Locations",
    description:
      "Offices in major cities across India with opportunities for travel and remote work",
    color: "from-orange-500 to-orange-600",
  },
];

const companyStats = [
  { label: "Team Members", value: "150+", icon: Users, color: "text-blue-600" },
  {
    label: "Growth Rate",
    value: "45%",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
  {
    label: "Employee Satisfaction",
    value: "4.8/5",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    label: "Retention Rate",
    value: "92%",
    icon: Briefcase,
    color: "text-purple-600",
  },
];

export default function JobsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Home", item: "https://theblacksilk.org" },
    { name: "Careers", item: "https://theblacksilk.org/careers" },
    { name: "Jobs", item: "https://theblacksilk.org/careers/jobs" },
  ]);

  const jobPostingsLd = jobs.map((job) => generateJobPostingSchema(job));

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/careers/jobs");

        // Check if response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Server returned an invalid response. Please try again later."
          );
        }

        const data = await response.json();

        // Even if response is not OK, try to use the jobs array if available
        if (data.jobs) {
          setJobs(data.jobs);
          setError(null);
        } else if (!response.ok) {
          throw new Error(data.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load job openings. Please try again later."
        );
        // Don't leave jobs empty if we already have some
        if (jobs.length === 0) {
          setJobs([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const featuredJobs = jobs.filter((job) => job.featured);
  const regularJobs = jobs.filter((job) => !job.featured);

  const getPostedTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) > 1 ? "s" : ""
    } ago`;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const handleApplyClick = (jobId: string) => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/careers/jobs/${jobId}/apply`);
    } else {
      router.push(`/careers/jobs/${jobId}/apply`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-slate-900 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading job openings...</p>
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
            Error Loading Jobs
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {jobPostingsLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingsLd) }}
        />
      )}
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/careers-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Briefcase className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">
                Join Our Mission • No Login Required
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Build the Future
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Shape the future of legal technology. Join our mission to
              transform legal practice through innovation, collaboration, and
              cutting-edge solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
              >
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search jobs by title, skills, or location..."
                  className="pl-12 pr-4 py-4 border-slate-200 focus:border-slate-400 focus:ring-slate-400 bg-white shadow-sm text-lg"
                />
              </div>

              {/* Department Filters */}
              <div className="flex flex-wrap gap-3">
                {departments.slice(0, 4).map((dept) => (
                  <Button
                    key={dept.name}
                    variant={dept.active ? "default" : "outline"}
                    size="lg"
                    className={
                      dept.active
                        ? "bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }
                  >
                    {dept.name}
                    <Badge
                      variant="secondary"
                      className="ml-3 bg-slate-100 text-slate-700"
                    >
                      {dept.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No Jobs Available State */}
      {!loading && jobs.length === 0 && !error && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                No Open Positions Currently
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We don't have any open positions at the moment, but we're always
                looking for talented individuals. Check back soon or join our
                talent network to be notified of new opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.reload()}
                  className="border-slate-300"
                >
                  Refresh Page
                </Button>
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Join Talent Network
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                  <Star className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    Featured Opportunities
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Premium Positions
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  High-impact roles that are currently in high demand and offer
                  exceptional growth opportunities
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br from-white to-slate-50 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-2">
                          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            Featured
                          </Badge>
                          <Badge
                            className={`border ${getUrgencyColor(job.urgency)}`}
                          >
                            {job.urgency === "high"
                              ? "Urgent"
                              : job.urgency === "medium"
                              ? "Priority"
                              : "Standard"}
                          </Badge>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-slate-300 text-slate-700"
                        >
                          {job.department}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </CardTitle>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {job.description}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Clock className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                          <span className="font-medium">
                            {job.applicants} applicants
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="border-slate-300 text-slate-700 bg-slate-50"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div>
                          <div className="text-2xl font-bold text-slate-900">
                            {job.salary}
                          </div>
                          <div className="text-sm text-slate-500">
                            Posted {job.posted}
                          </div>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg px-6 py-3"
                          onClick={() => handleApplyClick(job.id)}
                        >
                          {status === "unauthenticated"
                            ? "Sign in to Apply"
                            : "Apply Now"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Jobs */}
      {regularJobs.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-12">
                All Open Positions
              </h2>

              <div className="space-y-6">
                {regularJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 group bg-white"
                  >
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="border-slate-300 text-slate-700"
                            >
                              {job.department}
                            </Badge>
                            <Badge
                              className={`border ${getUrgencyColor(
                                job.urgency
                              )}`}
                            >
                              {job.urgency === "high"
                                ? "Urgent"
                                : job.urgency === "medium"
                                ? "Priority"
                                : "Standard"}
                            </Badge>
                          </div>

                          <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-6 text-slate-600 mb-6">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span className="font-medium">
                                {job.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              <span className="font-medium">
                                {job.experience}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span className="font-medium">
                                {job.applicants} applicants
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="border-slate-300 text-slate-700 bg-slate-50"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge
                                variant="outline"
                                className="border-slate-300 text-slate-700 bg-slate-50"
                              >
                                +{job.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="lg:ml-8 mt-6 lg:mt-0 text-right">
                          <div className="text-2xl font-bold text-slate-900 mb-2">
                            {job.salary}
                          </div>
                          <div className="text-sm text-slate-500 mb-6">
                            Posted {getPostedTime(job.createdAt)}
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-slate-300 text-slate-700 hover:bg-slate-50"
                              asChild
                            >
                              <Link href={`/careers/jobs/${job.id}`}>
                                View Details
                              </Link>
                            </Button>
                            <Button
                              size="lg"
                              className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
                              onClick={() => handleApplyClick(job.id)}
                            >
                              {status === "unauthenticated"
                                ? "Sign in to Apply"
                                : "Apply"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              {jobs.length === 0 && !loading && (
                <div className="text-center py-16">
                  <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    No Job Openings
                  </h3>
                  <p className="text-slate-600">
                    There are currently no open positions. Check back soon!
                  </p>
                </div>
              )}
              {jobs.length > 0 && (
                <div className="text-center mt-16">
                  <p className="text-slate-500 mt-4 text-lg">
                    Showing {jobs.length} open position
                    {jobs.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Join Us?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                We offer more than just a job - we provide a platform to make a
                real impact on the future of legal technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
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

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Don't see the perfect role? We're always looking for talented
              individuals to join our mission of transforming legal technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/careers/mentorship">Explore Mentorship</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
                asChild
              >
                <Link href="/get-involved/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
