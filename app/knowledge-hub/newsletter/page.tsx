"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Send,
} from "lucide-react";
import Image from "next/image";
import { SimpleLoader } from "@/components/simple-loader";

interface NewsletterIssue {
  id: string;
  title: string;
  excerpt: string;
  topics: string[];
  image: string | null;
  readTime: string;
  publishedAt: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function NewsletterPage() {
  const [recentIssues, setRecentIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    organization: "",
    role: "",
    weeklyDigest: true,
    eventUpdates: true,
    policyAlerts: false,
    researchUpdates: false,
  });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("/api/knowledge-hub/newsletter-issues");
        if (response.ok) {
          const data = await response.json();
          setRecentIssues(data.issues || []);
        }
      } catch (err) {
        console.error("Failed to fetch newsletter issues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubscribeSuccess(true);
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          organization: "",
          role: "",
          weeklyDigest: true,
          eventUpdates: true,
          policyAlerts: false,
          researchUpdates: false,
        });
      }
    } catch (err) {
      console.error("Failed to subscribe:", err);
    } finally {
      setSubscribing(false);
    }
  };

  const newsletterStats = [
    {
      label: "Subscribers",
      value: "5,000+",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Weekly Issues",
      value: "52",
      icon: Calendar,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Open Rate",
      value: "68%",
      icon: TrendingUp,
      color: "bg-black text-white",
    },
    {
      label: "Satisfaction",
      value: "4.8/5",
      icon: Star,
      color: "bg-black text-white",
    },
  ];

  const subscriptionOptions = [
    {
      id: "weeklyDigest",
      title: "Weekly Digest",
      description:
        "Our flagship newsletter with the latest insights and analysis",
      frequency: "Every Tuesday",
      icon: "📰",
    },
    {
      id: "eventUpdates",
      title: "Event Updates",
      description:
        "Notifications about upcoming events, workshops, and symposiums",
      frequency: "As needed",
      icon: "📅",
    },
    {
      id: "policyAlerts",
      title: "Policy Alerts",
      description: "Breaking news on legal and technology policy developments",
      frequency: "As needed",
      icon: "🚨",
    },
    {
      id: "researchUpdates",
      title: "Research Updates",
      description: "New publications, fact sheets, and research findings",
      frequency: "Monthly",
      icon: "📊",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <Mail className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Weekly Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Newsletter
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Stay ahead with weekly insights on legal technology, policy
              updates, and industry trends delivered to your inbox
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Stats */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {newsletterStats.map((stat, index) => (
                <Card
                  key={index}
                  className="border border-neutral-200 shadow-none hover:border-black transition-all duration-300 rounded-none bg-neutral-50"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-12 h-12 bg-black rounded-none flex items-center justify-center mx-auto mb-4"
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl text-gray-600">
                Choose what you'd like to receive and stay informed about the
                topics that matter to you
              </p>
            </div>

            <Card className="border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12 md:p-16">
                {subscribeSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Successfully Subscribed!
                    </h3>
                    <p className="text-xl text-gray-600">
                      Thank you for subscribing to our newsletter. Check your
                      inbox for a confirmation email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                          First Name *
                        </label>
                        <Input
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                          Last Name *
                        </label>
                        <Input
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                          Organization (Optional)
                        </label>
                        <Input
                          placeholder="Your organization or company"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organization: e.target.value,
                            })
                          }
                          className="py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                          Role/Title (Optional)
                        </label>
                        <Input
                          placeholder="Your role or job title"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Subscription Options */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        Subscription Preferences
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subscriptionOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-start space-x-4 p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                          >
                            <Checkbox
                              id={option.id}
                              checked={
                                formData[
                                  option.id as keyof typeof formData
                                ] as boolean
                              }
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  [option.id]: checked,
                                })
                              }
                              className="mt-1 scale-125"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{option.icon}</span>
                                <label
                                  htmlFor={option.id}
                                  className="text-lg font-semibold text-gray-900 cursor-pointer"
                                >
                                  {option.title}
                                </label>
                              </div>
                              <p className="text-gray-600 mb-3 leading-relaxed">
                                {option.description}
                              </p>
                              <Badge variant="outline" className="px-3 py-1">
                                {option.frequency}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                      <div className="flex items-start space-x-4">
                        <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="text-gray-700">
                          <p className="mb-3 leading-relaxed">
                            By subscribing, you agree to receive emails from The
                            Black Silk. We respect your privacy and will never
                            share your information with third parties.
                          </p>
                          <p className="leading-relaxed">
                            You can unsubscribe at any time by clicking the link
                            in our emails or contacting us directly.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={subscribing}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xl py-6 rounded-2xl"
                    >
                      <Send className="h-6 w-6 mr-3" />
                      {subscribing
                        ? "Subscribing..."
                        : "Subscribe to Newsletter"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      {!loading && recentIssues.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-gray-900 mb-8">
                  Recent Issues
                </h2>
                <p className="text-xl text-gray-600">
                  Get a preview of what you'll receive in your inbox
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentIssues.map((issue) => (
                  <Card
                    key={issue.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group rounded-2xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {issue.image ? (
                        <Image
                          src={issue.image}
                          alt={issue.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                          <Mail className="h-24 w-24 text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(issue.publishedAt)}
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30">
                          {issue.readTime}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {issue.title}
                        </CardTitle>
                        <p className="text-gray-600 line-clamp-3 leading-relaxed">
                          {issue.excerpt}
                        </p>
                      </CardHeader>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {issue.topics.map((topic) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="px-3 py-1"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                      >
                        Read Full Issue
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
