-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "parent" TEXT;

-- CreateIndex
CREATE INDEX "Story_parent_idx" ON "Story"("parent");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Story"("id") ON DELETE SET NULL ON UPDATE CASCADE;
