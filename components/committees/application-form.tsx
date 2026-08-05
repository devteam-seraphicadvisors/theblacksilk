"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface ApplicationFormProps {
  committeeSlug: string;
  committeeName: string;
  focusAreas?: string[];
  onClose?: () => void;
}

const expertiseOptions = [
  "Legal Research",
  "Policy Development",
  "Technology Integration",
  "Data Privacy & Protection",
  "Cybersecurity",
  "Intellectual Property",
  "Contract Law",
  "Regulatory Compliance",
  "Legal Writing",
  "Public Speaking",
  "Training & Education",
  "Project Management",
  "Strategic Planning",
  "Community Outreach",
  "Event Organization",
  "Digital Transformation",
];

export default function ApplicationForm({
  committeeSlug,
  committeeName,
  focusAreas = [],
  onClose,
}: ApplicationFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    motivation: "",
    experience: "",
    contribution: "",
    availability: "",
    expertise: [] as string[],
    linkedinUrl: "",
  });

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      expertise: checked
        ? [...prev.expertise, expertise]
        : prev.expertise.filter((e) => e !== expertise),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/committees/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          committeeSlug,
          committeeName,
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
        if (onClose) {
          onClose();
        } else {
          router.push("/dashboard/committees");
        }
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Alert>
        <AlertDescription>
          Please{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => router.push("/login")}
          >
            sign in
          </Button>{" "}
          to apply for committee membership.
        </AlertDescription>
      </Alert>
    );
  }

  if (success) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in joining the {committeeName}. We'll
            review your application and get back to you soon.
          </p>
          <Button onClick={() => router.push("/dashboard/committees")}>
            View My Applications
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Apply to Join</CardTitle>
        <CardDescription className="text-lg">{committeeName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Motivation */}
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-base font-semibold">
              Why do you want to join this committee? *
            </Label>
            <Textarea
              id="motivation"
              placeholder="Share your motivation and what interests you about this committee's work..."
              value={formData.motivation}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, motivation: e.target.value }))
              }
              className="min-h-[120px] resize-none"
              required
            />
            <p className="text-sm text-gray-500">
              {formData.motivation.length}/50 characters minimum
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-base font-semibold">
              Relevant Experience *
            </Label>
            <Textarea
              id="experience"
              placeholder="Describe your relevant professional experience, skills, and background..."
              value={formData.experience}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, experience: e.target.value }))
              }
              className="min-h-[120px] resize-none"
              required
            />
            <p className="text-sm text-gray-500">
              {formData.experience.length}/50 characters minimum
            </p>
          </div>

          {/* Contribution */}
          <div className="space-y-2">
            <Label htmlFor="contribution" className="text-base font-semibold">
              How can you contribute? *
            </Label>
            <Textarea
              id="contribution"
              placeholder="Explain how you plan to contribute to the committee's goals and initiatives..."
              value={formData.contribution}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contribution: e.target.value,
                }))
              }
              className="min-h-[120px] resize-none"
              required
            />
            <p className="text-sm text-gray-500">
              {formData.contribution.length}/50 characters minimum
            </p>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability" className="text-base font-semibold">
              Availability *
            </Label>
            <Select
              value={formData.availability}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, availability: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">
                  Full-time (10+ hours/week)
                </SelectItem>
                <SelectItem value="part-time">
                  Part-time (5-10 hours/week)
                </SelectItem>
                <SelectItem value="flexible">Flexible (as needed)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expertise */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Areas of Expertise * (Select at least one)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-4 border rounded-lg">
              {expertiseOptions.map((expertise) => (
                <div key={expertise} className="flex items-center space-x-2">
                  <Checkbox
                    id={expertise}
                    checked={formData.expertise.includes(expertise)}
                    onCheckedChange={(checked) =>
                      handleExpertiseChange(expertise, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={expertise}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {expertise}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected: {formData.expertise.length}
            </p>
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl" className="text-base font-semibold">
              LinkedIn Profile (Optional)
            </Label>
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              value={formData.linkedinUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  linkedinUrl: e.target.value,
                }))
              }
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={
                isSubmitting ||
                formData.motivation.length < 50 ||
                formData.experience.length < 50 ||
                formData.contribution.length < 50 ||
                !formData.availability ||
                formData.expertise.length === 0
              }
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
            {onClose && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
