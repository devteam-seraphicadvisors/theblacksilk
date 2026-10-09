const HASHNODE_API_URL = "https://gql.hashnode.com/";

export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
  author: {
    name: string;
    profilePicture?: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
  content?: {
    html: string;
  };
}

const FALLBACK_POSTS: HashnodePost[] = [
  {
    id: "fb-post-1",
    title: "The Regulatory Frontier of Artificial Intelligence: Navigating the 2026 Landscape",
    brief: "An in-depth analysis of emerging generative AI regulations, accountability frameworks, and liability doctrines shaping modern digital jurisprudence.",
    slug: "regulatory-frontier-artificial-intelligence-2026",
    publishedAt: "2026-03-15T10:00:00.000Z",
    coverImage: {
      url: "/images/events-hero.jpg",
    },
    author: {
      name: "The Black Silk Editorial Board",
      profilePicture: "/images/editorial-avatar.jpg",
    },
    tags: [
      { name: "Artificial Intelligence", slug: "artificial-intelligence" },
      { name: "Legal Tech", slug: "legal-tech" },
      { name: "Policy", slug: "policy" },
    ],
    content: {
      html: `
        <p>As autonomous systems integrate into corporate decision-making and statutory compliance, the global legal fraternity is confronted with unprecedented questions of algorithmic accountability and intellectual property rights.</p>
        <h2>The Triad of Algorithmic Accountability</h2>
        <p>Modern regulatory architecture focuses on transparency, interpretability, and demonstrable bias auditing. Regulators across jurisdictions are establishing stringent testing requirements for high-risk autonomous agents deployed within enterprise workflows.</p>
        <h2>Liability Doctrines in Transition</h2>
        <p>From product liability to vicarious accountability, court systems are redefining traditional fault principles when damages arise from non-deterministic neural models.</p>
      `,
    },
  },
  {
    id: "fb-post-2",
    title: "Digital Personal Data Protection: Strategic Compliance for Tech Leaders",
    brief: "Key operational steps for technology enterprises implementing data fiduciary obligations, consent mechanisms, and cross-border processing.",
    slug: "digital-personal-data-protection-compliance-guide",
    publishedAt: "2026-02-28T14:30:00.000Z",
    coverImage: {
      url: "/images/events-hero.jpg",
    },
    author: {
      name: "Adv. Rajesh Varma",
      profilePicture: "/images/speaker-avatar.jpg",
    },
    tags: [
      { name: "Data Privacy", slug: "data-privacy" },
      { name: "Compliance", slug: "compliance" },
      { name: "DPDP", slug: "dpdp" },
    ],
    content: {
      html: `
        <p>Ensuring compliance with data protection mandates demands technical architecture alignment alongside legal review. From verifiable parental consent to automated data erasure workflows, engineering and legal teams must collaborate continuously.</p>
      `,
    },
  },
  {
    id: "fb-post-3",
    title: "Smart Contracts & Autonomous Dispute Resolution: Enforceability and Precedent",
    brief: "Exploring the boundary between self-executing code and codified contract law, analyzing arbitration clauses embedded in distributed ledgers.",
    slug: "smart-contracts-autonomous-dispute-resolution",
    publishedAt: "2026-01-20T09:15:00.000Z",
    coverImage: {
      url: "/images/events-hero.jpg",
    },
    author: {
      name: "Dr. Ananya Sen",
      profilePicture: "/images/author-avatar.jpg",
    },
    tags: [
      { name: "Blockchain", slug: "blockchain" },
      { name: "Smart Contracts", slug: "smart-contracts" },
      { name: "Dispute Resolution", slug: "dispute-resolution" },
    ],
    content: {
      html: `
        <p>Smart contracts represent deterministic transactional commitments; however, ambiguity arises when unforeseen externalities or cryptographic exploits occur. We analyze how conventional arbitral tribunals interpret automated consensus.</p>
      `,
    },
  },
];

export function getFallbackPosts(): HashnodePost[] {
  return FALLBACK_POSTS;
}

export async function getHashnodePosts(first = 10): Promise<HashnodePost[]> {
  const query = `
    query GetPosts($first: Int!) {
      publication(host: "${process.env.HASHNODE_PUBLICATION_HOST}") {
        posts(first: $first) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
              author {
                name
                profilePicture
              }
              tags {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

  try {
    const host = process.env.HASHNODE_PUBLICATION_HOST;
    const token = process.env.HASHNODE_API_TOKEN;

    if (!host || host.includes("your-") || !token || token.includes("your-")) {
      return getFallbackPosts();
    }

    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { first },
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.warn(`Hashnode API responded with HTTP status ${response.status}`);
      return getFallbackPosts();
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("Hashnode API response is not application/json");
      return getFallbackPosts();
    }

    const data = await response.json();

    if (data.errors) {
      console.warn("Hashnode GraphQL returned errors:", data.errors);
      return getFallbackPosts();
    }

    const posts =
      data.data?.publication?.posts?.edges?.map((edge: any) => edge.node) || [];
    
    if (posts.length === 0) {
      return getFallbackPosts();
    }

    return posts;
  } catch (error) {
    console.warn("Unable to fetch Hashnode posts, using fallback articles:", error instanceof Error ? error.message : error);
    return getFallbackPosts();
  }
}

export async function getHashnodePost(
  slug: string
): Promise<HashnodePost | null> {
  const query = `
    query GetPost($slug: String!) {
      publication(host: "${process.env.HASHNODE_PUBLICATION_HOST}") {
        post(slug: $slug) {
          id
          title
          brief
          slug
          publishedAt
          content {
            html
          }
          coverImage {
            url
          }
          author {
            name
            profilePicture
          }
          tags {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    const host = process.env.HASHNODE_PUBLICATION_HOST;
    const token = process.env.HASHNODE_API_TOKEN;

    if (!host || host.includes("your-") || !token || token.includes("your-")) {
      return getFallbackPosts().find((p) => p.slug === slug) || null;
    }

    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`Hashnode API responded with HTTP status ${response.status}`);
      return getFallbackPosts().find((p) => p.slug === slug) || null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("Hashnode API response is not application/json");
      return getFallbackPosts().find((p) => p.slug === slug) || null;
    }

    const data = await response.json();

    if (data.errors) {
      console.warn("Hashnode GraphQL returned errors:", data.errors);
      return getFallbackPosts().find((p) => p.slug === slug) || null;
    }

    if (!data.data || !data.data.publication || !data.data.publication.post) {
      return getFallbackPosts().find((p) => p.slug === slug) || null;
    }

    return data.data.publication.post;
  } catch (error) {
    console.warn("Unable to fetch Hashnode post, using fallback post:", error instanceof Error ? error.message : error);
    return getFallbackPosts().find((p) => p.slug === slug) || null;
  }
}
