const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding publications and events...");

  // Seed Publications
  const publications = [
    {
      title:
        "The Future of AI Governance in India: Balancing Innovation and Regulation",
      excerpt:
        "An in-depth analysis of India's approach to AI regulation and its implications for the tech industry, legal framework, and society at large.",
      content:
        "Artificial Intelligence is transforming every aspect of society, and India is at a critical juncture in determining how to regulate this powerful technology...",
      category: "Tech Policy",
      readTime: "8 min read",
      author: "Dr. Priya Sharma",
      authorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      views: 2300,
      downloads: 450,
      type: "article",
      tags: ["AI Governance", "Technology Policy", "India"],
      featured: true,
      published: true,
      publishedAt: new Date("2024-12-15"),
    },
    {
      title: "Blockchain in Legal Documentation: A Comprehensive Guide",
      excerpt:
        "How distributed ledger technology is transforming legal document management and verification processes across industries.",
      category: "Technology",
      readTime: "12 min read",
      author: "Legal Tech Team",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      views: 1850,
      downloads: 245,
      type: "white-paper",
      tags: ["Blockchain", "Legal Tech", "Documentation"],
      pdfUrl: "/downloads/blockchain-legal-docs.pdf",
      featured: false,
      published: true,
      publishedAt: new Date("2024-12-10"),
    },
    {
      title: "Data Protection Laws: Comparative Analysis",
      excerpt:
        "Comparative study of data protection regulations across jurisdictions and their impact on Indian businesses.",
      category: "Privacy",
      readTime: "10 min read",
      author: "Privacy Committee",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
      views: 1650,
      downloads: 189,
      type: "research-report",
      tags: ["Data Privacy", "GDPR", "Compliance"],
      pdfUrl: "/downloads/data-protection-comparative.pdf",
      featured: false,
      published: true,
      publishedAt: new Date("2024-11-28"),
    },
    {
      title: "Fintech Regulation Framework for India",
      excerpt:
        "Exploring the regulatory landscape for financial technology startups in India and recommendations for policy makers.",
      category: "Fintech",
      readTime: "15 min read",
      author: "Fintech Working Group",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      views: 1420,
      downloads: 156,
      type: "policy-brief",
      tags: ["Fintech", "Regulation", "Banking"],
      pdfUrl: "/downloads/fintech-framework.pdf",
      featured: false,
      published: true,
      publishedAt: new Date("2024-11-15"),
    },
    {
      title: "Cybersecurity in the Age of Digital India",
      excerpt:
        "Examining cybersecurity challenges and opportunities in India's rapidly digitalizing economy.",
      category: "Cybersecurity",
      readTime: "9 min read",
      author: "Cybersecurity Policy Group",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      views: 1980,
      downloads: 310,
      type: "article",
      tags: ["Cybersecurity", "Digital India", "Security Policy"],
      featured: false,
      published: true,
      publishedAt: new Date("2024-11-05"),
    },
  ];

  for (const pub of publications) {
    await prisma.publication.create({ data: pub });
  }

  console.log(`Created ${publications.length} publications`);

  // Seed Events
  const events = [
    {
      title: "Digital Rights & Privacy: A Legal Symposium",
      description:
        "Join leading experts discussing the evolving landscape of digital rights in India. This symposium will cover data protection laws, privacy frameworks, and the intersection of technology and human rights.",
      date: new Date("2025-01-20T14:00:00"),
      endDate: new Date("2025-01-20T17:00:00"),
      location: "India Habitat Centre, New Delhi",
      isVirtual: false,
      maxAttendees: 150,
      price: 0,
      status: "upcoming",
    },
    {
      title: "AI Ethics in Legal Practice Workshop",
      description:
        "Hands-on workshop exploring ethical considerations when implementing AI tools in legal practice. Learn about bias mitigation, transparency, and accountability.",
      date: new Date("2025-01-25T10:00:00"),
      endDate: new Date("2025-01-25T16:00:00"),
      location: "Virtual Event",
      isVirtual: true,
      maxAttendees: 50,
      price: 500,
      status: "upcoming",
    },
    {
      title: "Blockchain & Smart Contracts in Indian Law",
      description:
        "Explore the legal implications of blockchain technology and smart contracts in the Indian legal system. Understand enforceability, jurisdiction, and regulatory frameworks.",
      date: new Date("2025-02-10T15:00:00"),
      endDate: new Date("2025-02-10T18:00:00"),
      location: "IIT Bombay, Mumbai",
      isVirtual: false,
      maxAttendees: 200,
      price: 0,
      status: "upcoming",
    },
    {
      title: "Legal Tech Innovation Summit 2025",
      description:
        "Annual summit bringing together legal professionals, technologists, and policymakers to discuss the future of legal technology in India.",
      date: new Date("2025-03-15T09:00:00"),
      endDate: new Date("2025-03-16T18:00:00"),
      location: "Taj Palace, New Delhi",
      isVirtual: false,
      maxAttendees: 500,
      price: 2500,
      status: "upcoming",
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }

  console.log(`Created ${events.length} events`);
  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
