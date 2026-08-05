import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleJobs = [
  {
    title: "Senior Legal Technology Consultant",
    description:
      "Lead innovative legal technology projects and advise clients on digital transformation strategies.",
    department: "Consulting",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "5-8 years",
    salary: "₹15-25 LPA",
    requirements: [
      "Law degree with technology background",
      "5+ years in legal tech consulting",
      "Strong project management skills",
      "Experience with legal software implementation",
      "Excellent client relationship management",
    ],
    skills: [
      "Legal Tech",
      "Project Management",
      "Client Advisory",
      "Digital Transformation",
    ],
    featured: true,
    urgency: "high",
    status: "open",
    applicants: 12,
  },
  {
    title: "AI Policy Researcher",
    description:
      "Research and analyze AI policy developments and contribute to policy recommendations.",
    department: "Research",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹12-18 LPA",
    requirements: [
      "Master's degree in Law, Policy, or related field",
      "Experience in AI/tech policy research",
      "Strong analytical and writing skills",
      "Knowledge of Indian and international AI regulations",
    ],
    skills: [
      "AI Policy",
      "Legal Research",
      "Policy Analysis",
      "Technical Writing",
    ],
    featured: true,
    urgency: "high",
    status: "open",
    applicants: 8,
  },
  {
    title: "Litigation Support Specialist",
    description:
      "Provide technical support for litigation teams including e-discovery and document management.",
    department: "Legal",
    location: "Delhi, India",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹8-12 LPA",
    requirements: [
      "Law degree or paralegal certification",
      "Experience with e-discovery tools",
      "Knowledge of litigation procedures",
      "Strong organizational skills",
    ],
    skills: [
      "E-Discovery",
      "Document Management",
      "Litigation Support",
      "Legal Research",
    ],
    featured: false,
    urgency: "medium",
    status: "open",
    applicants: 5,
  },
  {
    title: "Privacy and Data Protection Officer",
    description:
      "Ensure compliance with data protection regulations and develop privacy frameworks.",
    department: "Legal",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "4-6 years",
    salary: "₹14-20 LPA",
    requirements: [
      "Law degree with specialization in data privacy",
      "CIPP certification preferred",
      "Experience with GDPR, DPDPA, and other privacy laws",
      "Strong compliance background",
    ],
    skills: ["Data Privacy", "GDPR", "DPDPA", "Compliance", "Risk Management"],
    featured: true,
    urgency: "high",
    status: "open",
    applicants: 15,
  },
  {
    title: "Legal Product Manager",
    description:
      "Drive product development for legal technology solutions and manage product roadmap.",
    department: "Product",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "4-7 years",
    salary: "₹16-24 LPA",
    requirements: [
      "Law degree with product management experience",
      "3+ years in legal tech product management",
      "Strong understanding of legal workflows",
      "Experience with agile methodologies",
    ],
    skills: [
      "Product Management",
      "Legal Tech",
      "Agile",
      "User Research",
      "Roadmap Planning",
    ],
    featured: false,
    urgency: "medium",
    status: "open",
    applicants: 7,
  },
  {
    title: "Contract Management Analyst",
    description:
      "Analyze and optimize contract management processes using technology solutions.",
    department: "Consulting",
    location: "Pune, India",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹9-14 LPA",
    requirements: [
      "Law degree or business background",
      "Experience with contract lifecycle management",
      "Knowledge of CLM software",
      "Strong analytical skills",
    ],
    skills: [
      "Contract Management",
      "CLM Software",
      "Process Optimization",
      "Legal Analysis",
    ],
    featured: false,
    urgency: "medium",
    status: "open",
    applicants: 6,
  },
  {
    title: "Cybersecurity Legal Counsel",
    description:
      "Provide legal guidance on cybersecurity matters and data breach incidents.",
    department: "Legal",
    location: "Remote",
    type: "Full-time",
    experience: "5-8 years",
    salary: "₹18-28 LPA",
    requirements: [
      "Law degree with cybersecurity specialization",
      "5+ years in cybersecurity law",
      "Experience handling data breaches",
      "Knowledge of IT Act and cyber regulations",
    ],
    skills: [
      "Cybersecurity Law",
      "Incident Response",
      "Risk Assessment",
      "IT Act",
    ],
    featured: true,
    urgency: "high",
    status: "open",
    applicants: 10,
  },
  {
    title: "IP and Technology Associate",
    description:
      "Handle intellectual property matters related to technology and digital innovation.",
    department: "Legal",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "2-5 years",
    salary: "₹10-16 LPA",
    requirements: [
      "Law degree with IP specialization",
      "Experience in tech IP matters",
      "Knowledge of patent and trademark law",
      "Strong research and drafting skills",
    ],
    skills: ["IP Law", "Patent Law", "Technology Law", "Legal Drafting"],
    featured: false,
    urgency: "low",
    status: "open",
    applicants: 4,
  },
];

async function main() {
  console.log("Starting job seeding...");

  // Clear existing jobs
  await prisma.job.deleteMany({});
  console.log("Cleared existing jobs");

  // Create new jobs
  for (const job of sampleJobs) {
    await prisma.job.create({
      data: job,
    });
  }

  console.log(`✅ Successfully seeded ${sampleJobs.length} jobs`);
}

main()
  .catch((e) => {
    console.error("Error seeding jobs:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
