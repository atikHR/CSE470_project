/*
  Warnings:

  - You are about to drop the column `clientinfoid` on the `additional_phone_nums` table. All the data in the column will be lost.
  - You are about to drop the column `userinfoid` on the `additional_phone_nums` table. All the data in the column will be lost.
  - You are about to drop the column `clientinfoid` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `userinfoid` on the `file` table. All the data in the column will be lost.
  - You are about to drop the `admin_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `backup_file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `backup_method` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `new_invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `supplierinfoid` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "additional_phone_nums" DROP CONSTRAINT "additional_phone_nums_clientinfoid_fkey";

-- DropForeignKey
ALTER TABLE "additional_phone_nums" DROP CONSTRAINT "additional_phone_nums_userinfoid_fkey";

-- DropForeignKey
ALTER TABLE "admin_info" DROP CONSTRAINT "admin_info_userinfoid_fkey";

-- DropForeignKey
ALTER TABLE "backup_file" DROP CONSTRAINT "backup_file_admininfoid_fkey";

-- DropForeignKey
ALTER TABLE "client_info" DROP CONSTRAINT "client_info_admininfoid_fkey";

-- DropForeignKey
ALTER TABLE "client_info" DROP CONSTRAINT "client_info_employeeinfoid_fkey";

-- DropForeignKey
ALTER TABLE "employee_info" DROP CONSTRAINT "employee_info_userinfoid_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_clientinfoid_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_userinfoid_fkey";

-- DropForeignKey
ALTER TABLE "new_invoice" DROP CONSTRAINT "new_invoice_clientinfoid_fkey";

-- DropForeignKey
ALTER TABLE "product_info" DROP CONSTRAINT "product_info_productcategoryid_fkey";

-- AlterTable
ALTER TABLE "additional_phone_nums" DROP COLUMN "clientinfoid",
DROP COLUMN "userinfoid",
ADD COLUMN     "bankclientid" INTEGER,
ADD COLUMN     "supplierinfoId" INTEGER;

-- AlterTable
ALTER TABLE "file" DROP COLUMN "clientinfoid",
DROP COLUMN "userinfoid",
ADD COLUMN     "supplierinfoid" INTEGER NOT NULL;

-- DropTable
DROP TABLE "admin_info";

-- DropTable
DROP TABLE "backup_file";

-- DropTable
DROP TABLE "backup_method";

-- DropTable
DROP TABLE "client_info";

-- DropTable
DROP TABLE "employee_info";

-- DropTable
DROP TABLE "new_invoice";

-- DropTable
DROP TABLE "product_info";

-- DropTable
DROP TABLE "user_info";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "backupCategory";

-- CreateTable
CREATE TABLE "owner" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "phone_num" VARCHAR(15) NOT NULL,
    "photo_url" VARCHAR(300) NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supply_info" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone_num" VARCHAR(15) NOT NULL,
    "district" VARCHAR(30) NOT NULL,
    "subdistrict" VARCHAR(30) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedby" INTEGER NOT NULL,

    CONSTRAINT "supply_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_comp_info" (
    "id" SERIAL NOT NULL,
    "company" VARCHAR(50) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "model_no" VARCHAR(40) NOT NULL,
    "category" VARCHAR(10) NOT NULL,
    "stock_available" INTEGER NOT NULL,
    "photo_url" VARCHAR(300) NOT NULL,
    "productcategoryid" INTEGER NOT NULL,

    CONSTRAINT "supplier_comp_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank" (
    "id" SERIAL NOT NULL,
    "bank_name" VARCHAR(50) NOT NULL,
    "hotline" VARCHAR(15) NOT NULL,
    "website" VARCHAR(100) NOT NULL,
    "branch_name" VARCHAR(50) NOT NULL,
    "photo_url" VARCHAR(300) NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "account_no" VARCHAR(20) NOT NULL,
    "account_type" VARCHAR(20) NOT NULL DEFAULT 'Savings',
    "district" VARCHAR(30) NOT NULL,
    "subdistrict" VARCHAR(30) NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedby" INTEGER NOT NULL,
    "bankid" INTEGER NOT NULL,

    CONSTRAINT "bank_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_no" VARCHAR(20) NOT NULL,
    "transaction_type" VARCHAR(100) NOT NULL,
    "reference" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "debit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bankclientid" INTEGER NOT NULL,
    "addedby" INTEGER NOT NULL,

    CONSTRAINT "statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_type" VARCHAR(100) NOT NULL,
    "reference" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "quantity" INTEGER,
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "debit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "addedby" INTEGER NOT NULL,
    "bankclientid" INTEGER,
    "supplierinfoid" INTEGER,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "owner_email_key" ON "owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owner_phone_num_key" ON "owner"("phone_num");

-- CreateIndex
CREATE UNIQUE INDEX "supply_info_phone_num_key" ON "supply_info"("phone_num");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_comp_info_product_id_key" ON "supplier_comp_info"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_client_account_no_key" ON "bank_client"("account_no");

-- AddForeignKey
ALTER TABLE "supply_info" ADD CONSTRAINT "supply_info_addedby_fkey" FOREIGN KEY ("addedby") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additional_phone_nums" ADD CONSTRAINT "additional_phone_nums_supplierinfoId_fkey" FOREIGN KEY ("supplierinfoId") REFERENCES "supply_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additional_phone_nums" ADD CONSTRAINT "additional_phone_nums_bankclientid_fkey" FOREIGN KEY ("bankclientid") REFERENCES "bank_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_supplierinfoid_fkey" FOREIGN KEY ("supplierinfoid") REFERENCES "supply_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_comp_info" ADD CONSTRAINT "supplier_comp_info_productcategoryid_fkey" FOREIGN KEY ("productcategoryid") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_client" ADD CONSTRAINT "bank_client_addedby_fkey" FOREIGN KEY ("addedby") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_client" ADD CONSTRAINT "bank_client_bankid_fkey" FOREIGN KEY ("bankid") REFERENCES "bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statement" ADD CONSTRAINT "statement_bankclientid_fkey" FOREIGN KEY ("bankclientid") REFERENCES "bank_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statement" ADD CONSTRAINT "statement_addedby_fkey" FOREIGN KEY ("addedby") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_addedby_fkey" FOREIGN KEY ("addedby") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_bankclientid_fkey" FOREIGN KEY ("bankclientid") REFERENCES "bank_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_supplierinfoid_fkey" FOREIGN KEY ("supplierinfoid") REFERENCES "supply_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
