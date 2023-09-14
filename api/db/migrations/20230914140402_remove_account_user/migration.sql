/*
  Warnings:

  - You are about to drop the `AccountUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_accountUserId_fkey";

-- DropForeignKey
ALTER TABLE "AccountUser" DROP CONSTRAINT "AccountUser_userId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "linkedUserId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "AccountUser";

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_userId_key" ON "Account"("name", "userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_linkedUserId_fkey" FOREIGN KEY ("linkedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
