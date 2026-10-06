import { generateMetadata } from "@/lib/seo";
import { Check, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = generateMetadata({
  title: "Membership Tiers & Pricing — The Black Silk",
  description:
    "The Black Silk brings together lawyers, in-house counsel, government professionals, academicians, and technology experts to shape the ethical standards governing digital technology in India.",
  canonical: "https://theblacksilk.org/community/membership",
});

const individualTiers = [
  {
    name: "Student",
    price: "₹1,500",
    period: "/year",
    tagline: "For students and early researchers in law & technology",
    features: [
      "Access to all webinars, public discussions, and consultations",
      "Subscription to committee briefs and publications",
      "Discounted registration for the annual Flagship Summit",
      "Entry-level listing in the Member Directory (Coming Soon)",
    ],
    href: "/community/membership/payment?tier=student",
    featured: false,
  },
  {
    name: "Government / Law Professor",
    price: "₹4,000",
    period: "/year",
    tagline: "For institutional voices, public servants, and legal academics",
    features: [
      "Everything in the Student tier",
      "Priority speaking opportunities at the Flagship Summit and closed roundtables",
      "Early access to committee briefs before public release",
      "Recognition as an institutional voice in the Member Directory (Coming Soon)",
    ],
    href: "/community/membership/payment?tier=government-academic",
    featured: false,
  },
  {
    name: "Advocate (under 5 yrs)",
    price: "₹6,000",
    period: "/year",
    tagline: "For junior legal practitioners enrolled with State Bar Councils",
    features: [
      "Everything in the Government / Law Professor tier",
      "Full searchable listing in the Member Directory, tagged by practice area (Coming Soon)",
      "Eligibility to join a Practice Committee (Coming Soon)",
      "Priority registration window before public sign-up opens for the Flagship Summit",
    ],
    href: "/community/membership/payment?tier=advocate-junior",
    featured: false,
  },
  {
    name: "In-house Counsel",
    price: "₹7,500",
    period: "/year",
    tagline: "For corporate legal counsel and digital compliance leads",
    features: [
      "Everything in the Advocate (under 5 yrs) tier",
      "Invitations to closed-door roundtables with regulators and policymakers",
      "Direct input into policy consultations relevant to industry practice",
      "Quarterly regulatory compliance and policy briefings",
    ],
    href: "/community/membership/payment?tier=in-house",
    featured: false,
  },
  {
    name: "Non-lawyer Professional",
    price: "₹8,000",
    period: "/year",
    tagline: "For technologists, policy analysts, founders, and researchers",
    features: [
      "Everything in the In-house Counsel tier",
      "Cross-sector visibility in the Member Directory, tagged as policy/tech voice (Coming Soon)",
      "Ability to bring industry-specific issues directly onto a Practice Committee's agenda (Coming Soon)",
      "Multi-disciplinary networking across tech and regulatory sectors",
    ],
    href: "/community/membership/payment?tier=non-lawyer",
    featured: false,
  },
  {
    name: "Advocate (5+ yrs)",
    price: "₹8,500",
    period: "/year",
    tagline: "For experienced advocates leading digital policy dialogue",
    features: [
      "Everything in the Non-lawyer professional tier",
      "Eligibility to lead a Practice Committee and author quarterly briefs (Coming Soon)",
      "Complimentary registration for the annual Flagship Summit",
      "Priority panel and speaking slots across all national summits",
    ],
    href: "/community/membership/payment?tier=advocate-senior",
    featured: true,
  },
];

const organizationalTiers = [
  {
    name: "Company (Up to 10 members)",
    price: "₹55,000",
    period: "/year",
    saving: "Save up to ₹25,000 vs individual",
    tagline: "For corporate legal teams, tech firms, and startups",
    features: [
      "All individual-tier benefits for each named member at the In-house Counsel level",
      "One shared company profile page in the Member Directory (Coming Soon)",
      "Single consolidated invoice and renewal for all members",
      "Dedicated corporate onboarding support",
    ],
    href: "/community/membership/payment?tier=company-small",
    featured: false,
  },
  {
    name: "Law Firm (Up to 10 members)",
    price: "₹85,000",
    period: "/year",
    saving: "Save ₹3,000 to ₹75,000 vs individual",
    tagline: "For boutique and mid-sized law firms handling technology practice",
    features: [
      "Everything in the Company (up to 10 members) tier, for all named members",
      "One dedicated account contact at The Black Silk",
      "Option to nominate one member for a Practice Committee leadership role",
      "Bulk onboarding support and firm listing",
    ],
    href: "/community/membership/payment?tier=law-firm-small",
    featured: false,
  },
  {
    name: "Company (11 to 20 members)",
    price: "₹90,000",
    period: "/year",
    saving: "Save up to ₹10,000 vs individual",
    tagline: "For large enterprise teams and technology conglomerates",
    features: [
      "All individual-tier benefits for each named member at the Advocate (5+ yrs) level",
      "Firm logo and profile featured in the Member Directory (Coming Soon)",
      "One complimentary Flagship Summit sponsorship mention",
      "Single consolidated invoice and renewal for all members",
    ],
    href: "/community/membership/payment?tier=company-medium",
    featured: false,
  },
  {
    name: "Law Firm (11 to 20 members)",
    price: "₹90,000",
    period: "/year",
    saving: "Save ₹3,500 to ₹80,000 vs individual",
    tagline: "For premier full-service law firms and institutional practices",
    features: [
      "Everything in the Law Firm (up to 10 members) tier, for all named members",
      "One dedicated account contact at The Black Silk",
      "Two Practice Committee leadership nominations",
      "Firm-level speaking or panel opportunity at the Flagship Summit",
    ],
    href: "/community/membership/payment?tier=law-firm-medium",
    featured: true,
  },
];

const faqs = [
  {
    q: "Is membership annual?",
    a: "Yes. All memberships run for 12 months from the date of payment and must be renewed annually to remain active.",
  },
  {
    q: "When does my membership start, and how do I renew?",
    a: "Your membership activates immediately upon payment. You will receive a renewal reminder before expiry; renewing before the Flagship Summit each year also qualifies you for member-rate summit registration.",
  },
  {
    q: "Can I switch tiers mid-year, e.g. if I get promoted or cross the 5-year mark?",
    a: "Yes. You can upgrade at any time by paying the difference between tiers. Downgrades take effect at your next renewal date.",
  },
  {
    q: "What happens if our team grows past 10 or 20 members mid-year?",
    a: "You can continue on your current tier's pricing for the rest of that membership year. At your next renewal, you will move to the tier appropriate for your team size at that time.",
  },
  {
    q: "Is there a refund if I want to cancel?",
    a: "Memberships are non-refundable once payment is processed, since benefits activate immediately.",
  },
  {
    q: "Who is eligible for the Advocate tiers, and what about non-lawyers?",
    a: "Any advocate enrolled with a State Bar Council in India is eligible, categorized by years since enrollment (under 5 yrs / 5+ yrs). The Non-lawyer professional tier is open to anyone in policy, technology, or academia working on tech law and digital policy issues.",
  },
  {
    q: "How does Company or Law Firm membership work?",
    a: "You list all covered members by name and email at signup. Each named member gets individual login access and benefits at the specified tier (In-house Counsel for Company, Advocate 5+ yrs for Law Firm). One-time substitutions are allowed if someone leaves during the year.",
  },
  {
    q: "Does membership guarantee a speaking slot at the Flagship Summit?",
    a: "Only the Advocate (5+ yrs) individual tier and Law Firm (11–20 members) group tier include a speaking or panel opportunity, subject to programming decisions. Other tiers receive discounted or priority registration, not a guaranteed slot.",
  },
  {
    q: "What payment methods are accepted, and is GST included?",
    a: "Supported payment channels include Credit/Debit Cards, NetBanking, and UPI. All membership rates are invoiced annually according to applicable regulatory compliance.",
  },
];

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Editorial Hero */}
      <section className="relative py-20 lg:py-32 bg-black text-white border-b border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="inline-block px-3 py-1 border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-6">
            Community & Governance
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-8 leading-[1.1] tracking-tight">
            Membership Tiers & Pricing
          </h1>

          <p className="text-xl sm:text-2xl !text-neutral-200 font-sans font-light leading-relaxed max-w-3xl">
            The Black Silk brings together lawyers, in-house counsel, government
            professionals, academicians, and technology experts to shape the
            ethical standards governing digital technology in India. Membership
            gives you a direct voice in that work, and access grows with your
            level of involvement.
          </p>
        </div>
      </section>

      {/* Membership Tiers Tabs */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs defaultValue="individual" className="w-full">
            {/* Tab Navigation Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b border-neutral-200 mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-2">
                  Subscription Plans
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-black">
                  Select Your Category
                </h2>
              </div>

              <TabsList className="bg-neutral-100 p-1 border border-neutral-300 rounded-none h-auto">
                <TabsTrigger
                  value="individual"
                  className="rounded-none px-6 py-3 font-mono text-xs uppercase tracking-wider data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none transition-all cursor-pointer"
                >
                  Individual Memberships
                </TabsTrigger>
                <TabsTrigger
                  value="organizational"
                  className="rounded-none px-6 py-3 font-mono text-xs uppercase tracking-wider data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none transition-all cursor-pointer"
                >
                  Organizational Memberships
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Individual Memberships Grid (6 Tiers) */}
            <TabsContent value="individual" className="mt-0 focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {individualTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`border p-8 sm:p-10 flex flex-col justify-between transition-all ${
                      tier.featured
                        ? "bg-black text-white border-black shadow-2xl relative"
                        : "bg-white text-black border-neutral-200 hover:border-black"
                    }`}
                  >
                    {tier.featured && (
                      <div className="absolute top-0 right-0 bg-white text-black font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-semibold border-b border-l border-black">
                        Recommended
                      </div>
                    )}

                    <div>
                      <div className="mb-6">
                        <span
                          className={`font-mono text-xs uppercase tracking-wider block mb-2 ${
                            tier.featured ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          Individual Tier
                        </span>
                        <h3 className="text-2xl font-serif font-medium leading-tight mb-2">
                          {tier.name}
                        </h3>
                        <p
                          className={`text-xs font-sans leading-relaxed min-h-[36px] ${
                            tier.featured ? "!text-neutral-300" : "text-neutral-600"
                          }`}
                        >
                          {tier.tagline}
                        </p>
                      </div>

                      <div className="mb-8 pb-6 border-b border-neutral-200/40">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-serif font-normal tracking-tight">
                            {tier.price}
                          </span>
                          <span
                            className={`text-xs font-mono uppercase tracking-wider ${
                              tier.featured ? "text-neutral-400" : "text-neutral-500"
                            }`}
                          >
                            {tier.period}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3.5 mb-8">
                        {tier.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start text-xs sm:text-sm font-sans leading-relaxed"
                          >
                            <div
                              className={`w-4 h-4 rounded-none border flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 ${
                                tier.featured
                                  ? "border-white bg-white text-black"
                                  : "border-black bg-black text-white"
                              }`}
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </div>
                            <span
                              className={
                                tier.featured ? "!text-neutral-200" : "text-neutral-700"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.href}
                      className={`w-full inline-flex items-center justify-center py-3.5 px-6 font-mono text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer group ${
                        tier.featured
                          ? "bg-white text-black border-white hover:bg-neutral-200 hover:text-black"
                          : "bg-black text-white border-black hover:bg-neutral-800"
                      }`}
                    >
                      <span>Choose {tier.name}</span>
                      <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Organizational Memberships Grid (4 Tiers) */}
            <TabsContent value="organizational" className="mt-0 focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {organizationalTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`border p-8 sm:p-10 flex flex-col justify-between transition-all ${
                      tier.featured
                        ? "bg-black text-white border-black shadow-2xl relative"
                        : "bg-white text-black border-neutral-200 hover:border-black"
                    }`}
                  >
                    {tier.saving && (
                      <div
                        className={`inline-block self-start font-mono text-[10px] uppercase tracking-widest px-3 py-1 mb-4 font-semibold border ${
                          tier.featured
                            ? "bg-neutral-900 text-white border-neutral-700"
                            : "bg-neutral-100 text-black border-neutral-300"
                        }`}
                      >
                        {tier.saving}
                      </div>
                    )}

                    <div>
                      <div className="mb-6">
                        <span
                          className={`font-mono text-xs uppercase tracking-wider block mb-2 ${
                            tier.featured ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          Institutional Tier
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-medium leading-tight mb-2">
                          {tier.name}
                        </h3>
                        <p
                          className={`text-sm font-sans leading-relaxed ${
                            tier.featured ? "!text-neutral-300" : "text-neutral-600"
                          }`}
                        >
                          {tier.tagline}
                        </p>
                      </div>

                      <div className="mb-8 pb-6 border-b border-neutral-200/40">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl sm:text-5xl font-serif font-normal tracking-tight">
                            {tier.price}
                          </span>
                          <span
                            className={`text-xs font-mono uppercase tracking-wider ${
                              tier.featured ? "text-neutral-400" : "text-neutral-500"
                            }`}
                          >
                            {tier.period}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {tier.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm font-sans leading-relaxed"
                          >
                            <div
                              className={`w-4 h-4 rounded-none border flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 ${
                                tier.featured
                                  ? "border-white bg-white text-black"
                                  : "border-black bg-black text-white"
                              }`}
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </div>
                            <span
                              className={
                                tier.featured ? "!text-neutral-200" : "text-neutral-700"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.href}
                      className={`w-full inline-flex items-center justify-center py-4 px-6 font-mono text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer group ${
                        tier.featured
                          ? "bg-white text-black border-white hover:bg-neutral-200 hover:text-black"
                          : "bg-black text-white border-black hover:bg-neutral-800"
                      }`}
                    >
                      <span>Choose {tier.name}</span>
                      <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
              Clarifications & Guidelines
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-sans">
              Everything you need to know about membership terms, renewals, and
              tier eligibility.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-neutral-200 bg-white px-6 py-2 rounded-none hover:border-black transition-colors data-[state=open]:border-black"
              >
                <AccordionTrigger className="text-left font-serif text-lg sm:text-xl font-medium text-black hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 pb-6 border-t border-neutral-100">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
