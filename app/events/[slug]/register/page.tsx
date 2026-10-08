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
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" className="mb-4 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-none font-mono text-xs" asChild>
              <Link href={`/events/${params.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Event Details
              </Link>
            </Button>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 relative rounded-none overflow-hidden border border-neutral-700">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {event.title}
                </h1>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-white" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-white" />
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
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-black">
                      Registration Details
                    </CardTitle>
                    <p className="text-neutral-500 text-sm">
                      Please fill in your information to register for this event.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-base font-serif font-bold text-black uppercase tracking-wider">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-xs uppercase font-mono tracking-wider text-neutral-700">First Name *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className={`rounded-none border-neutral-300 focus-visible:ring-black ${
                                errors.firstName ? "border-red-500" : ""
                              }`}
                            />
                            {errors.firstName && (
                              <p className="text-xs text-red-600 mt-1">
                                {errors.firstName}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="lastName" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className={`rounded-none border-neutral-300 focus-visible:ring-black ${
                                errors.lastName ? "border-red-500" : ""
                              }`}
                            />
                            {errors.lastName && (
                              <p className="text-xs text-red-600 mt-1">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className={`rounded-none border-neutral-300 focus-visible:ring-black ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
                              <p className="text-xs text-red-600 mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              className={`rounded-none border-neutral-300 focus-visible:ring-black ${errors.phone ? "border-red-500" : ""}`}
                            />
                            {errors.phone && (
                              <p className="text-xs text-red-600 mt-1">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Professional Information */}
                      <div className="space-y-4">
                        <h3 className="text-base font-serif font-bold text-black uppercase tracking-wider">
                          Professional Information
                        </h3>

                        <div>
                          <Label htmlFor="organization" className="text-xs uppercase font-mono tracking-wider text-neutral-700">
                            Organization/Company *
                          </Label>
                          <Input
                            id="organization"
                            value={formData.organization}
                            onChange={(e) =>
                              handleInputChange("organization", e.target.value)
                            }
                            className={`rounded-none border-neutral-300 focus-visible:ring-black ${
                              errors.organization ? "border-red-500" : ""
                            }`}
                          />
                          {errors.organization && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.organization}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="designation" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Designation</Label>
                            <Input
                              id="designation"
                              value={formData.designation}
                              onChange={(e) =>
                                handleInputChange("designation", e.target.value)
                              }
                              className="rounded-none border-neutral-300 focus-visible:ring-black"
                            />
                          </div>

                          <div>
                            <Label htmlFor="experience" className="text-xs uppercase font-mono tracking-wider text-neutral-700">
                              Years of Experience
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleInputChange("experience", value)
                              }
                            >
                              <SelectTrigger className="rounded-none border-neutral-300">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent className="rounded-none">
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
                        <h3 className="text-base font-serif font-bold text-black uppercase tracking-wider">
                          Ticket Type
                        </h3>

                        <RadioGroup
                          value={formData.ticketType}
                          onValueChange={(value) =>
                            handleInputChange("ticketType", value)
                          }
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 p-4 border border-neutral-300 rounded-none bg-white">
                            <RadioGroupItem value="regular" id="regular" />
                            <Label
                              htmlFor="regular"
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium text-black">
                                    Regular Ticket
                                  </div>
                                  <div className="text-xs text-neutral-500 font-mono">
                                    Standard registration
                                  </div>
                                </div>
                                <div className="text-lg font-mono font-bold text-black">
                                  ₹{event.price.toLocaleString()}
                                </div>
                              </div>
                            </Label>
                          </div>

                          {event.earlyBirdPrice && (
                            <div className="flex items-center space-x-2 p-4 border border-black rounded-none bg-neutral-50">
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
                                    <div className="font-medium flex items-center gap-2 text-black">
                                      Early Bird Ticket
                                      <Badge className="bg-black text-white rounded-none border border-black font-mono text-[10px] uppercase">
                                        Save ₹
                                        {(
                                          event.price - event.earlyBirdPrice
                                        ).toLocaleString()}
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-neutral-500 font-mono">
                                      Limited time offer
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-mono font-bold text-black">
                                      ₹{event.earlyBirdPrice.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-neutral-400 line-through font-mono">
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
                        <h3 className="text-base font-serif font-bold text-black uppercase tracking-wider">
                          Additional Information
                        </h3>

                        <div>
                          <Label htmlFor="dietaryRequirements" className="text-xs uppercase font-mono tracking-wider text-neutral-700">
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
                            className="rounded-none border-neutral-300 focus-visible:ring-black"
                          />
                        </div>

                        <div>
                          <Label htmlFor="specialRequests" className="text-xs uppercase font-mono tracking-wider text-neutral-700">
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
                            className="rounded-none border-neutral-300 focus-visible:ring-black"
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
                            className="rounded-none"
                          />
                          <Label
                            htmlFor="agreeTerms"
                            className="text-xs leading-relaxed cursor-pointer text-neutral-700"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-black underline"
                            >
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-black underline"
                            >
                              Privacy Policy
                            </Link>
                            *
                          </Label>
                        </div>
                        {errors.agreeTerms && (
                          <p className="text-xs text-red-600">
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
                            className="rounded-none"
                          />
                          <Label
                            htmlFor="agreeMarketing"
                            className="text-xs leading-relaxed cursor-pointer text-neutral-600"
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
                          className="w-full bg-black !text-white hover:bg-neutral-800 rounded-none h-12 uppercase font-medium tracking-wide text-xs"
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
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif text-black">
                      Event Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-32 rounded-none overflow-hidden border border-neutral-200">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-black mb-2 text-base">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-xs font-mono text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-black" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-black" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-black" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-neutral-600">Ticket Type:</span>
                        <span className="font-medium text-black">
                          {formData.ticketType === "earlybird"
                            ? "Early Bird"
                            : "Regular"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-mono font-bold text-black">
                        <span>Total:</span>
                        <span>₹{ticketPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif text-black">
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-neutral-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card className="border border-neutral-300 bg-neutral-100 rounded-none shadow-none">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-black text-xs uppercase tracking-wider mb-1">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          Your payment information is protected with
                          industry-standard encryption and processed securely.
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
