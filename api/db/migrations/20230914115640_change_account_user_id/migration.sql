/*
  Warnings:

  - The primary key for the `AccountUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AccountUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `accountUserId` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_accountUserId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accountUserId",
ADD COLUMN     "accountUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AccountUser" DROP CONSTRAINT "AccountUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AccountUser_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountUserId_fkey" FOREIGN KEY ("accountUserId") REFERENCES "AccountUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
