import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal-page";

// DRAFT: pending review by leadership / legal counsel (see content.md §8).
export const metadata = generateSeoMetadata({
  title: "Cookie Policy - The Black Silk",
  description:
    "Which cookies and similar technologies The Black Silk uses, and how to control them.",
  canonical: "https://theblacksilk.org/cookies",
});

const sections: LegalSection[] = [
  {
    heading: "What Are Cookies",
    paragraphs: [
      "Cookies are small text files stored on your device when you visit a website. We also use similar browser storage for a few functional purposes. This policy explains what we use and why.",
    ],
  },
  {
    heading: "Essential Cookies",
    paragraphs: [
      "These are required for the website to work and cannot be switched off in our systems:",
    ],
    list: [
      "Authentication cookies that keep you signed in and protect your session.",
      "Security cookies that help prevent cross-site request forgery.",
      "A short-lived preference cookie used to preview the site during scheduled maintenance.",
    ],
  },
  {
    heading: "Analytics Cookies",
    paragraphs: [
      "We use Google Analytics to understand how visitors use the website, such as which pages are visited and how long visits last. This information is aggregated and helps us improve our content. Google's handling of this data is described in Google's own privacy policy.",
    ],
  },
  {
    heading: "Third-Party Services",
    paragraphs: [
      "Some pages embed content or functionality from third parties, such as YouTube videos on the Events page and payment pages provided by Stripe and Razorpay. These services may set their own cookies, governed by their respective policies.",
    ],
  },
  {
    heading: "Managing Cookies",
    paragraphs: [
      "You can block or delete cookies through your browser settings. Blocking essential cookies will prevent you from signing in. You can opt out of Google Analytics across websites using Google's browser opt-out add-on.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about our use of cookies can be sent to info@theblacksilk.org. For more on how we handle personal data, see our Privacy Policy.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="Which cookies we use, why we use them, and how you can control them."
      lastUpdated="October 2026"
      sections={sections}
    />
  );
}
