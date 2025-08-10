-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DELETED');

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
