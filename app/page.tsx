import { Hero } from "@/components/hero";
import { FeaturedContent } from "@/components/featured-content";
import { Stats } from "@/components/stats";
import { CallToAction } from "@/components/call-to-action";
import { CommitteesSection } from "@/components/committees-section";
import { generateMetadata } from "@/lib/seo";

// Force dynamic rendering - this page uses database-dependent components
export const dynamic = "force-dynamic";
export const revalidate = 300; // Revalidate every 5 minutes

export const metadata = generateMetadata({
  title: "The Black Silk - Leading Legal Technology & Policy Platform",
  description:
    "Join India's premier community of legal professionals, technologists, and policymakers. Access exclusive insights, events, and collaborative opportunities in law and technology.",
  keywords: [
    "legal technology",
    "law policy",
    "legal community",
    "India legal tech",
    "legal professionals",
    "technology law",
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
        description: "Leading legal technology and policy platform in India",
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
        description: "Leading Legal Technology & Policy Platform",
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
      <main className="bg-white">
        <Hero />
        <Stats />
        <CommitteesSection />
        <FeaturedContent />
        <CallToAction />
      </main>
    </>
  );
}
