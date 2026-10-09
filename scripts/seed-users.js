const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to database...");

  const usersToSeed = [
    {
      email: "nitin@seraphicadvisors.com",
      rawPassword: "Nitin@2026",
      name: "Nitin",
      role: "user",
      organization: "Seraphic Advisors",
      position: "Legal Consultant",
      bio: "Legal consultant at Seraphic Advisors specializing in digital law and regulatory compliance.",
      location: "New Delhi, India",
      membershipType: "Professional",
    },
    {
      email: "dev@seraphicadvisors.com",
      rawPassword: "Dev@2026",
      name: "Super Admin",
      role: "admin",
      organization: "Seraphic Advisors",
      position: "Super Administrator",
      bio: "Platform Super Administrator at Seraphic Advisors.",
      location: "New Delhi, India",
      membershipType: "Fellow",
    },
  ];

  for (const u of usersToSeed) {
    const hashedPassword = await bcrypt.hash(u.rawPassword, 12);
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    const existingUser = await prisma.user.findUnique({
      where: { email: u.email },
      include: { membership: true },
    });

    if (existingUser) {
      console.log(`Updating existing user ${u.email}...`);
      const updatedUser = await prisma.user.update({
        where: { email: u.email },
        data: {
          name: u.name,
          password: hashedPassword,
          role: u.role,
          emailVerified: new Date(),
          organization: u.organization,
          position: u.position,
          bio: u.bio,
          location: u.location,
        },
      });

      if (existingUser.membership) {
        await prisma.membership.update({
          where: { userId: existingUser.id },
          data: {
            status: "active",
            endDate: oneYearLater,
            type: u.membershipType,
          },
        });
      } else {
        await prisma.membership.create({
          data: {
            userId: existingUser.id,
            status: "active",
            type: u.membershipType,
            endDate: oneYearLater,
          },
        });
      }

      console.log(`✓ User ${u.email} successfully updated.`);
    } else {
      console.log(`Creating new user ${u.email}...`);
      const newUser = await prisma.user.create({
        data: {
          email: u.email,
          name: u.name,
          password: hashedPassword,
          role: u.role,
          emailVerified: new Date(),
          organization: u.organization,
          position: u.position,
          bio: u.bio,
          location: u.location,
          membership: {
            create: {
              status: "active",
              type: u.membershipType,
              endDate: oneYearLater,
            },
          },
        },
      });

      console.log(`✓ User ${u.email} (ID: ${newUser.id}) successfully created.`);
    }
  }

  console.log("\n==============================================");
  console.log("Credentials fed to database successfully:");
  console.log("1. nitin@seraphicadvisors.com / Nitin@2026 (Role: user)");
  console.log("2. dev@seraphicadvisors.com / Dev@2026 (Role: admin)");
  console.log("==============================================");
}

main()
  .catch((e) => {
    console.error("Error seeding users:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
