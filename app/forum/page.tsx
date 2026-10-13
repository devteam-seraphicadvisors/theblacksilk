import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { AccountCta } from "@/components/account-cta";
import {
  MessageSquare,
  MessagesSquare,
  LayoutGrid,
  Search,
  UserPlus,
  UserCheck,
  LogIn,
  ShieldCheck,
} from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "Community Forum - The Black Silk",
  description:
    "Discuss law, technology, ethics, and digital policy with academicians, policymakers, lawmakers, and practitioners. Create a free account to join the conversation.",
  canonical: "https://theblacksilk.org/forum",
});

const capabilities = [
  {
    icon: MessageSquare,
    title: "Start Discussions",
    description:
      "Raise a question, share a development, or open a debate on an emerging issue in law and technology.",
  },
  {
    icon: MessagesSquare,
    title: "Reply and Debate",
    description:
      "Add your perspective to ongoing threads and engage directly with practitioners, academics, and policymakers.",
  },
  {
    icon: LayoutGrid,
    title: "Browse by Topic",
    description:
      "Follow the practice areas that matter to you, from AI governance to data protection and fintech.",
  },
  {
    icon: Search,
    title: "Search Discussions",
    description:
      "Find earlier conversations quickly and build on what the community has already discussed.",
  },
];

const topics = [
  {
    name: "AI & Law",
    description: "Governance frameworks, liability, and the use of AI in legal practice and courts.",
  },
  {
    name: "Cybersecurity",
    description: "Compliance obligations, incident response, and security standards.",
  },
  {
    name: "Data Privacy",
    description: "The DPDP Act, consent, cross-border data flows, and user rights.",
  },
  {
    name: "Fintech",
    description: "Digital payments, lending, and the regulation of financial technology.",
  },
  {
    name: "Blockchain",
    description: "Smart contracts, digital assets, and their legal implications.",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Create a free account",
    description: "Sign up with your email or Google account. No membership is required.",
  },
  {
    icon: UserCheck,
    title: "Complete your profile",
    description: "Tell us about your background and interests so the community knows who you are.",
  },
  {
    icon: LogIn,
    title: "Open the forum",
    description: "Find the forum in your dashboard and join the conversation.",
  },
];

const guidelines = [
  "Be respectful. Debate ideas, not people.",
  "Discussions are for exchange of views and do not constitute legal advice.",
  "Do not share confidential, privileged, or client information.",
  "Keep posts relevant to law, technology, ethics, and digital policy.",
];

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <MessageSquare className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Discussion & Exchange</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Community Forum
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-10">
              A space for academicians, policymakers, lawmakers, and practitioners
              to discuss the hardest questions at the intersection of law,
              technology, and ethics.
            </p>
            <div className="flex justify-center">
              <AccountCta tone="dark" signedInHref="/dashboard/forum" signedInLabel="Open Forum" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                After You Sign In
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                What You Can Do
              </h2>
              <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                The forum is open to every registered member of The Black Silk
                community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((item) => (
                <Card
                  key={item.title}
                  className="border border-neutral-200 bg-white rounded-none shadow-none hover:border-black transition-colors"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-black border border-neutral-800 flex items-center justify-center mb-6">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-normal text-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-24 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                Topics
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                What We Discuss
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <div key={topic.name} className="border-l-4 border-black bg-neutral-50 p-6">
                  <h3 className="text-lg font-serif font-normal text-black mb-2">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                Getting Started
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black mb-4">
                How to Join
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="border border-neutral-200 bg-white p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-black flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-normal text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-24 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div>
              <div className="w-14 h-14 bg-black flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-normal text-black">
                Community Guidelines
              </h2>
            </div>
            <ul className="md:col-span-2 space-y-4">
              {guidelines.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start border-b border-neutral-200 pb-4 text-neutral-700 font-sans leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 bg-black mt-2.5 mr-4 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-serif font-normal text-black mb-2">
                Ready to join the conversation?
              </h2>
              <p className="text-neutral-600 font-sans">
                Creating an account is free and takes less than a minute.
              </p>
            </div>
            <AccountCta tone="light" signedInHref="/dashboard/forum" signedInLabel="Open Forum" />
          </div>
        </div>
      </section>
    </main>
  );
}
