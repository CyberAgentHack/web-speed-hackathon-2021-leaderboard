/*
  Warnings:

  - The primary key for the `Measurement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Measurement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Queue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Queue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `teamId` on the `Measurement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `teamId` on the `Queue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Measurement" DROP CONSTRAINT "Measurement_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_teamId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- AlterTable
ALTER TABLE "Measurement" DROP CONSTRAINT "Measurement_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "teamId",
ADD COLUMN     "teamId" UUID NOT NULL,
ADD CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "teamId",
ADD COLUMN     "teamId" UUID NOT NULL,
ADD CONSTRAINT "Queue_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "teamId",
ADD COLUMN     "teamId" UUID,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
