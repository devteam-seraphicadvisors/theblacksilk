import { Suspense } from "react"
import Link from "next/link"
import { generateMetadata } from "@/lib/seo"
import { generateFAQSchema } from "@/lib/json-ld"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SponsorshipInquiryForm } from "@/components/sponsorship-inquiry-form"
import {
  Award,
  Users,
  Mic,
  Landmark,
  Network,
  FileText,
  Check,
  ArrowRight,
  ArrowUpRight,
  Mail,
  PhoneCall,
  FileSignature,
  Rocket,
} from "lucide-react"

export const metadata = generateMetadata({
  title: "Become A Sponsor - The Black Silk",
  description:
    "Sponsor The Black Silk and support the ethical development of digital technology. Explore annual sponsorship packages for organizations that want to engage with India's legal, policy, and technology community.",
  canonical: "https://theblacksilk.org/partnerships/sponsor",
})

const reasons = [
  {
    icon: Users,
    title: "Reach Decision-Makers",
    description:
      "Engage academicians, policymakers, lawmakers, and senior practitioners who shape how India governs digital technology.",
  },
  {
    icon: Landmark,
    title: "Thought Leadership",
    description:
      "Be associated with structured consultations and roundtables on the hardest questions in digital policy.",
  },
  {
    icon: Mic,
    title: "Events & Podcasts",
    description:
      "Gain visibility across our events, podcast episodes, and roundtables, with speaking opportunities at higher tiers.",
  },
  {
    icon: Award,
    title: "Support Ethical Technology",
    description:
      "Back a not-for-profit working toward the ethical development and judicious use of digital technologies for the greater good.",
  },
  {
    icon: Network,
    title: "Meaningful Networking",
    description:
      "Build relationships with leaders across law, government, academia, and industry through our community.",
  },
  {
    icon: FileText,
    title: "Content Collaboration",
    description:
      "Co-create research, publications, and events with our team at the Gold and Platinum levels.",
  },
]

const tiers = [
  {
    id: "bronze",
    name: "Bronze",
    price: "₹50,000",
    tagline: "Basic brand visibility and community recognition",
    popular: false,
    benefits: [
      "Logo on website footer",
      "Social media mentions (2/month)",
      "Newsletter inclusion (quarterly)",
      "Event program listing",
      "Certificate of partnership",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "₹1,25,000",
    tagline: "Enhanced visibility and a thought leadership platform",
    popular: true,
    benefits: [
      "Logo on website header",
      "Social media mentions (4/month)",
      "Newsletter inclusion (monthly)",
      "Event program prominent listing",
      "Speaking opportunity (1/year)",
      "Complimentary event tickets (2)",
      "Quarterly impact report",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹2,50,000",
    tagline: "Premium visibility and strategic partnership benefits",
    popular: false,
    benefits: [
      "Premium logo placement",
      "Social media mentions (8/month)",
      "Newsletter inclusion (bi-weekly)",
      "Event program featured listing",
      "Speaking opportunities (2/year)",
      "Complimentary event tickets (5)",
      "Monthly impact report",
      "Co-branded content opportunities",
      "Advisory board invitation",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "₹5,00,000",
    tagline: "Maximum visibility and an exclusive partnership",
    popular: false,
    benefits: [
      "Exclusive logo placement",
      "Social media mentions (12/month)",
      "Newsletter inclusion (weekly)",
      "Event program title sponsor",
      "Keynote speaking opportunities",
      "Complimentary event tickets (10)",
      "Weekly impact report",
      "Co-branded events",
      "Advisory board membership",
      "Custom partnership benefits",
    ],
  },
]

const steps = [
  {
    icon: Mail,
    title: "Send an Inquiry",
    description: "Tell us about your organization and the tier or goals you have in mind.",
  },
  {
    icon: PhoneCall,
    title: "Discovery Call",
    description: "Our partnerships team gets in touch to understand your objectives.",
  },
  {
    icon: FileSignature,
    title: "Tailored Proposal",
    description: "We share a proposal and agreement covering benefits, timelines, and terms.",
  },
  {
    icon: Rocket,
    title: "Onboarding & Activation",
    description: "We collect your brand assets and start delivering your sponsorship benefits.",
  },
]

const faqs = [
  {
    question: "How long does a sponsorship last?",
    answer:
      "All packages are annual. Before your term ends, our team will reach out to review results and discuss renewal.",
  },
  {
    question: "Can we customise a package?",
    answer:
      "Yes. If none of the tiers fits exactly, choose \"Not sure yet / custom package\" in the inquiry form and describe what you need. We will tailor a proposal around your goals.",
  },
  {
    question: "Are taxes included in the prices shown?",
    answer:
      "Prices shown are the annual sponsorship amounts. Applicable taxes, such as GST, will be confirmed in your sponsorship proposal.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "After the agreement is signed, we will ask for your logo files, brand guidelines, and a point of contact so we can begin delivering your benefits.",
  },
  {
    question: "Can we sponsor a specific event instead?",
    answer:
      "Yes. For sponsorship of our annual summit and other flagship events, see Conference Sponsorship, or mention the event in your inquiry.",
  },
]

const otherWays = [
  {
    title: "Global Sponsor",
    description: "Our premier, exclusive corporate partnership.",
    href: "/partnerships/global-sponsor",
  },
  {
    title: "Conference Sponsorship",
    description: "Sponsor our annual summit and flagship events.",
    href: "/partnerships/conference-sponsorship",
  },
  {
    title: "Allied Organizations",
    description: "Join our network of allied institutions.",
    href: "/partnerships/allied-organizations",
  },
  {
    title: "Strategic Partnerships",
    description: "Collaborate on research, policy, and programs.",
    href: "/get-involved/partnerships",
  },
]

export default function SponsorPage() {
  const jsonLd = generateFAQSchema(faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white border-b border-neutral-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
                <Award className="h-3.5 w-3.5 mr-2 text-white" />
                <span>Sponsorship</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
                Become A Sponsor
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-10">
                Support the ethical development of digital technology and engage
                with the people shaping India&apos;s legal and policy response to it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  className="bg-white !text-black hover:bg-neutral-200 rounded-none font-mono text-xs uppercase tracking-wider px-8 py-3 h-auto"
                >
                  <Link href="#packages">
                    View Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:!text-black rounded-none font-mono text-xs uppercase tracking-wider px-8 py-3 h-auto"
                >
                  <Link href="#sponsorship-form">Send an Inquiry</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Sponsor */}
        <section className="py-24 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-2xl mb-16">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                  Why Sponsor
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black tracking-tight mb-4">
                  Why Sponsor The Black Silk
                </h2>
                <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed">
                  Sponsorship connects your organization with a community working
                  on how digital technology should be developed, used, and governed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reasons.map((reason) => (
                  <div
                    key={reason.title}
                    className="border border-neutral-200 bg-white p-8 hover:border-black transition-colors"
                  >
                    <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                      <reason.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-normal text-black mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sponsorship Packages */}
        <section id="packages" className="py-24 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                  Annual Packages
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black tracking-tight mb-4">
                  Sponsorship Packages
                </h2>
                <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                  Choose the level that fits your goals. Every package can be
                  tailored to your organization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`relative flex flex-col p-8 border ${
                      tier.popular
                        ? "border-black border-2 bg-white"
                        : "border-neutral-200 bg-white hover:border-black transition-colors"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-8 bg-black text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1">
                        Most Popular
                      </span>
                    )}
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                      {tier.name} Sponsor
                    </span>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-serif font-normal text-black">
                        {tier.price}
                      </span>
                      <span className="text-sm text-neutral-500">/ year</span>
                    </div>
                    <p className="text-sm text-neutral-600 font-sans leading-relaxed mb-6 pb-6 border-b border-neutral-200">
                      {tier.tagline}
                    </p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start text-sm text-neutral-700">
                          <Check className="h-4 w-4 text-black mr-3 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full rounded-none font-mono text-xs uppercase tracking-wider ${
                        tier.popular
                          ? "bg-black hover:bg-neutral-800 !text-white"
                          : "bg-white border border-black text-black hover:bg-black hover:!text-white"
                      }`}
                    >
                      <Link href={`?tier=${tier.id}#sponsorship-form`}>
                        Choose {tier.name}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                  Process
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black tracking-tight">
                  How It Works
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Inquiry Form */}
        <section
          id="sponsorship-form"
          className="py-24 bg-white border-b border-neutral-200"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                  Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-black tracking-tight mb-4">
                  Sponsorship Inquiry
                </h2>
                <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed">
                  Share a few details and our partnerships team will get back to you.
                </p>
              </div>

              <div className="border border-neutral-200 p-6 md:p-10">
                <Suspense fallback={null}>
                  <SponsorshipInquiryForm
                    tiers={tiers.map(({ id, name, price }) => ({
                      id,
                      name: `${name} Sponsor`,
                      price,
                    }))}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                Questions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-black tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border border-neutral-200 bg-white px-6 py-2 rounded-none hover:border-black transition-colors data-[state=open]:border-black"
                >
                  <AccordionTrigger className="text-left font-serif text-lg sm:text-xl font-medium text-black hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 pb-6 border-t border-neutral-100">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Other Ways to Partner */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-normal text-black mb-8">
                Other Ways to Partner
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherWays.map((way) => (
                  <Link
                    key={way.href}
                    href={way.href}
                    className="group border border-neutral-200 p-6 hover:border-black transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-serif font-normal text-black">
                        {way.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-black transition-colors" />
                    </div>
                    <p className="text-sm text-neutral-600 font-sans">
                      {way.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
