/*
  Warnings:

  - Made the column `vrtUrl` on table `Measurement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Measurement" ALTER COLUMN "vrtUrl" SET NOT NULL;
