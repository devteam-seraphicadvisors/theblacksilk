const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting committee data seeding...");

  // Clear existing committees
  console.log("Clearing existing committees...");
  await prisma.committeeEvent.deleteMany({});
  await prisma.committeePublication.deleteMany({});
  await prisma.committee.deleteMany({});
  console.log("✓ Existing committees cleared");

  // Read committees.json
  const filePath = path.join(process.cwd(), "data", "committees.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const committeesData = JSON.parse(fileContent);

  for (const [slug, data] of Object.entries(committeesData)) {
    const committeeData = data;

    console.log(`Processing committee: ${committeeData.name}`);

    // Create committee
    const committee = await prisma.committee.create({
      data: {
        slug,
        name: committeeData.name,
        description: committeeData.description,
        fullDescription: committeeData.fullDescription,
        chairName: committeeData.chair?.name,
        chairEmail: committeeData.chair?.email,
        chairLinkedin: committeeData.chair?.linkedin,
        chairImage: committeeData.chair?.image,
        chairBio: committeeData.chair?.bio,
        chairDesignation: committeeData.chair?.designation,
        coChairName: committeeData.coChair?.name,
        coChairEmail: committeeData.coChair?.email,
        coChairLinkedin: committeeData.coChair?.linkedin,
        coChairImage: committeeData.coChair?.image,
        coChairBio: committeeData.coChair?.bio,
        coChairDesignation: committeeData.coChair?.designation,
        established: committeeData.established,
        status: committeeData.status || "active",
        focusAreas: committeeData.focus || [],
        nextMeeting: committeeData.nextMeeting || null,
        publications: committeeData.publications || 0,
        image: committeeData.image,
        color: committeeData.color,
        icon: committeeData.icon,
        activities: committeeData.activities || [],
      },
    });

    console.log(`✓ Committee ${committeeData.name} saved`);

    // Handle publications if they exist
    if (
      committeeData.recentPublications &&
      committeeData.recentPublications.length > 0
    ) {
      for (const pub of committeeData.recentPublications) {
        await prisma.committeePublication.create({
          data: {
            committeeId: committee.id,
            title: pub.title,
            description: pub.description,
            date: pub.date,
            type: pub.type,
            url: pub.url,
          },
        });
      }
      console.log(
        `  ✓ Added ${committeeData.recentPublications.length} publications`
      );
    }

    // Handle events if they exist
    if (
      committeeData.upcomingEvents &&
      committeeData.upcomingEvents.length > 0
    ) {
      for (const event of committeeData.upcomingEvents) {
        await prisma.committeeEvent.create({
          data: {
            committeeId: committee.id,
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            type: event.type,
          },
        });
      }
      console.log(`  ✓ Added ${committeeData.upcomingEvents.length} events`);
    }
  }

  console.log("\n✅ Committee data seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding committees:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
