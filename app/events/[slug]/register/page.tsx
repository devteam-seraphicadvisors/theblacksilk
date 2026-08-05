"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock event data - in real app, this would come from a database
const events = {
  "ai-ethics-symposium-2025": {
    id: 1,
    title: "AI Ethics Symposium 2025",
    date: "January 20, 2025",
    time: "9:00 AM - 6:00 PM IST",
    location: "India Habitat Centre, New Delhi",
    venue: "Amphitheatre",
    price: 2500,
    earlyBirdPrice: 2000,
    type: "Symposium",
    status: "Early Bird",
    image: "/images/event-ai-symposium.jpg",
    includes: [
      "Welcome kit and conference materials",
      "Breakfast, lunch, and refreshments",
      "Certificate of participation",
      "Access to presentation slides",
      "Networking opportunities",
      "Follow-up resources and recordings",
    ],
  },
  "blockchain-legal-workshop": {
    id: 2,
    title: "Blockchain in Legal Documentation Workshop",
    date: "January 25, 2025",
    time: "10:00 AM - 4:00 PM IST",
    location: "Virtual Event",
    venue: "Online Platform",
    price: 1500,
    earlyBirdPrice: 1200,
    type: "Workshop",
    status: "Limited Seats",
    image: "/images/event-blockchain-workshop.jpg",
    includes: [
      "Workshop materials and code samples",
      "Access to blockchain development tools",
      "Certificate of completion",
      "Follow-up support for 30 days",
      "Recording of the session",
    ],
  },
};

interface RegisterPageProps {
  params: {
    slug: string;
  };
}

export default function EventRegisterPage({ params }: RegisterPageProps) {
  const router = useRouter();
  const event = events[params.slug as keyof typeof events];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    experience: "",
    dietaryRequirements: "",
    specialRequests: "",
    ticketType: "regular",
    agreeTerms: false,
    agreeMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!event) {
    return <div>Event not found</div>;
  }

  const ticketPrice =
    formData.ticketType === "earlybird" && event.earlyBirdPrice
      ? event.earlyBirdPrice
      : event.price;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.organization.trim())
      newErrors.organization = "Organization is required";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms and conditions";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/events/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          eventSlug: params.slug,
          amount: ticketPrice,
          ticketType: formData.ticketType,
          userDetails: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            designation: formData.designation,
            experience: formData.experience,
            dietaryRequirements: formData.dietaryRequirements,
            specialRequests: formData.specialRequests,
          },
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" className="mb-4" asChild>
              <Link href={`/events/${params.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Event Details
              </Link>
            </Button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Registration Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">
                      Registration Details
                    </CardTitle>
                    <p className="text-gray-600">
                      Please fill in your information to register for this
                      event.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className={
                                errors.firstName ? "border-red-500" : ""
                              }
                            />
                            {errors.firstName && (
                              <p className="text-sm text-red-600 mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className={
                                errors.lastName ? "border-red-500" : ""
                              }
                            />
                            {errors.lastName && (
                              <p className="text-sm text-red-600 mt-1">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                              <p className="text-sm text-red-600 mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && (
                              <p className="text-sm text-red-600 mt-1">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Professional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Professional Information
                        </h3>

                        <div>
                          <Label htmlFor="organization">
                            Organization/Company *
                          </Label>
                          <Input
                            id="organization"
                            value={formData.organization}
                            onChange={(e) =>
                              handleInputChange("organization", e.target.value)
                            }
                            className={
                              errors.organization ? "border-red-500" : ""
                            }
                          />
                          {errors.organization && (
                            <p className="text-sm text-red-600 mt-1">
                              {errors.organization}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="designation">Designation</Label>
                            <Input
                              id="designation"
                              value={formData.designation}
                              onChange={(e) =>
                                handleInputChange("designation", e.target.value)
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor="experience">
                              Years of Experience
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleInputChange("experience", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-2">0-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Type */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Ticket Type
                        </h3>

                        <RadioGroup
                          value={formData.ticketType}
                          onValueChange={(value) =>
                            handleInputChange("ticketType", value)
                          }
                        >
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="regular" id="regular" />
                            <Label
                              htmlFor="regular"
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">
                                    Regular Ticket
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Standard registration
                                  </div>
                                </div>
                                <div className="text-lg font-bold">
                                  ₹{event.price.toLocaleString()}
                                </div>
                              </div>
                            </Label>
                          </div>

                          {event.earlyBirdPrice && (
                            <div className="flex items-center space-x-2 p-4 border rounded-lg border-green-200 bg-green-50">
                              <RadioGroupItem
                                value="earlybird"
                                id="earlybird"
                              />
                              <Label
                                htmlFor="earlybird"
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-medium flex items-center gap-2">
                                      Early Bird Ticket
                                      <Badge className="bg-green-500 text-white">
                                        Save ₹
                                        {(
                                          event.price - event.earlyBirdPrice
                                        ).toLocaleString()}
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      Limited time offer
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-green-600">
                                      ₹{event.earlyBirdPrice.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500 line-through">
                                      ₹{event.price.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          )}
                        </RadioGroup>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Additional Information
                        </h3>

                        <div>
                          <Label htmlFor="dietaryRequirements">
                            Dietary Requirements
                          </Label>
                          <Input
                            id="dietaryRequirements"
                            value={formData.dietaryRequirements}
                            onChange={(e) =>
                              handleInputChange(
                                "dietaryRequirements",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Vegetarian, Vegan, Allergies"
                          />
                        </div>

                        <div>
                          <Label htmlFor="specialRequests">
                            Special Requests
                          </Label>
                          <Textarea
                            id="specialRequests"
                            value={formData.specialRequests}
                            onChange={(e) =>
                              handleInputChange(
                                "specialRequests",
                                e.target.value
                              )
                            }
                            placeholder="Any special accommodations or requests"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) =>
                              handleInputChange(
                                "agreeTerms",
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor="agreeTerms"
                            className="text-sm leading-relaxed cursor-pointer"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-prussian-blue hover:underline"
                            >
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-prussian-blue hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            *
                          </Label>
                        </div>
                        {errors.agreeTerms && (
                          <p className="text-sm text-red-600">
                            {errors.agreeTerms}
                          </p>
                        )}

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeMarketing"
                            checked={formData.agreeMarketing}
                            onCheckedChange={(checked) =>
                              handleInputChange(
                                "agreeMarketing",
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor="agreeMarketing"
                            className="text-sm leading-relaxed cursor-pointer"
                          >
                            I would like to receive updates about future events
                            and newsletters from The Black Silk
                          </Label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-black hover:bg-gray-800"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin h-4 w-4 mr-2" />
                              Processing Registration...
                            </>
                          ) : (
                            <>
                              Proceed to Payment - ₹
                              {ticketPrice.toLocaleString()}
                              <CreditCard className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                {/* Event Summary */}
                <Card className="border-0 shadow-lg sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      Event Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Ticket Type:</span>
                        <span className="font-medium">
                          {formData.ticketType === "earlybird"
                            ? "Early Bird"
                            : "Regular"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>₹{ticketPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Secure Payment with Stripe
                        </h4>
                        <p className="text-sm text-blue-700">
                          Your payment information is protected with
                          industry-standard encryption and processed securely by
                          Stripe.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
