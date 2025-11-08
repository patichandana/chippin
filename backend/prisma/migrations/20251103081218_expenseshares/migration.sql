-- AlterTable
CREATE SEQUENCE expense_shares_expense_share_id_seq;
ALTER TABLE "expense_shares" ALTER COLUMN "expense_share_id" SET DEFAULT nextval('expense_shares_expense_share_id_seq');
ALTER SEQUENCE expense_shares_expense_share_id_seq OWNED BY "expense_shares"."expense_share_id";
