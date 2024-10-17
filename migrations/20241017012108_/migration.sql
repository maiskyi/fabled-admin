-- CreateEnum
CREATE TYPE "CharacterLanguageType" AS ENUM ('en');

-- CreateEnum
CREATE TYPE "MoralLessonLanguageType" AS ENUM ('en');

-- CreateEnum
CREATE TYPE "PlaceOfEventLanguageType" AS ENUM ('en');

-- CreateEnum
CREATE TYPE "PromptLanguageType" AS ENUM ('en');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "firebaseUserId" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "firebaseUserId" TEXT NOT NULL DEFAULT '',
    "prompt" TEXT,
    "character" TEXT,
    "placeOfEvent" TEXT,
    "moralLesson" TEXT,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "image" JSONB,
    "readTime" INTEGER NOT NULL,
    "status" JSONB NOT NULL DEFAULT '["initialized"]',
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "contentPrompt" TEXT NOT NULL DEFAULT '',
    "imagePrompt" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "subject" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image" JSONB,
    "language" "CharacterLanguageType" NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoralLesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "language" "MoralLessonLanguageType" NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoralLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceOfEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "image" JSONB,
    "language" "PlaceOfEventLanguageType" NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaceOfEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "textPrompt" TEXT NOT NULL DEFAULT '',
    "imagePrompt" TEXT NOT NULL DEFAULT '',
    "language" "PromptLanguageType" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL,
    "privacyPolicyUrl" TEXT NOT NULL DEFAULT '',
    "termsAndConditionsUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Story_prompt_idx" ON "Story"("prompt");

-- CreateIndex
CREATE INDEX "Story_character_idx" ON "Story"("character");

-- CreateIndex
CREATE INDEX "Story_placeOfEvent_idx" ON "Story"("placeOfEvent");

-- CreateIndex
CREATE INDEX "Story_moralLesson_idx" ON "Story"("moralLesson");

-- CreateIndex
CREATE INDEX "Story_title_idx" ON "Story"("title");

-- CreateIndex
CREATE INDEX "Story_content_idx" ON "Story"("content");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_prompt_fkey" FOREIGN KEY ("prompt") REFERENCES "Prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_character_fkey" FOREIGN KEY ("character") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_placeOfEvent_fkey" FOREIGN KEY ("placeOfEvent") REFERENCES "PlaceOfEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_moralLesson_fkey" FOREIGN KEY ("moralLesson") REFERENCES "MoralLesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
