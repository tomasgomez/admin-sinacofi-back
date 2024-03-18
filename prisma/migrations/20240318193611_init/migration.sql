/*
  Warnings:

  - You are about to drop the column `dni_electronic_signature` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_electronic_signature` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_expiration_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `public_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signature_class` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signature_level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_group` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_message_level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_profile` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordExpirationDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userGroup` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dni_electronic_signature",
DROP COLUMN "password_electronic_signature",
DROP COLUMN "password_expiration_date",
DROP COLUMN "public_name",
DROP COLUMN "signature_class",
DROP COLUMN "signature_level",
DROP COLUMN "user_group",
DROP COLUMN "user_message_level",
DROP COLUMN "user_profile",
ADD COLUMN     "dniElectronicSignature" TEXT,
ADD COLUMN     "passwordElectronicSignature" TEXT,
ADD COLUMN     "passwordExpirationDate" TEXT NOT NULL,
ADD COLUMN     "publicName" TEXT NOT NULL,
ADD COLUMN     "signatureClass" TEXT,
ADD COLUMN     "signatureLevel" TEXT,
ADD COLUMN     "userGroup" TEXT NOT NULL,
ADD COLUMN     "userMessageLevel" TEXT,
ADD COLUMN     "userProfile" TEXT NOT NULL;
