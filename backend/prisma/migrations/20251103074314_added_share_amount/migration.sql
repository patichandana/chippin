/*
  Warnings:

  - Added the required column `amount` to the `expense_shares` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_group_id_fkey";

-- AlterTable
ALTER TABLE "expense_shares" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "expense_status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "group_id" DROP NOT NULL,
ALTER COLUMN "is_settled" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;
