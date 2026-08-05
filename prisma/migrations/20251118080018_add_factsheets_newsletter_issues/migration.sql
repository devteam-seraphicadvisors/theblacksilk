-- AlterTable
ALTER TABLE "Newsletter" ADD COLUMN     "eventUpdates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "policyAlerts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "researchUpdates" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "weeklyDigest" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "NewsletterIssue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "image" TEXT,
    "readTime" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactSheet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pdfUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FactSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsletterIssue_publishedAt_idx" ON "NewsletterIssue"("publishedAt");

-- CreateIndex
CREATE INDEX "NewsletterIssue_published_idx" ON "NewsletterIssue"("published");

-- CreateIndex
CREATE INDEX "FactSheet_category_idx" ON "FactSheet"("category");

-- CreateIndex
CREATE INDEX "FactSheet_publishedAt_idx" ON "FactSheet"("publishedAt");

-- CreateIndex
CREATE INDEX "FactSheet_featured_idx" ON "FactSheet"("featured");
