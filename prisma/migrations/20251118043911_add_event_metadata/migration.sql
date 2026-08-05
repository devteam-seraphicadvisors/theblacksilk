/*
  Warnings:

  - You are about to drop the column `chair` on the `Committee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Committee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Committee" DROP COLUMN "chair",
ADD COLUMN     "activities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "chairBio" TEXT,
ADD COLUMN     "chairDesignation" TEXT,
ADD COLUMN     "chairEmail" TEXT,
ADD COLUMN     "chairImage" TEXT,
ADD COLUMN     "chairLinkedin" TEXT,
ADD COLUMN     "chairName" TEXT,
ADD COLUMN     "coChairBio" TEXT,
ADD COLUMN     "coChairDesignation" TEXT,
ADD COLUMN     "coChairEmail" TEXT,
ADD COLUMN     "coChairImage" TEXT,
ADD COLUMN     "coChairLinkedin" TEXT,
ADD COLUMN     "coChairName" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "fullDescription" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "nextMeeting" TEXT,
ADD COLUMN     "publications" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" TEXT DEFAULT 'roundtable',
ADD COLUMN     "registrationFormUrl" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "speakers" JSONB,
ADD COLUMN     "timeline" JSONB,
ADD COLUMN     "youtubeUrl" TEXT;

-- CreateTable
CREATE TABLE "CommitteePublication" (
    "id" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommitteePublication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeEvent" (
    "id" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommitteeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT,
    "category" TEXT NOT NULL,
    "readTime" TEXT,
    "author" TEXT NOT NULL,
    "authorImage" TEXT,
    "image" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'article',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pdfUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommitteePublication_committeeId_idx" ON "CommitteePublication"("committeeId");

-- CreateIndex
CREATE INDEX "CommitteeEvent_committeeId_idx" ON "CommitteeEvent"("committeeId");

-- CreateIndex
CREATE INDEX "Publication_category_idx" ON "Publication"("category");

-- CreateIndex
CREATE INDEX "Publication_publishedAt_idx" ON "Publication"("publishedAt");

-- CreateIndex
CREATE INDEX "Publication_featured_idx" ON "Publication"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_slug_key" ON "Committee"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_slug_idx" ON "Event"("slug");

-- AddForeignKey
ALTER TABLE "CommitteePublication" ADD CONSTRAINT "CommitteePublication_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeEvent" ADD CONSTRAINT "CommitteeEvent_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
