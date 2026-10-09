"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generateJobPostingSchema, generateBreadcrumbSchema } from "@/lib/json-ld";
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
  TrendingUp,
  Loader2,
  Building,
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
      "Continuous learning opportunities, conference attendance, and specialized skill development programs.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description:
      "Work with leading authorities in law, technology, and public policy in a collaborative setting.",
  },
  {
    icon: Briefcase,
    title: "Flexible Work",
    description:
      "Hybrid work models, flexible engagements, and meaningful professional autonomy.",
  },
  {
    icon: MapPin,
    title: "Multiple Locations",
    description:
      "Offices across major innovation centers in India with options for remote collaboration.",
  },
];

const companyStats = [
  { label: "Team Members", value: "150+", icon: Users },
  { label: "Annual Growth", value: "45%", icon: TrendingUp },
  { label: "Partner Institutions", value: "80+", icon: Building },
  { label: "Retention Rate", value: "94%", icon: Briefcase },
];

export default function JobsPage() {
  const router = useRouter();
  const { status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");

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

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned an invalid response. Please try again later.");
        }

        const data = await response.json();

        if (data.jobs) {
          setJobs(data.jobs);
          setError(null);
        } else if (!response.ok) {
          throw new Error(data.message || "Failed to fetch jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load job openings. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesDept =
      selectedDepartment === "All Departments" ||
      job.department.toLowerCase() === selectedDepartment.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const featuredJobs = filteredJobs.filter((job) => job.featured);
  const regularJobs = filteredJobs.filter((job) => !job.featured);

  const getPostedTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) > 1 ? "s" : ""
    } ago`;
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === "high") {
      return (
        <Badge className="bg-black text-white border border-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider">
          Urgent
        </Badge>
      );
    }
    if (urgency === "medium") {
      return (
        <Badge className="bg-neutral-800 text-white border border-neutral-600 rounded-none font-mono text-[10px] uppercase tracking-wider">
          Priority
        </Badge>
      );
    }
    return (
      <Badge className="bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-none font-mono text-[10px] uppercase tracking-wider">
        Standard
      </Badge>
    );
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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-black mx-auto mb-4" />
          <p className="text-neutral-600 text-xs font-mono uppercase tracking-widest">
            Loading job openings...
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
            Error Loading Jobs
          </h2>
          <p className="text-neutral-600 text-sm mb-6 font-sans">{error}</p>
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
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Briefcase className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Career Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Build the Future
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              Shape the vanguard of legal technology, cyber jurisprudence, and digital policy.
              Join our mission to redefine legal practice through rigorous innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white !text-black hover:bg-neutral-200 px-8 py-3.5 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer border border-white"
                asChild
              >
                <Link href="#open-positions">
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4 !text-black" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-transparent border border-white !text-white hover:bg-white hover:!text-black px-8 py-3.5 rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors"
                asChild
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {companyStats.map((stat, index) => (
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

      {/* Search and Filter */}
      <section id="open-positions" className="py-12 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, skills, or role..."
                  className="pl-10 pr-4 py-3 border-neutral-300 bg-white rounded-none focus:border-black focus:ring-0 text-sm"
                />
              </div>

              {/* Department Filters */}
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => {
                  const isActive = selectedDepartment === dept.name;
                  return (
                    <Button
                      key={dept.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDepartment(dept.name)}
                      className={`rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer ${
                        isActive
                          ? "bg-black text-white hover:bg-neutral-800 border-black"
                          : "border-neutral-300 text-black hover:bg-neutral-100 bg-white"
                      }`}
                    >
                      {dept.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-20 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                  <Briefcase className="h-3.5 w-3.5 mr-2 text-white" />
                  <span>Featured Opportunities</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                  Flagship Openings
                </h2>
                <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                  Priority leadership and high-impact specialized positions currently open for application.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group p-8"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-2">
                        <Badge className="bg-black text-white border border-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider">
                          Featured
                        </Badge>
                        {getUrgencyBadge(job.urgency)}
                      </div>
                      <Badge
                        variant="outline"
                        className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                      >
                        {job.department}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-serif text-black mb-3 group-hover:text-neutral-700 transition-colors">
                      {job.title}
                    </CardTitle>

                    <p className="text-sm text-neutral-600 font-sans leading-relaxed mb-6">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-mono text-neutral-600 py-3 border-y border-neutral-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-black" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-black" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-3.5 w-3.5 text-black" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-black" />
                        <span>{job.applicants} applied</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                      <div>
                        <div className="text-lg font-serif text-black font-semibold">
                          {job.salary || "Competitive"}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Posted {getPostedTime(job.createdAt)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider"
                          asChild
                        >
                          <Link href={`/careers/jobs/${job.id}`}>
                            Details
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider"
                          onClick={() => handleApplyClick(job.id)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Open Positions */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12 pb-4 border-b border-neutral-200">
              <h2 className="text-2xl md:text-3xl font-serif text-black">
                {selectedDepartment === "All Departments"
                  ? "All Available Positions"
                  : `${selectedDepartment} Positions`}
              </h2>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                {filteredJobs.length} {filteredJobs.length === 1 ? "Opening" : "Openings"}
              </span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-20 border border-neutral-200 p-8">
                <Briefcase className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-black mb-2">
                  No Positions Match Your Filters
                </h3>
                <p className="text-neutral-600 text-sm font-sans mb-6">
                  Try adjusting your search query or selecting a different department.
                </p>
                <Button
                  onClick={() => {
                    setSelectedDepartment("All Departments");
                    setSearchQuery("");
                  }}
                  className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {regularJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all p-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-serif text-black group-hover:text-neutral-700 transition-colors">
                            {job.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                          >
                            {job.department}
                          </Badge>
                          {getUrgencyBadge(job.urgency)}
                        </div>

                        <p className="text-sm text-neutral-600 font-sans leading-relaxed mb-4 max-w-3xl">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-600 mb-4">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-black" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-black" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-black" />
                            {job.experience}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-black" />
                            {job.applicants} applicants
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.slice(0, 4).map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge
                              variant="outline"
                              className="border-neutral-200 text-neutral-500 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                            >
                              +{job.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 border-neutral-100 flex flex-col justify-between items-start lg:items-end">
                        <div className="text-xl font-serif text-black font-semibold mb-1">
                          {job.salary || "Competitive"}
                        </div>
                        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                          Posted {getPostedTime(job.createdAt)}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider"
                            asChild
                          >
                            <Link href={`/careers/jobs/${job.id}`}>
                              Details
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider"
                            onClick={() => handleApplyClick(job.id)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Us? Benefits */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Why Join Us?
              </h2>
              <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                We offer more than just a job — we provide a platform to make a
                tangible impact on the future of legal technology and governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
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
    </main>
  );
}
