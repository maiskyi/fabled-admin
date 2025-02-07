-- CreateEnum
CREATE TYPE "StoryChildGenderType" AS ENUM ('boy', 'girl');

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "childAge" INTEGER,
ADD COLUMN     "childGender" "StoryChildGenderType",
ADD COLUMN     "childName" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Story_childName_idx" ON "Story"("childName");

-- CreateIndex
CREATE INDEX "Story_childAge_idx" ON "Story"("childAge");

-- CreateIndex
CREATE INDEX "Story_childGender_idx" ON "Story"("childGender");
