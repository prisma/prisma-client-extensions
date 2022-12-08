-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "audit";

-- CreateEnum
CREATE TYPE "audit"."AuditOperation" AS ENUM ('INSERT', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit"."ProductVersion" (
    "versionId" SERIAL NOT NULL,
    "versionOperation" "audit"."AuditOperation" NOT NULL,
    "versionProductId" INTEGER,
    "versionUserId" INTEGER,
    "versionTimestamp" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductVersion_pkey" PRIMARY KEY ("versionId")
);

-- CreateTable
CREATE TABLE "audit"."OrderVersion" (
    "versionId" SERIAL NOT NULL,
    "versionOperation" "audit"."AuditOperation" NOT NULL,
    "versionOrderId" INTEGER,
    "versionUserId" INTEGER,
    "versionTimestamp" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderVersion_pkey" PRIMARY KEY ("versionId")
);

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."ProductVersion" ADD CONSTRAINT "ProductVersion_versionProductId_fkey" FOREIGN KEY ("versionProductId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."ProductVersion" ADD CONSTRAINT "ProductVersion_versionUserId_fkey" FOREIGN KEY ("versionUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."OrderVersion" ADD CONSTRAINT "OrderVersion_versionOrderId_fkey" FOREIGN KEY ("versionOrderId") REFERENCES "public"."Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."OrderVersion" ADD CONSTRAINT "OrderVersion_versionUserId_fkey" FOREIGN KEY ("versionUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
