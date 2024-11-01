/*
  Warnings:

  - You are about to drop the column `isReady` on the `Story` table. All the data in the column will be lost.
  - The `status` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StoryStatusType" AS ENUM ('inprogress', 'success', 'failed');

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "isReady",
ADD COLUMN     "statusLog" JSONB NOT NULL DEFAULT '["initialized"]',
DROP COLUMN "status",
ADD COLUMN     "status" "StoryStatusType" DEFAULT 'inprogress';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT true;
