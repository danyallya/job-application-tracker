ALTER TABLE "Application" ADD COLUMN "archivedAt" TIMESTAMP(3);

CREATE INDEX "Application_userId_archivedAt_updatedAt_idx"
    ON "Application"("userId", "archivedAt", "updatedAt");
