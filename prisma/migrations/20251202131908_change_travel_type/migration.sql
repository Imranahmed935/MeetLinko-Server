/*
  Warnings:

  - The values [COUPLE] on the enum `TravelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TravelType_new" AS ENUM ('ADVENTURE', 'BUSINESS', 'FAMILY', 'SOLO', 'FRIENDS', 'HONEYMOON');
ALTER TABLE "travelPlans" ALTER COLUMN "travelType" TYPE "TravelType_new" USING ("travelType"::text::"TravelType_new");
ALTER TYPE "TravelType" RENAME TO "TravelType_old";
ALTER TYPE "TravelType_new" RENAME TO "TravelType";
DROP TYPE "public"."TravelType_old";
COMMIT;
