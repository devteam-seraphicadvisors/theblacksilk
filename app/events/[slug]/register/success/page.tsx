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
  const sessionId = search.session_id;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Registration Successful!
              </h1>
              <p className="text-xl text-gray-600">
                Thank you for registering. Your payment has been processed
                successfully.
              </p>
            </div>

            {/* Registration Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Confirmation Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Registration Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-500 text-white">
                        Confirmed
                      </Badge>
                      <span className="text-sm text-gray-600">
                        Registration ID: {sessionId?.slice(-8)}
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your registration has been confirmed and payment processed
                      successfully.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      What happens next?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <Mail className="h-4 w-4 mt-0.5 text-blue-500" />
                        <span>
                          Confirmation email sent to your registered email
                          address
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-0.5 text-blue-500" />
                        <span>
                          Event details and joining instructions will be shared
                          24 hours before the event
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Download className="h-4 w-4 mt-0.5 text-blue-500" />
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
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Check Your Email
                        </h4>
                        <p className="text-sm text-gray-600">
                          We've sent a confirmation email with your registration
                          details and receipt.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Add to Calendar
                        </h4>
                        <p className="text-sm text-gray-600">
                          Save the event date and time to your calendar so you
                          don't miss it.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Join Our Community
                        </h4>
                        <p className="text-sm text-gray-600">
                          Connect with other attendees and stay updated on
                          future events.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex flex-col gap-3">
                      <Button className="bg-black hover:bg-gray-800" asChild>
                        <Link href="/dashboard">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/events">Browse More Events</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Support Section */}
            <Card className="border-0 shadow-lg mt-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Need Help?
                  </h3>
                  <p className="text-blue-700 mb-4">
                    If you have any questions about your registration or the
                    event, we're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      asChild
                    >
                      <Link href="/get-involved/contact">Contact Support</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      asChild
                    >
                      <Link href={`/events/${params.slug}`}>
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
