import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal-page";

// DRAFT: pending review by leadership / legal counsel (see content.md §8).
export const metadata = generateSeoMetadata({
  title: "Privacy Policy - The Black Silk",
  description:
    "How The Black Silk collects, uses, and protects personal data in line with the Digital Personal Data Protection Act, 2023.",
  canonical: "https://theblacksilk.org/privacy",
});

const sections: LegalSection[] = [
  {
    heading: "Who We Are",
    paragraphs: [
      "The Black Silk is a not-for-profit organization based in New Delhi, India, working toward the ethical development and judicious use of digital technologies. This policy explains how we process personal data when you visit theblacksilk.org, create an account, become a member, or otherwise interact with us.",
      "We process personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian law.",
    ],
  },
  {
    heading: "Data We Collect",
    list: [
      "Account details: your name, email address, and password (stored only in hashed form), or your basic Google profile if you sign in with Google.",
      "Profile and onboarding information you choose to provide, such as organization, position, location, biography, and areas of expertise.",
      "Membership and payment records: membership tier, status, and dates. Card, UPI, and bank details are entered directly with our payment processors and are not stored by us.",
      "Form submissions: messages, volunteer, partnership, sponsorship, committee, job, and event-registration applications.",
      "Newsletter subscriptions: your email address and any optional details you add.",
      "Usage data: pages visited, device and browser information, collected through cookies and Google Analytics (see our Cookie Policy).",
    ],
  },
  {
    heading: "How We Use Your Data",
    list: [
      "To create and secure your account and provide member services.",
      "To process membership payments and maintain related records.",
      "To review and respond to applications, enquiries, and registrations.",
      "To send newsletters and updates you have subscribed to. You can unsubscribe at any time.",
      "To understand how the website is used so we can improve it.",
      "To comply with legal obligations.",
    ],
  },
  {
    heading: "Legal Basis and Consent",
    paragraphs: [
      "We process your personal data on the basis of the consent you give when you submit information to us, and for legitimate uses permitted under the DPDP Act, such as fulfilling a service you have requested. You may withdraw consent at any time; withdrawal does not affect processing carried out before it.",
    ],
  },
  {
    heading: "Sharing Your Data",
    paragraphs: [
      "We do not sell personal data. We share it only with service providers who process it on our behalf, and only as needed to operate the website:",
    ],
    list: [
      "Payment processors (Stripe and Razorpay) to handle membership payments.",
      "Google, for Google sign-in and Google Analytics.",
      "Hosting, database, and real-time messaging providers that run the platform.",
      "Authorities, where disclosure is required by law.",
    ],
  },
  {
    heading: "Data Retention and Security",
    paragraphs: [
      "We keep personal data only for as long as it is needed for the purposes described above, or as required by law, after which it is deleted or anonymized. We use reasonable technical and organizational safeguards, including encrypted connections and hashed passwords, to protect your data.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: ["Under the DPDP Act, you have the right to:"],
    list: [
      "Access a summary of the personal data we hold about you.",
      "Request correction, completion, or updating of your data.",
      "Request erasure of your data, subject to legal retention requirements.",
      "Withdraw consent and unsubscribe from communications.",
      "Nominate another person to exercise your rights in case of death or incapacity.",
      "Raise a grievance with us, and escalate it to the Data Protection Board of India.",
    ],
  },
  {
    heading: "Contact and Grievances",
    paragraphs: [
      "To exercise your rights or raise a concern about how your data is handled, write to info@theblacksilk.org or use our contact page. We will acknowledge and respond to grievances within the timelines required by law.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this policy from time to time. The latest version will always be available on this page, with the date of the last update shown alongside it.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How we collect, use, and protect your personal data."
      lastUpdated="October 2026"
      sections={sections}
    />
  );
}
