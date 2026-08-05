/*
  Warnings:

  - You are about to drop the column `resume` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `availability` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whyInterested` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "resume",
ADD COLUMN     "availability" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "portfolioUrl" TEXT,
ADD COLUMN     "resumeUrl" TEXT NOT NULL,
ADD COLUMN     "whyInterested" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
