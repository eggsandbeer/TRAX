/*
  Warnings:

  - You are about to drop the `PlayList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayListToSong` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `duration` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlayList" DROP CONSTRAINT "PlayList_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayListToSong" DROP CONSTRAINT "_PlayListToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayListToSong" DROP CONSTRAINT "_PlayListToSong_B_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "duration" SET NOT NULL;

-- DropTable
DROP TABLE "PlayList";

-- DropTable
DROP TABLE "_PlayListToSong";

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistToSong" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToSong_AB_unique" ON "_PlaylistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToSong_B_index" ON "_PlaylistToSong"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
