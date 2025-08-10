/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "groups_group_name_key";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username";
