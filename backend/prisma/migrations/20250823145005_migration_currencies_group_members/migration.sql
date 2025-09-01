-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("currency_id") ON DELETE RESTRICT ON UPDATE CASCADE;
