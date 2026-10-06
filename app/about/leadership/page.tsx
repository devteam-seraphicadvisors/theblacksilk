import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Mail, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = generateSeoMetadata({
  title: "Leadership & Governance — The Black Silk",
  description:
    "Meet the leadership team guiding The Black Silk: bringing decades of experience in law, technology, and public policy in India.",
  canonical: "https://theblacksilk.org/about/leadership",
});

const leaders = [
  {
    name: "KPS Kohli",
    position: "President",
    image: "/images/kps-kohli.jpg",
    email: "kpskohli@theblacksilk.org",
    social: {
      linkedin: "https://www.linkedin.com/company/the-black-silk",
      twitter: "https://x.com/TheBlackSilk",
    },
    expertise: [
      "Telecommunications Law",
      "IT & Media Law",
      "Intellectual Property",
      "Tech Policy",
      "Dispute Resolution & Arbitration",
      "Commercial & Corporate Law",
    ],
    paragraphs: [
      "KPS Kohli is a Partner at Seraphic Advisors, Advocates and Solicitors, and a trained mediator with deep experience across telecommunications, IT, media and entertainment, intellectual property, aviation, and public policy. His work sits directly at the intersection of law and digital technology, the space The Black Silk was built to address.",
      "He regularly advises clients, including government ministries, regulatory bodies, and trade groups, on the legal and business impact of shifting technology policy, and has represented clients before the High Courts, Tribunals, and the Supreme Court of India, as well as international arbitral tribunals under rules including ICC, DIS, SCC, and CIETAC. His international practice spans jurisdictions including the United Kingdom, Germany, Italy, Sweden, Singapore, Hong Kong, Nepal, Australia, and the United States.",
      "Mr. Kohli has appeared as a witness before the Parliamentary Standing Committee on the Commercial Courts Bill, 2015, and advised the Comptroller of the Digital Locker Authority on the licensing framework for digital locker services in India, work that speaks directly to the ethical and regulatory questions The Black Silk brings to public discussion. He leads The Black Silk with the same hands-on, stakeholder-focused approach that defines his legal practice.",
    ],
  },
  {
    name: "Roopa Somasundaran",
    position: "Secretary",
    image: "/images/roopa.jpg",
    email: "roopa@theblacksilk.org",
    social: {
      linkedin: "https://www.linkedin.com/company/the-black-silk",
      twitter: "https://x.com/TheBlackSilk",
    },
    expertise: [
      "Practice Development",
      "Knowledge Management",
      "Corporate Relations",
      "Strategic Communications",
      "Media & Public Dialogue",
      "Advocacy & Social Impact",
    ],
    paragraphs: [
      "Roopa Somasundaran serves as Secretary of The Black Silk, where she leads Practice Development, Knowledge Management, and Corporate Relations, overseeing strategic communication, business network management, and knowledge marketing for the organization. She works closely with partners and practice groups to build and manage relationships, and develops the brand strategy and communications that carry The Black Silk's work to a wider audience.",
      "A practicing lawyer and member of the Bar Council of Punjab and Haryana, she brings research and writing to the organization's public work as well, with articles published in Mondaq and other journals, work that feeds directly into The Black Silk's own mission of inclusive, evidence-based discussion on digital technology.",
      "Beyond her legal practice, Roopa is a bestseller author, radio jockey with FM Rainbow, motivational speaker, and entrepreneur, a range that reflects the same multidisciplinary, public-facing approach she brings to her role at The Black Silk. She holds leadership positions including IT Chair for Rotary Club Tulips, Treasurer and Member at Large for IWIRC India, and Joint Secretary of the Malayalee Association, and serves as a Patron Board Member for NGOs including Mission Jagriti, Jazbaa Foundation, and Sambharye Foundation.",
      "She has spoken at platforms including the TerraLex Conference, CII, and PHD Chambers, and her work in law and social service has been recognized with honors including the Karmaveer Chakra, instituted by iCONGO in partnership with the United Nations, and the Woman of Substance award.",
    ],
  },
];

export default function LeadershipPage() {
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
            Governance & Executive Board
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-8 leading-[1.1] tracking-tight">
            Leadership and Governance
          </h1>

          <p className="text-xl sm:text-2xl !text-neutral-200 font-sans font-light leading-relaxed max-w-3xl">
            Our leadership brings together decades of experience in law,
            technology, and policy, ensuring our initiatives are grounded in
            legal rigor and practical impact.
          </p>
        </div>
      </section>

      {/* Leadership Profiles */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-5xl space-y-20 lg:space-y-28">
          {leaders.map((leader, index) => (
            <article
              key={leader.name}
              className="border border-neutral-200 bg-white p-8 sm:p-12 transition-shadow hover:shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Photo & Role Card */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto lg:mx-0 border border-neutral-300 bg-neutral-100 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover grayscale contrast-110"
                      sizes="(max-width: 768px) 100vw, 300px"
                      priority={index === 0}
                    />
                  </div>

                  <div className="space-y-2 text-center lg:text-left">
                    <span className="inline-block px-3 py-1 border border-neutral-800 bg-black text-white text-xs uppercase tracking-widest font-mono">
                      {leader.position}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-black pt-1">
                      {leader.name}
                    </h2>
                  </div>

                  {/* Social and Contact Icons */}
                  <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2">
                    <Link
                      href={`mailto:${leader.email}`}
                      className="w-9 h-9 border border-neutral-300 bg-white flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-colors"
                      aria-label={`Email ${leader.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </Link>
                    <Link
                      href={leader.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-neutral-300 bg-white flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-colors"
                      aria-label={`${leader.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                    <Link
                      href={leader.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-neutral-300 bg-white flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-colors"
                      aria-label={`${leader.name} X`}
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Biography & Expertise */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-4 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed">
                    {leader.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Expertise Badges */}
                  <div className="pt-6 border-t border-neutral-200">
                    <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-3">
                      Areas of Practice & Expertise
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
