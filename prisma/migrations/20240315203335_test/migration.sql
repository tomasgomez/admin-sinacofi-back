-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_expiration_date" TEXT NOT NULL,
    "public_name" TEXT NOT NULL,
    "user_group" TEXT NOT NULL,
    "user_profile" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "comunne" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user_message_level" TEXT,
    "signature_class" TEXT,
    "signature_level" TEXT,
    "password_electronic_signature" TEXT,
    "dni_electronic_signature" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
