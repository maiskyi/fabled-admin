/*
  Warnings:

  - You are about to drop the column `migration1` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Prompt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "migration1";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "isPublished";
