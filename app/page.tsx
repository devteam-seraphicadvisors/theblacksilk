import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/intro-section";
import { Stats } from "@/components/stats";
import { CommitteesSection } from "@/components/committees-section";
import { FeaturedContent } from "@/components/featured-content";
import { CallToAction } from "@/components/call-to-action";
import { generateMetadata } from "@/lib/seo";

// Force dynamic rendering - this page uses database-dependent components
export const dynamic = "force-dynamic";
export const revalidate = 300; // Revalidate every 5 minutes

export const metadata = generateMetadata({
  title: "The Black Silk — Ethical Standards & Policy for the Digital Future",
  description:
    "A not-for-profit organization working toward the ethical development and judicious use of digital technologies for the greater good. Bringing together academicians, policymakers, lawmakers, and expert professionals.",
  keywords: [
    "The Black Silk",
    "ethical digital technology",
    "legal technology",
    "tech policy India",
    "digital law",
    "data protection",
    "artificial intelligence ethics",
  ],
  canonical: "https://theblacksilk.org",
});

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://theblacksilk.org/#organization",
        name: "The Black Silk",
        url: "https://theblacksilk.org",
        logo: {
          "@type": "ImageObject",
          url: "https://theblacksilk.org/images/logo-icon.png",
          width: 112,
          height: 112,
        },
        description:
          "Not-for-profit organization working toward the ethical development and judicious use of digital technologies for the greater good.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-11-1234-5678",
          contactType: "customer service",
          email: "info@blacksilk.org",
          areaServed: "IN",
          availableLanguage: "en",
        },
        sameAs: [
          "https://x.com/TheBlackSilk",
          "https://www.facebook.com/TheBlackSilk.org",
          "https://www.linkedin.com/company/the-black-silk",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://theblacksilk.org/#website",
        url: "https://theblacksilk.org",
        name: "The Black Silk",
        description:
          "Ethical Development and Judicious Use of Digital Technologies",
        publisher: {
          "@id": "https://theblacksilk.org/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://theblacksilk.org/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://theblacksilk.org/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://theblacksilk.org",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main className="w-full min-h-screen">
        <Hero />
        <IntroSection />
        <Stats />
        <CommitteesSection />
        <FeaturedContent />
        <CallToAction />
      </main>
    </>
  );
}
