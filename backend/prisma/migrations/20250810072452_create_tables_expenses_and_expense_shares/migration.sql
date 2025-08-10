-- CreateTable
CREATE TABLE "expenses" (
    "expense_id" BIGSERIAL NOT NULL,
    "expense_name" VARCHAR(200) NOT NULL,
    "expense_status" VARCHAR(20) NOT NULL,
    "group_id" BIGINT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expense_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT NOT NULL,
    "is_settled" BOOLEAN NOT NULL,
    "description" VARCHAR(300),

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "expense_shares" (
    "expense_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "expense_shares_pkey" PRIMARY KEY ("expense_id","user_id")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_shares" ADD CONSTRAINT "expense_shares_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "expenses"("expense_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_shares" ADD CONSTRAINT "expense_shares_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
