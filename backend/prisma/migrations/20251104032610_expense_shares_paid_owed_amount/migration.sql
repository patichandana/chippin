/*
  Warnings:

  - You are about to drop the column `amount` on the `expense_shares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expense_shares" DROP COLUMN "amount",
ADD COLUMN     "owed_amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paid_amount" INTEGER NOT NULL DEFAULT 0;
