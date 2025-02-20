-- CreateTable
CREATE TABLE "Lullaby" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "tags" TEXT NOT NULL DEFAULT '',
    "mp3_filesize" INTEGER,
    "mp3_filename" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lullaby_pkey" PRIMARY KEY ("id")
);
