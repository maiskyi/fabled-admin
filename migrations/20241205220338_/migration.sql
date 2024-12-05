-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "contentPrompt" SET DEFAULT 'contentPrompt',
ALTER COLUMN "imagePrompt" SET DEFAULT 'imagePrompt',
ALTER COLUMN "message" SET DEFAULT 'message';
