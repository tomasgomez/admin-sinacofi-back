/*
  Warnings:

  - You are about to drop the column `area` on the `User` table. All the data in the column will be lost.
  - Added the required column `areaCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "area",
ADD COLUMN     "areaCode" TEXT NOT NULL,
ADD COLUMN     "institutionCode" TEXT NOT NULL;
