/*
  Warnings:

  - A unique constraint covering the columns `[Slug]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_Slug_key" ON "Room"("Slug");
