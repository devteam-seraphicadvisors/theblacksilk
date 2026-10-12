"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Shield,
  Check,
  Lock,
  Crown,
  Users,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";

const membershipPlans = {
  student: {
    name: "Student",
    price: 1500,
    period: "/year",
    features: [
      "Access to public events",
      "Newsletter subscription",
      "Basic forum access",
    ],
    icon: Users,
  },
  "advocate-junior": {
    name: "Advocate (Up to 5 years)",
    price: 6000,
    period: "/year",
    features: [
      "All Student benefits",
      "Premium event access",
      "Committee participation",
      "Professional networking",
    ],
    icon: Zap,
  },
  "government-academic": {
    name: "Government Employee / Law Professor",
    price: 4000,
    period: "/year",
    features: [
      "All Advocate benefits",
      "Academic resources",
      "Policy research access",
      "Government liaison programs",
    ],
    icon: Users,
  },
  "in-house": {
    name: "In-house Counsel",
    price: 7500,
    period: "/year",
    features: [
      "All previous benefits",
      "Corporate legal resources",
      "Compliance updates",
      "Industry-specific content",
    ],
    icon: Zap,
  },
  "advocate-senior": {
    name: "Advocate (5+ years)",
    price: 8500,
    period: "/year",
    features: [
      "All previous benefits",
      "Senior practitioner resources",
      "Mentorship opportunities",
      "Advanced legal tech training",
    ],
    icon: Crown,
  },
  "non-lawyer": {
    name: "Non-lawyer Professional",
    price: 8000,
    period: "/year",
    features: [
      "All core benefits",
      "Tech-focused content",
      "Cross-industry networking",
      "Innovation workshops",
    ],
    icon: Zap,
  },
  "company-small": {
    name: "Company (Up to 10 Members)",
    price: 55000,
    period: "/year",
    features: [
      "Up to 10 member accounts",
      "Corporate dashboard",
      "Team management tools",
      "Bulk event registrations",
    ],
    icon: Users,
  },
  "law-firm-small": {
    name: "Law Firm (Up to 10 Members)",
    price: 85000,
    period: "/year",
    features: [
      "Up to 10 lawyer accounts",
      "Firm-wide resources",
      "Practice management tools",
      "Client development resources",
    ],
    icon: Users,
  },
  "company-medium": {
    name: "Company (11-20 Members)",
    price: 90000,
    period: "/year",
    features: [
      "Up to 20 member accounts",
      "Advanced analytics",
      "Custom training programs",
      "Executive briefings",
    ],
    icon: Users,
  },
  "law-firm-medium": {
    name: "Law Firm (11-20 Members)",
    price: 90000,
    period: "/year",
    features: [
      "Up to 20 lawyer accounts",
      "Premium firm resources",
      "Advanced practice tools",
      "Market intelligence",
    ],
    icon: Users,
  },
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier") || "advocate-senior";
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    organization: "",
    phone: "",
  });

  // Auto-populate form when session loads
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || "",
        name: session.user.name || "",
      }));
    }
  }, [session]);

  const plan = membershipPlans[tier as keyof typeof membershipPlans];

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          tier,
          userDetails: formData,
        }),
      });

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-normal text-black mb-4">
              Complete Your Membership
            </h1>
            <p className="text-neutral-600 text-lg">
              Join The Black Silk community today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="border border-neutral-200 rounded-none shadow-none bg-white">
              <CardHeader className="bg-neutral-50 border-b border-neutral-200 rounded-none">
                <CardTitle className="flex items-center gap-3 text-black text-xl font-serif font-normal">
                  <div className="w-10 h-10 bg-black rounded-none flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-none flex items-center justify-center">
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-normal text-black">
                        {plan.name} Membership
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Annual subscription
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-none border-neutral-300 bg-neutral-50 text-neutral-700 font-mono text-[10px] uppercase tracking-wider"
                  >
                    {tier}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-black">
                    Included Features:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xl font-serif font-normal">
                  <span className="text-black">Total</span>
                  <span className="text-black">
                    ₹{plan.price.toLocaleString()}
                    {plan.period}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-neutral-600 bg-neutral-50 p-4 rounded-none border border-neutral-200">
                  <Shield className="h-5 w-5 text-black flex-shrink-0" />
                  <span>
                    Secure payment powered by Stripe with 256-bit SSL encryption
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border border-neutral-200 rounded-none shadow-none bg-white">
              <CardHeader className="bg-neutral-50 border-b border-neutral-200 rounded-none">
                <CardTitle className="flex items-center gap-3 text-black text-xl font-serif font-normal">
                  <div className="w-10 h-10 bg-black rounded-none flex items-center justify-center">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  Member Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs uppercase font-mono tracking-wider text-neutral-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="mt-2 border-neutral-300 focus:border-black focus-visible:ring-black rounded-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="mt-2 border-neutral-300 focus:border-black focus-visible:ring-black rounded-none"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                      className="mt-2 border-neutral-300 focus:border-black focus-visible:ring-black rounded-none"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="organization"
                      className="text-xs uppercase font-mono tracking-wider text-neutral-700"
                    >
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          organization: e.target.value,
                        }))
                      }
                      className="mt-2 border-neutral-300 focus:border-black focus-visible:ring-black rounded-none"
                      placeholder="Enter your organization (optional)"
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.email ||
                    !formData.phone
                  }
                  className="w-full bg-black hover:bg-neutral-800 !text-white rounded-none py-3 h-auto font-mono text-sm uppercase tracking-wider"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white">
                      <CreditCard className="h-5 w-5" />
                      Pay ₹{plan.price.toLocaleString()}
                    </div>
                  )}
                </Button>

                <p className="text-xs text-neutral-500 text-center leading-relaxed">
                  By completing this purchase, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-neutral-700 hover:text-black underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-neutral-700 hover:text-black underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
