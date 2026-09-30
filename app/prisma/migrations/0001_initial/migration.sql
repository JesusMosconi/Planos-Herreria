CREATE TYPE "StructureType" AS ENUM ('TECHO_UN_AGUA');
CREATE TABLE "Project" ("id" TEXT NOT NULL,"name" TEXT NOT NULL,"client" TEXT NOT NULL DEFAULT '',"notes" TEXT NOT NULL DEFAULT '',"structureType" "StructureType" NOT NULL DEFAULT 'TECHO_UN_AGUA',"approximateMeasurements" BOOLEAN NOT NULL DEFAULT true,"schemaVersion" INTEGER NOT NULL DEFAULT 1,"definition" JSONB NOT NULL,"duplicatedFromId" TEXT,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" TIMESTAMP(3) NOT NULL,CONSTRAINT "Project_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Project_updatedAt_idx" ON "Project"("updatedAt");
CREATE INDEX "Project_schemaVersion_idx" ON "Project"("schemaVersion");
ALTER TABLE "Project" ADD CONSTRAINT "Project_duplicatedFromId_fkey" FOREIGN KEY ("duplicatedFromId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
