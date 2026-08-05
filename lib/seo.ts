import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[] | string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "/images/og-default.jpg",
  noIndex = false,
}: SEOProps): Metadata {
  const baseUrl = "https://theblacksilk.org";

  // Handle keywords as either string or array
  const keywordsString = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;

  return {
    title,
    description,
    keywords: keywordsString,
    authors: [{ name: "The Black Silk" }],
    creator: "The Black Silk",
    publisher: "The Black Silk",
    robots: noIndex ? "noindex, nofollow" : "index, follow",

    openGraph: {
      title,
      description,
      url: canonical || baseUrl,
      siteName: "The Black Silk",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@theblacksilk",
    },

    alternates: {
      canonical: canonical || baseUrl,
      languages: {
        "en-IN": canonical || baseUrl,
      },
    },

    verification: {
      google: "your-google-verification-code",
    },
  };
}

export const defaultSEO = {
  title: "The Black Silk - Leading Legal Technology & Policy Platform",
  description:
    "Join India's premier community of legal professionals, technologists, and policymakers. Access exclusive insights, events, and collaborative opportunities.",
  keywords: [
    "legal technology",
    "law policy",
    "legal community",
    "India legal tech",
    "legal professionals",
    "technology law",
    "The Black Silk",
    "legal tech India",
    "law and technology",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://theblacksilk.org",
    siteName: "The Black Silk",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "The Black Silk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theblacksilk",
    creator: "@theblacksilk",
  },
  alternates: {
    canonical: "https://theblacksilk.org",
    languages: {
      "en-IN": "https://theblacksilk.org",
    },
  },
};
