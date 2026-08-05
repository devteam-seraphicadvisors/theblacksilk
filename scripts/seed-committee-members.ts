import { PrismaClient } from "@prisma/client";
import committeesData from "../data/committees.json";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting committee members seeding...");

  const committees = Object.values(committeesData);

  for (const committee of committees) {
    console.log(`\nProcessing committee: ${committee.name}`);

    // Find the committee in the database by name
    const dbCommittee = await prisma.committee.findFirst({
      where: { name: committee.name },
    });

    if (!dbCommittee) {
      console.log(`⚠️  Committee not found in database: ${committee.name}`);
      continue;
    }

    // Process Chair
    if (committee.chair && committee.chair.name) {
      console.log(`  Adding chair: ${committee.chair.name}`);
      await createOrUpdateMember(
        committee.chair.name,
        committee.chair.email ||
          `${committee.chair.name
            .toLowerCase()
            .replace(/\s+/g, ".")}@theblacksilk.org`,
        dbCommittee.id,
        "chair"
      );
    }

    // Process Co-Chair
    if (committee.coChair && committee.coChair.name) {
      console.log(`  Adding co-chair: ${committee.coChair.name}`);
      await createOrUpdateMember(
        committee.coChair.name,
        committee.coChair.email ||
          `${committee.coChair.name
            .toLowerCase()
            .replace(/\s+/g, ".")}@theblacksilk.org`,
        dbCommittee.id,
        "co-chair"
      );
    }

    // Process Committee Members
    if (committee.committeeMembers && committee.committeeMembers.length > 0) {
      for (const member of committee.committeeMembers) {
        console.log(`  Adding member: ${member.name}`);
        await createOrUpdateMember(
          member.name,
          `${member.name.toLowerCase().replace(/\s+/g, ".")}@theblacksilk.org`,
          dbCommittee.id,
          "member"
        );
      }
    }
  }

  console.log("\n✅ Committee members seeding completed!");
}

async function createOrUpdateMember(
  name: string,
  email: string,
  committeeId: string,
  role: string
) {
  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Create user if doesn't exist
    if (!user) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user",
          emailVerified: new Date(),
        },
      });
      console.log(`    ✓ Created user: ${email}`);
    } else {
      console.log(`    ℹ User already exists: ${email}`);
    }

    // Check if already a committee member
    const existingMember = await prisma.committeeMember.findUnique({
      where: {
        userId_committeeId: {
          userId: user.id,
          committeeId,
        },
      },
    });

    if (!existingMember) {
      await prisma.committeeMember.create({
        data: {
          userId: user.id,
          committeeId,
          role,
        },
      });
      console.log(`    ✓ Added as ${role} to committee`);
    } else {
      // Update role if different
      if (existingMember.role !== role) {
        await prisma.committeeMember.update({
          where: { id: existingMember.id },
          data: { role },
        });
        console.log(
          `    ✓ Updated role from ${existingMember.role} to ${role}`
        );
      } else {
        console.log(`    ℹ Already a ${role} in committee`);
      }
    }
  } catch (error) {
    console.error(`    ❌ Error processing ${name}:`, error);
  }
}

main()
  .catch((e) => {
    console.error("Error seeding committee members:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
