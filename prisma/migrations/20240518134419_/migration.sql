/*
  Warnings:

  - Made the column `currency` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "currency" SET NOT NULL;
