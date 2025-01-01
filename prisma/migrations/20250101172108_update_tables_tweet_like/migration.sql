/*
  Warnings:

  - You are about to drop the column `created_at` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `tweetId` on the `tweets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "tweets" DROP COLUMN "tweetId";
