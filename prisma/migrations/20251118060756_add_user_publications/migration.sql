-- CreateTable
CREATE TABLE "UserPublication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPublication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserPublication_userId_idx" ON "UserPublication"("userId");

-- CreateIndex
CREATE INDEX "UserPublication_publicationId_idx" ON "UserPublication"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPublication_userId_publicationId_key" ON "UserPublication"("userId", "publicationId");

-- AddForeignKey
ALTER TABLE "UserPublication" ADD CONSTRAINT "UserPublication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPublication" ADD CONSTRAINT "UserPublication_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
