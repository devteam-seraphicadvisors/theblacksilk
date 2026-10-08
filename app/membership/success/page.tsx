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
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
          <CardHeader className="text-center">
            {activationStatus === "success" && (
              <div className="mx-auto w-16 h-16 bg-black rounded-none flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            )}
            {activationStatus === "pending" && (
              <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-none flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-black animate-spin" />
              </div>
            )}
            {activationStatus === "error" && (
              <div className="mx-auto w-16 h-16 bg-neutral-900 rounded-none flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
            )}

            <CardTitle className="text-2xl font-serif font-bold text-black">
              {activationStatus === "success" && "Welcome to The Black Silk"}
              {activationStatus === "pending" &&
                "Activating Your Membership..."}
              {activationStatus === "error" && "Activation Failed"}
            </CardTitle>

            <CardDescription className="text-sm text-neutral-600">
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
                <div className="bg-neutral-100 border border-neutral-200 rounded-none p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs uppercase text-neutral-600">Membership Type:</span>
                    <Badge variant="outline" className="border-black bg-black text-white rounded-none font-mono text-[10px] uppercase">
                      {getMembershipDisplayName(membershipType)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs uppercase text-neutral-600">Annual Fee:</span>
                    <span className="font-mono font-bold text-lg text-black">
                      {getMembershipPrice(membershipType)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-base text-black uppercase tracking-wider">
                    Your Membership Benefits:
                  </h3>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                      <span>
                        Access to exclusive legal resources and publications
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                      <span>
                        Networking opportunities with legal professionals
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                      <span>
                        Priority registration for events and workshops
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                      <span>Committee participation opportunities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-black flex-shrink-0" />
                      <span>Member directory access</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {activationStatus === "success" && (
              <div className="text-center space-y-4">
                <p className="text-xs text-neutral-500 font-mono">
                  You will be redirected to complete your profile setup in a few seconds...
                </p>
                <Button
                  onClick={() => router.push("/onboarding")}
                  className="w-full bg-black !text-white hover:bg-neutral-800 rounded-none h-11 text-xs uppercase font-medium tracking-wide"
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
                  className="w-full bg-black !text-white hover:bg-neutral-800 rounded-none h-11 text-xs uppercase font-medium tracking-wide"
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
                  className="w-full rounded-none border-neutral-300 hover:bg-neutral-50 h-11 text-xs"
                >
                  Back to Membership
                </Button>
              </div>
            )}

            {/* Debug Information (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 p-4 bg-neutral-100 rounded-none border border-neutral-200 text-xs font-mono">
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
