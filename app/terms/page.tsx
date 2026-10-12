import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal-page";

// DRAFT: pending review by leadership / legal counsel (see content.md §8).
export const metadata = generateSeoMetadata({
  title: "Terms of Service - The Black Silk",
  description:
    "The terms that govern use of The Black Silk website, accounts, and membership.",
  canonical: "https://theblacksilk.org/terms",
});

const sections: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    paragraphs: [
      "These terms govern your use of theblacksilk.org and the services offered through it by The Black Silk. By using the website, creating an account, or purchasing a membership, you agree to these terms and to our Privacy Policy.",
    ],
  },
  {
    heading: "Accounts",
    list: [
      "You must provide accurate information and keep it up to date.",
      "You are responsible for keeping your login credentials confidential and for activity under your account.",
      "We may suspend or close accounts that breach these terms or are used unlawfully.",
    ],
  },
  {
    heading: "Membership",
    paragraphs: [
      "Memberships are offered in the individual and organizational tiers described on the Membership page, at the prices shown at the time of purchase. Benefits, eligibility, and any tier-specific conditions are as described on that page.",
      "Group memberships cover the named individuals listed at signup. Speaking opportunities and similar benefits, where included, remain subject to programming decisions.",
    ],
  },
  {
    heading: "Payments and Refunds",
    paragraphs: [
      "Payments are processed securely by our payment partners, Stripe and Razorpay. Applicable taxes are charged as shown at checkout.",
      "If you believe you have been charged in error or wish to request a refund, contact info@theblacksilk.org. Refund requests are reviewed in line with the refund terms communicated at the time of purchase.",
    ],
  },
  {
    heading: "Acceptable Use",
    paragraphs: ["When using the website, forum, and member features, you agree not to:"],
    list: [
      "Post unlawful, defamatory, harassing, or misleading content.",
      "Infringe the intellectual property or privacy of others.",
      "Attempt to gain unauthorized access to the platform or other users' data.",
      "Use the platform for unsolicited advertising or spam.",
    ],
  },
  {
    heading: "Content and Intellectual Property",
    paragraphs: [
      "Articles, fact sheets, newsletters, recordings, and other materials published by The Black Silk remain our property or that of their respective authors. You may share them for non-commercial purposes with attribution. Content you submit remains yours, but you grant us a licence to display it on the platform for the purpose for which you submitted it.",
    ],
  },
  {
    heading: "No Legal Advice",
    paragraphs: [
      "Content on this website is provided for general information and discussion. It does not constitute legal advice, and no lawyer-client relationship is created by your use of the website.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "The website is provided on an \"as is\" basis. To the extent permitted by law, The Black Silk is not liable for indirect or consequential loss arising from your use of the website or reliance on its content.",
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These terms are governed by the laws of India. Courts in New Delhi shall have jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "Changes and Contact",
    paragraphs: [
      "We may update these terms from time to time; the latest version will always be on this page. Questions about these terms can be sent to info@theblacksilk.org.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="The terms that govern your use of our website, accounts, and membership."
      lastUpdated="October 2026"
      sections={sections}
    />
  );
}
