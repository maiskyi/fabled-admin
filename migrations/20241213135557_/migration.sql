-- AlterTable
ALTER TABLE "PlaceOfEvent" ADD COLUMN     "prompt" TEXT;

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "PlaceOfEvent_prompt_idx" ON "PlaceOfEvent"("prompt");

-- AddForeignKey
ALTER TABLE "PlaceOfEvent" ADD CONSTRAINT "PlaceOfEvent_prompt_fkey" FOREIGN KEY ("prompt") REFERENCES "Prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
