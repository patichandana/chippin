import Card from "../components/ui/Card";
import { Calendar, User } from "lucide-react";

/* idea
/group/:id GET get all the expenses (expense name, creation date, paid by, amount, other basic details to show up in the expense summary column
/expense/:expenseId getAll the expenseDetails - including the share details
*/
export interface ExpenseType {
  expenseId: number;
  name: string;
  expenseDate: string;
  description: string;
  paidBy: string;
  amount: number;
  expenseType: "summary" | "full";
  currency: string;
  userSumAmount: number;
}

interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  expense: ExpenseType;
}

/*
doubts:
1. paidBy - are we gonna get user id or the user's name directly?
2. currency - are we just gonna send the string
above 2 decisions make more sense > implementing below comp like this
*/
export function ExpenseDetails({ children, ...props }: CardProps) {
  const expense = props.expense;

  /*todo: add avatar beside paid by person name */
  return props.expense.expenseType == "summary" ? (
    // <Card children={children}>
    //fix: padding-2 not taking precedence.
    //todo: card should be clickable.
    <Card className="p-2 m-2">
      <div className="flex flex-row text-center justify-center items-center">
        <div className="hidden grow md:flex flex-row justify-center items-center">
          <Calendar />
          <p className="ml-2">{expense.expenseDate}</p>
        </div>
        <p className="grow">{expense.name}</p>
        <div className="hidden grow md:flex md:flex-row justify-center items-center">
          <User />
          <p className="ml-2">{expense.paidBy}</p>
        </div>
        <div className="flex flex-col grow items-center">
          <p className="grow">
            {expense.currency}
            {expense.amount}
          </p>
          <span
            className={`px-2 py-1 text-xs rounded-full ${expense.userSumAmount > 0 ? "bg-green-200" : expense.userSumAmount == 0 ? "bg-gray-200" : "bg-red-200"} w-fit`}
          >
            {expense.userSumAmount > 0
              ? "You pay " + expense.userSumAmount
              : expense.userSumAmount == 0
                ? "Settled up"
                : "You get " + expense.userSumAmount}
          </span>
        </div>
      </div>
    </Card>
  ) : (
    <Card children={children}></Card>
  );
}
