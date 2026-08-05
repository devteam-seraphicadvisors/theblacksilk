"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Loader2, AlertCircle, ArrowRight } from "lucide-react";

export default function MembershipSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status, update } = useSession();
  const [isActivating, setIsActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [errorMessage, setErrorMessage] = useState("");

  const sessionId = searchParams.get("session_id");
  const membershipType = searchParams.get("membership_type");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      signIn();
      return;
    }

    if (!sessionId || !membershipType) {
      setActivationStatus("error");
      setErrorMessage("Missing payment information");
      return;
    }

    activateMembership();
  }, [session, status, sessionId, membershipType]);

  const activateMembership = async () => {
    if (isActivating) return;

    setIsActivating(true);
    try {
      const response = await fetch("/api/membership/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          membershipType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setActivationStatus("success");
        // Update the session to reflect the new membership status
        await update({ hasMembership: true });

        // Redirect to onboarding after a short delay
        setTimeout(() => {
          router.push("/onboarding");
        }, 3000);
      } else {
        setActivationStatus("error");
        setErrorMessage(data.error || "Failed to activate membership");
      }
    } catch (error) {
      console.error("Activation error:", error);
      setActivationStatus("error");
      setErrorMessage("Network error occurred");
    } finally {
      setIsActivating(false);
    }
  };

  const getMembershipDisplayName = (type: string) => {
    const types: Record<string, string> = {
      student: "Student Membership",
      "advocate-junior": "Advocate Junior Membership",
      "advocate-senior": "Advocate Senior Membership",
      corporate: "Corporate Membership",
    };
    return types[type] || type;
  };

  const getMembershipPrice = (type: string) => {
    const prices: Record<string, string> = {
      student: "₹500",
      "advocate-junior": "₹1,500",
      "advocate-senior": "₹2,500",
      corporate: "₹10,000",
    };
    return prices[type] || "N/A";
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            {activationStatus === "success" && (
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            )}
            {activationStatus === "pending" && (
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            )}
            {activationStatus === "error" && (
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            )}

            <CardTitle className="text-2xl font-bold">
              {activationStatus === "success" && "Welcome to The Black Silk!"}
              {activationStatus === "pending" &&
                "Activating Your Membership..."}
              {activationStatus === "error" && "Activation Failed"}
            </CardTitle>

            <CardDescription className="text-lg">
              {activationStatus === "success" &&
                "Your membership has been successfully activated"}
              {activationStatus === "pending" &&
                "Please wait while we process your membership"}
              {activationStatus === "error" && errorMessage}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {membershipType && (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Membership Type:</span>
                    <Badge variant="secondary" className="text-sm">
                      {getMembershipDisplayName(membershipType)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Annual Fee:</span>
                    <span className="font-bold text-lg">
                      {getMembershipPrice(membershipType)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">
                    Your Membership Benefits:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Access to exclusive legal resources and publications
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Networking opportunities with legal professionals
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Priority registration for events and workshops
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Committee participation opportunities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Member directory access</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {activationStatus === "success" && (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  You will be redirected to complete your profile setup in a few
                  seconds...
                </p>
                <Button
                  onClick={() => router.push("/onboarding")}
                  className="w-full"
                >
                  Complete Profile Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {activationStatus === "error" && (
              <div className="text-center space-y-4">
                <Button
                  onClick={activateMembership}
                  disabled={isActivating}
                  className="w-full"
                >
                  {isActivating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    "Retry Activation"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/community/membership")}
                  className="w-full"
                >
                  Back to Membership
                </Button>
              </div>
            )}

            {/* Debug Information (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
                <h4 className="font-semibold mb-2">Debug Info:</h4>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(
                    {
                      sessionId,
                      membershipType,
                      activationStatus,
                      isActivating,
                      userSession: {
                        id: session?.user?.id,
                        email: session?.user?.email,
                        hasMembership: session?.user?.hasMembership,
                        onboardingCompleted: session?.user?.onboardingCompleted,
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
