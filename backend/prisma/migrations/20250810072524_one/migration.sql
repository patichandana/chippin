/*
  Warnings:

  - Added the required column `currency_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "currencies" (
    "currency_id" SERIAL NOT NULL,
    "currency_name" VARCHAR(200) NOT NULL,
    "symbol" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("currency_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_currency_name_key" ON "currencies"("currency_name");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("currency_id") ON DELETE RESTRICT ON UPDATE CASCADE;
