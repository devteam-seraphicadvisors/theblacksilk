"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  department: string;
}

export default function JobApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    coverLetter: "",
    experience: "",
    whyInterested: "",
    availability: "",
    portfolioUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/careers/jobs/${params.id}/apply`);
      return;
    }

    async function fetchJob() {
      try {
        const response = await fetch(`/api/careers/jobs`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch job");
        }

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

    if (status === "authenticated") {
      fetchJob();
    }
  }, [params.id, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/careers/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: params.id,
          jobTitle: job?.title,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect to login
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Error Loading Job
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The job you're trying to apply for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/careers/jobs">Back to Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-2xl mx-4 border border-neutral-200 bg-white rounded-none shadow-none">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-black mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-black mb-4">
              Application Submitted!
            </h2>
            <p className="text-neutral-600 mb-6 text-base">
              Thank you for applying to the <strong>{job.title}</strong>{" "}
              position. We'll review your application and get back to you soon.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-none border-neutral-300 hover:bg-neutral-50">
                <Link href="/careers/jobs">Browse More Jobs</Link>
              </Button>
              <Button asChild className="rounded-none bg-black !text-white hover:bg-neutral-800">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/careers/jobs/${params.id}`}
            className="inline-flex items-center text-neutral-500 hover:text-black mb-8 transition-colors group font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Job Details
          </Link>

          <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl font-serif font-bold text-black">
                Apply for {job.title}
              </CardTitle>
              <p className="text-neutral-500 mt-2 font-mono text-xs uppercase">{job.department}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="rounded-none border-black bg-neutral-900 text-white">
                    <XCircle className="h-4 w-4 text-white" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Alert className="rounded-none border-neutral-200 bg-neutral-50 text-neutral-800">
                  <AlertDescription className="text-xs font-mono">
                    Logged in as: <strong>{session?.user?.email}</strong>
                  </AlertDescription>
                </Alert>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label
                    htmlFor="coverLetter"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    Cover Letter *
                  </Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us why you're a great fit for this position..."
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coverLetter: e.target.value,
                      }))
                    }
                    className="min-h-[150px] resize-none rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label
                    htmlFor="experience"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    Relevant Experience *
                  </Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe your relevant work experience..."
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                    className="min-h-[120px] resize-none rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                </div>

                {/* Why Interested */}
                <div className="space-y-2">
                  <Label
                    htmlFor="whyInterested"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    Why are you interested in this role? *
                  </Label>
                  <Textarea
                    id="whyInterested"
                    placeholder="What interests you about this opportunity..."
                    value={formData.whyInterested}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        whyInterested: e.target.value,
                      }))
                    }
                    className="min-h-[100px] resize-none rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <Label
                    htmlFor="availability"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    When can you start? *
                  </Label>
                  <Input
                    id="availability"
                    placeholder="e.g., Immediately, 2 weeks notice, 1 month..."
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: e.target.value,
                      }))
                    }
                    className="rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                </div>

                {/* Resume URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="resumeUrl"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    Resume URL *
                  </Label>
                  <Input
                    id="resumeUrl"
                    type="url"
                    placeholder="https://drive.google.com/... or link to your resume"
                    value={formData.resumeUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        resumeUrl: e.target.value,
                      }))
                    }
                    className="rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                  <p className="text-xs text-neutral-500 font-mono">
                    Upload your resume to Google Drive or Dropbox and share the
                    public link
                  </p>
                </div>

                {/* LinkedIn URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="linkedinUrl"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    LinkedIn Profile URL
                  </Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    placeholder="https://www.linkedin.com/in/..."
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        linkedinUrl: e.target.value,
                      }))
                    }
                    className="rounded-none border-neutral-300 focus-visible:ring-black"
                  />
                </div>

                {/* Portfolio URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="portfolioUrl"
                    className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                  >
                    Portfolio/Website URL
                  </Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    placeholder="https://..."
                    value={formData.portfolioUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        portfolioUrl: e.target.value,
                      }))
                    }
                    className="rounded-none border-neutral-300 focus-visible:ring-black"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-none border-neutral-300 hover:bg-neutral-50 h-11"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-black !text-white hover:bg-neutral-800 rounded-none h-11 uppercase font-medium tracking-wide text-xs"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
