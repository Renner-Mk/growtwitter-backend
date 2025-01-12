/*
  Warnings:

  - The values [Reply] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('Tweet', 'ReTweet');
ALTER TABLE "tweets" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "tweets" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
ALTER TABLE "tweets" ALTER COLUMN "type" SET DEFAULT 'Tweet';
COMMIT;

-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_tweet_original_id_fkey";

-- AlterTable
ALTER TABLE "tweets" ALTER COLUMN "tweet_original_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_tweet_original_id_fkey" FOREIGN KEY ("tweet_original_id") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
