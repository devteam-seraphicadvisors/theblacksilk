"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Briefcase,
  MapPin,
  Globe,
  Users,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Professional Details", icon: Briefcase },
  { id: 3, title: "Location & Contact", icon: MapPin },
  { id: 4, title: "Online Presence", icon: Globe },
  { id: 5, title: "Interests & Goals", icon: Users },
];

const PRACTICE_AREAS = [
  "Corporate Law",
  "Criminal Law",
  "Family Law",
  "Intellectual Property",
  "Labor Law",
  "Tax Law",
  "Constitutional Law",
  "Environmental Law",
  "International Law",
  "Cyber Law",
];

const COMMITTEES = [
  "AI & Technology Committee",
  "Cybersecurity Committee",
  "Government Relations Committee",
  "Professional Development Committee",
  "Publications Committee",
  "Events Committee",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    organization: "",
    position: "",
    experience: "",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
    practiceAreas: [] as string[],
    committees: [] as string[],
    goals: "",
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (
    field: "practiceAreas" | "committees",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Update session to reflect onboarding completion
        await update({ onboardingCompleted: true });
        router.push("/dashboard");
      } else {
        const data = await response.json();
        console.error("Onboarding error:", data.error);
      }
    } catch (error) {
      console.error("Onboarding submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bio">Tell us about yourself</Label>
              <Textarea
                id="bio"
                placeholder="Brief professional bio..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="organization">Organization/Firm</Label>
              <Input
                id="organization"
                placeholder="Your current organization"
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="position">Position/Title</Label>
              <Input
                id="position"
                placeholder="Your current position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("experience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-15">11-15 years</SelectItem>
                  <SelectItem value="16+">16+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State/Country"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter Handle</Label>
              <Input
                id="twitter"
                placeholder="@yourusername"
                value={formData.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Practice Areas of Interest</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {PRACTICE_AREAS.map((area) => (
                  <Badge
                    key={area}
                    variant={
                      formData.practiceAreas.includes(area)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer justify-center p-2"
                    onClick={() => handleArrayToggle("practiceAreas", area)}
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label>Committees You'd Like to Join</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {COMMITTEES.map((committee) => (
                  <Badge
                    key={committee}
                    variant={
                      formData.committees.includes(committee)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer justify-center p-2"
                    onClick={() => handleArrayToggle("committees", committee)}
                  >
                    {committee}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="goals">Your Goals with The Black Silk</Label>
              <Textarea
                id="goals"
                placeholder="What do you hope to achieve through your membership?"
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Complete Your Profile
                </CardTitle>
                <CardDescription>
                  Step {currentStep} of {STEPS.length}:{" "}
                  {STEPS[currentStep - 1].title}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-lg font-semibold">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step Navigation */}
            <div className="flex justify-between items-center">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center space-y-1 ${
                      step.id === currentStep
                        ? "text-blue-600"
                        : step.id < currentStep
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.id === currentStep
                          ? "bg-blue-100 border-2 border-blue-600"
                          : step.id < currentStep
                          ? "bg-green-100 border-2 border-green-600"
                          : "bg-gray-100 border-2 border-gray-300"
                      }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="text-xs text-center hidden sm:block">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Step Content */}
            <div className="min-h-[300px]">{renderStepContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep === STEPS.length ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Completing...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Setup</span>
                      <CheckCircle className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
