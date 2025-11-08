/*
  Warnings:

  - The primary key for the `expense_shares` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `expense_share_id` to the `expense_shares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expense_shares" DROP CONSTRAINT "expense_shares_pkey",
ADD COLUMN     "expense_share_id" BIGINT NOT NULL,
ADD CONSTRAINT "expense_shares_pkey" PRIMARY KEY ("expense_share_id");
