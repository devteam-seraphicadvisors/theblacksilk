"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  responsibilities?: string[];
  benefits?: string[];
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/careers/jobs`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch job");
        }

        // Find the specific job
        const foundJob = data.jobs.find((j: Job) => j.id === params.id);
        if (!foundJob) {
          setError("Job not found");
        } else {
          setJob(foundJob);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [params.id]);

  const getPostedTime = (date: string) => {
    const posted = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleApplyClick = () => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/careers/jobs/${params.id}/apply`);
    } else {
      router.push(`/careers/jobs/${params.id}/apply`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Job Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The job you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/careers/jobs">Back to Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/careers/jobs"
              className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors group text-sm font-mono"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Jobs
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge
                variant="outline"
                className="border-neutral-700 text-neutral-200 bg-neutral-900 rounded-none font-mono text-[11px] uppercase"
              >
                {job.department}
              </Badge>
              <Badge
                variant="outline"
                className="border-neutral-700 text-neutral-200 bg-neutral-900 rounded-none font-mono text-[11px] uppercase"
              >
                {job.type}
              </Badge>
              {job.featured && (
                <Badge className="bg-white !text-black border-white rounded-none font-mono text-[11px] uppercase font-semibold">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">{job.title}</h1>

            <div className="flex flex-wrap gap-6 text-neutral-400 mb-8 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-white" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-white" />
                {job.experience}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-white" />
                Posted {getPostedTime(job.createdAt)}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-white" />
                {job.applicants} Applicants
              </div>
            </div>

            <div className="flex items-center justify-between">
              {job.salary && (
                <div className="text-3xl font-mono font-bold text-white">{job.salary}</div>
              )}
              <Button
                size="lg"
                className="bg-white !text-black hover:bg-neutral-100 rounded-none font-semibold px-8"
                onClick={handleApplyClick}
              >
                {status === "unauthenticated"
                  ? "Sign in to Apply"
                  : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Description */}
            <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-black">About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-black">Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-black">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-black">Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-sm py-1.5 px-3 rounded-none border-neutral-300 bg-neutral-100 text-neutral-900 font-mono"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-black">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Apply Action Card */}
            <Card className="bg-black text-white border border-neutral-800 rounded-none shadow-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-serif font-bold mb-3 text-white">Apply for This Position</h3>
                <p className="text-neutral-400 mb-6 text-sm max-w-md mx-auto">
                  Submit your application to become part of the legal innovation community.
                </p>
                <Button
                  size="lg"
                  className="bg-white !text-black hover:bg-neutral-100 rounded-none font-semibold px-8"
                  onClick={handleApplyClick}
                >
                  {status === "unauthenticated"
                    ? "Sign in to Apply"
                    : "Proceed to Application"}
                </Button>
                {status === "unauthenticated" && (
                  <p className="text-xs text-neutral-500 mt-3 font-mono">
                    Sign-in required to submit an application
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
