import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Mail,
  Download,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface SuccessPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function RegistrationSuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const search = await searchParams;
  const resolvedParams = await params;
  const sessionId = search.session_id;

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-black rounded-none flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-black mb-4">
                Registration Successful!
              </h1>
              <p className="text-lg text-neutral-600">
                Thank you for registering. Your payment has been processed
                successfully.
              </p>
            </div>

            {/* Registration Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Confirmation Card */}
              <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-black flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-black" />
                    Registration Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-neutral-100 border border-neutral-300 rounded-none p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-black text-white rounded-none border border-black font-mono text-[10px] uppercase">
                        Confirmed
                      </Badge>
                      <span className="text-xs font-mono text-neutral-600">
                        Registration ID: {sessionId?.slice(-8)}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700">
                      Your registration has been confirmed and payment processed
                      successfully.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-black text-sm uppercase tracking-wider">
                      What happens next?
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-600">
                      <li className="flex items-start gap-2">
                        <Mail className="h-4 w-4 mt-0.5 text-black" />
                        <span>
                          Confirmation email sent to your registered email
                          address
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-0.5 text-black" />
                        <span>
                          Event details and joining instructions will be shared
                          24 hours before the event
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Download className="h-4 w-4 mt-0.5 text-black" />
                        <span>
                          Digital certificate will be available after event
                          completion
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-black">
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center text-white text-xs font-mono font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-black text-sm">
                          Check Your Email
                        </h4>
                        <p className="text-xs text-neutral-600">
                          We've sent a confirmation email with your registration
                          details and receipt.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center text-white text-xs font-mono font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-black text-sm">
                          Add to Calendar
                        </h4>
                        <p className="text-xs text-neutral-600">
                          Save the event date and time to your calendar so you
                          don't miss it.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center text-white text-xs font-mono font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-black text-sm">
                          Join Our Community
                        </h4>
                        <p className="text-xs text-neutral-600">
                          Connect with other attendees and stay updated on
                          future events.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex flex-col gap-3">
                      <Button className="bg-black !text-white hover:bg-neutral-800 rounded-none h-11 uppercase font-medium tracking-wide text-xs" asChild>
                        <Link href="/dashboard">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="rounded-none border-neutral-300 hover:bg-neutral-50 h-11" asChild>
                        <Link href="/events">Browse More Events</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Support Section */}
            <Card className="border border-neutral-300 bg-neutral-100 rounded-none shadow-none mt-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-base font-serif font-bold text-black mb-1">
                    Need Help?
                  </h3>
                  <p className="text-xs text-neutral-600 mb-4">
                    If you have any questions about your registration or the
                    event, we're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      className="border-neutral-400 text-black hover:bg-white rounded-none text-xs"
                      asChild
                    >
                      <Link href="/get-involved/contact">Contact Support</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-neutral-400 text-black hover:bg-white rounded-none text-xs"
                      asChild
                    >
                      <Link href={`/events/${resolvedParams.slug}`}>
                        View Event Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
