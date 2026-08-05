import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleMentors = [
  {
    name: "Dr. Anjali Sharma",
    role: "Senior Legal Tech Consultant",
    company: "The Black Silk",
    expertise: ["AI Law", "Data Privacy", "Legal Tech Implementation"],
    experience: "15+ years",
    bio: "15+ years experience in legal technology and AI policy. Former legal advisor to tech startups and government bodies.",
    specialization: "AI & Data Privacy Law",
    rating: 4.9,
    sessions: 127,
    mentees: 45,
    active: true,
  },
  {
    name: "Rajesh Kumar",
    role: "Corporate Counsel & IP Specialist",
    company: "TechLaw Associates",
    expertise: ["Intellectual Property", "Technology Law", "Litigation"],
    experience: "12+ years",
    bio: "Patent attorney with expertise in software patents and technology transfer. Mentored 50+ lawyers in IP law.",
    specialization: "Intellectual Property",
    rating: 4.8,
    sessions: 89,
    mentees: 38,
    active: true,
  },
  {
    name: "Priya Menon",
    role: "Cybersecurity Legal Expert",
    company: "CyberLaw India",
    expertise: ["Cybersecurity Law", "Data Protection", "Incident Response"],
    experience: "10+ years",
    bio: "Specializes in cybersecurity compliance and data breach management. CIPP certified with 10 years experience.",
    specialization: "Cybersecurity & Privacy",
    rating: 4.9,
    sessions: 105,
    mentees: 52,
    active: true,
  },
  {
    name: "Vikram Desai",
    role: "Contract & Procurement Lawyer",
    company: "Legal Solutions Inc",
    expertise: ["Contract Law", "SaaS Agreements", "Tech Procurement"],
    experience: "8+ years",
    bio: "Expert in technology contracts and SaaS agreements. Helped 100+ startups with legal frameworks.",
    specialization: "Technology Contracts",
    rating: 4.7,
    sessions: 76,
    mentees: 32,
    active: true,
  },
  {
    name: "Kavita Iyer",
    role: "Privacy & Compliance Officer",
    company: "DataGuard Legal",
    expertise: ["GDPR", "DPDPA", "Privacy Frameworks", "Compliance"],
    experience: "11+ years",
    bio: "Privacy expert specializing in Indian and international data protection laws. Former DPO at Fortune 500 company.",
    specialization: "Data Privacy & Compliance",
    rating: 4.8,
    sessions: 92,
    mentees: 41,
    active: true,
  },
  {
    name: "Arjun Nair",
    role: "Legal Product Manager",
    company: "LegalTech Innovations",
    expertise: ["Legal Tech Products", "LegalOps", "Process Automation"],
    experience: "7+ years",
    bio: "Built legal tech products for global law firms. Combines legal expertise with product management skills.",
    specialization: "Legal Technology & Product",
    rating: 4.6,
    sessions: 54,
    mentees: 25,
    active: true,
  },
];

async function main() {
  console.log("Starting mentor seeding...");

  // Clear existing mentors
  await prisma.mentor.deleteMany({});
  console.log("Cleared existing mentors");

  // Create new mentors
  for (const mentor of sampleMentors) {
    await prisma.mentor.create({
      data: mentor,
    });
  }

  console.log(`✅ Successfully seeded ${sampleMentors.length} mentors`);
}

main()
  .catch((e) => {
    console.error("Error seeding mentors:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
