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
  Loader2,
  FileText,
  Clock,
} from "lucide-react";
import Image from "next/image";

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
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const DEFAULT_ISSUES: NewsletterIssue[] = [
  {
    id: "issue-52",
    title: "AI Governance & Judicial Precedents in 2026",
    excerpt:
      "Analyzing recent high court jurisprudence on algorithmic evidence admissibility, neural network liability models, and statutory audit mandates.",
    topics: ["Artificial Intelligence", "Judiciary", "Evidence Law"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    readTime: "8 min read",
    publishedAt: "2026-03-24T00:00:00.000Z",
  },
  {
    id: "issue-51",
    title: "Cross-Border Data Localization Under the New DPDP Rules",
    excerpt:
      "Operational blueprints for enterprise data flows, cross-border transfer agreements, and exemption frameworks under India's DPDP Act.",
    topics: ["Data Privacy", "DPDP Act", "Compliance"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    readTime: "6 min read",
    publishedAt: "2026-03-17T00:00:00.000Z",
  },
  {
    id: "issue-50",
    title: "Smart Contracts, Blockchain Forensics and Arbitration",
    excerpt:
      "Enforceability of decentralized dispute resolution mechanisms, on-chain signature protocols, and custody preservation standards.",
    topics: ["Blockchain", "Fintech", "Arbitration"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    readTime: "7 min read",
    publishedAt: "2026-03-10T00:00:00.000Z",
  },
];

export default function NewsletterPage() {
  const [recentIssues, setRecentIssues] = useState<NewsletterIssue[]>(DEFAULT_ISSUES);
  const [loading, setLoading] = useState(false);
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
          if (data.issues && data.issues.length > 0) {
            setRecentIssues(data.issues);
          }
        }
      } catch (err) {
        console.error("Failed to fetch newsletter issues:", err);
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
    },
    {
      label: "Weekly Issues",
      value: "52",
      icon: Calendar,
    },
    {
      label: "Avg. Open Rate",
      value: "68%",
      icon: TrendingUp,
    },
    {
      label: "Reader Satisfaction",
      value: "4.9/5",
      icon: Star,
    },
  ];

  const subscriptionOptions = [
    {
      id: "weeklyDigest",
      title: "Weekly Digest",
      description:
        "Flagship dispatch synthesizing pivotal developments across legal technology and digital policy.",
      frequency: "Every Tuesday",
    },
    {
      id: "eventUpdates",
      title: "Event Updates",
      description:
        "Early notifications regarding roundtables, workshops, symposiums, and member calls.",
      frequency: "Bi-Weekly",
    },
    {
      id: "policyAlerts",
      title: "Policy Alerts",
      description:
        "Time-sensitive alerts on statutory enactments, court orders, and regulatory consultations.",
      frequency: "As Needed",
    },
    {
      id: "researchUpdates",
      title: "Research Briefs",
      description:
        "Newly released fact sheets, research papers, and technical implementation guides.",
      frequency: "Monthly",
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
              <span>Weekly Editorial Dispatch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              The Black Silk Dispatch
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Authoritative, curated intelligence on generative AI governance,
              blockchain enforceability, cybersecurity compliance, and legal tech frontiers.
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
                <div
                  key={index}
                  className="border border-neutral-200 bg-white p-8 text-center hover:border-black transition-colors"
                >
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4 border border-neutral-800">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-3xl font-serif text-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 text-xs font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                <Send className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Join 5,000+ Practitioners</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                Subscribe to the Newsletter
              </h2>
              <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                Customize your dispatch preferences to receive high-signal research directly in your inbox.
              </p>
            </div>

            <Card className="border border-neutral-200 bg-white rounded-none shadow-none">
              <CardContent className="p-8 md:p-12">
                {subscribeSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif text-black mb-3">
                      Subscription Confirmed
                    </h3>
                    <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6 font-sans">
                      Thank you for joining The Black Silk Dispatch. Please check your inbox for our latest briefing.
                    </p>
                    <Button
                      onClick={() => setSubscribeSuccess(false)}
                      className="bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider"
                    >
                      Update Preferences
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          First Name *
                        </label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Last Name *
                        </label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                        required
                      />
                    </div>

                    {/* Professional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Organization (Optional)
                        </label>
                        <Input
                          placeholder="Firm or enterprise"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organization: e.target.value,
                            })
                          }
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-black mb-2">
                          Designation (Optional)
                        </label>
                        <Input
                          placeholder="e.g. Partner, In-house Counsel"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="border-neutral-300 rounded-none focus:border-black focus:ring-0 text-sm py-2.5"
                        />
                      </div>
                    </div>

                    {/* Subscription Preferences */}
                    <div>
                      <h3 className="text-sm font-mono uppercase tracking-wider text-black font-semibold mb-4">
                        Dispatch Preferences
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subscriptionOptions.map((option) => (
                          <div
                            key={option.id}
                            className="border border-neutral-200 bg-white p-5 hover:border-black transition-colors flex items-start space-x-3.5"
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
                                  [option.id]: Boolean(checked),
                                })
                              }
                              className="rounded-none border-neutral-400 data-[state=checked]:bg-black data-[state=checked]:text-white mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <label
                                  htmlFor={option.id}
                                  className="text-sm font-serif font-semibold text-black cursor-pointer"
                                >
                                  {option.title}
                                </label>
                                <Badge
                                  variant="outline"
                                  className="rounded-none border-neutral-200 text-[10px] font-mono uppercase tracking-wider bg-neutral-50"
                                >
                                  {option.frequency}
                                </Badge>
                              </div>
                              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Privacy Note */}
                    <div className="bg-neutral-50 p-6 border border-neutral-200">
                      <div className="flex items-start gap-3 text-xs text-neutral-600 font-sans leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                        <p>
                          We respect your privacy. We never share subscriber records with third parties.
                          You may modify your preferences or unsubscribe at any time with a single click.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={subscribing}
                      className="w-full bg-black hover:bg-neutral-800 text-white rounded-none font-mono text-xs uppercase tracking-wider py-4 cursor-pointer"
                    >
                      {subscribing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Subscribe to Dispatch
                        </>
                      )}
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
                <div className="inline-flex items-center px-3 py-1 bg-black text-white border border-neutral-700 text-xs uppercase tracking-widest font-mono mb-4">
                  <FileText className="h-3.5 w-3.5 mr-2 text-white" />
                  <span>Archive</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                  Recent Issues
                </h2>
                <p className="text-base md:text-lg text-neutral-600 font-sans font-light max-w-2xl mx-auto">
                  Browse previous dispatches from our editorial collection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentIssues.map((issue) => (
                  <Card
                    key={issue.id}
                    className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-all flex flex-col group overflow-hidden"
                  >
                    <div className="relative h-52 bg-neutral-900 border-b border-neutral-200 overflow-hidden">
                      {issue.image ? (
                        <Image
                          src={issue.image}
                          alt={issue.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          <Mail className="h-16 w-16 text-neutral-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(issue.publishedAt)}
                        </span>
                        <Badge className="bg-white/20 text-white border border-white/30 rounded-none font-mono text-[10px] uppercase">
                          {issue.readTime}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl font-serif text-black mb-2 group-hover:text-neutral-700 transition-colors line-clamp-2">
                          {issue.title}
                        </CardTitle>
                        <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-3">
                          {issue.excerpt}
                        </p>
                      </CardHeader>

                      <div className="flex flex-wrap gap-1.5 mb-6 mt-auto pt-4 border-t border-neutral-100">
                        {issue.topics.map((topic) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="border-neutral-200 text-neutral-700 rounded-none font-mono text-[10px] uppercase tracking-wider bg-neutral-50"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-neutral-300 text-black hover:bg-neutral-100 rounded-none font-mono text-xs uppercase tracking-wider py-2.5"
                      >
                        Read Full Dispatch
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
