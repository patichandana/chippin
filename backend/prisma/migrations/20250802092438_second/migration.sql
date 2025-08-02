/*
  Warnings:

  - You are about to drop the `grouptype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_group_type_fkey";

-- DropTable
DROP TABLE "grouptype";

-- CreateTable
CREATE TABLE "grouptypes" (
    "group_type_id" SERIAL NOT NULL,
    "group_type_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "grouptypes_pkey" PRIMARY KEY ("group_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grouptypes_group_type_name_key" ON "grouptypes"("group_type_name");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_group_type_fkey" FOREIGN KEY ("group_type") REFERENCES "grouptypes"("group_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
