import Card from "../components/ui/Card";
import { Calendar, ReceiptText } from "lucide-react";
import { ExpenseType, UserType } from "../types/group";

/* idea
/group/:id GET get all the expenses (expense name, creation date, paid by, amount, other basic details to show up in the expense summary column
/expense/:expenseId getAll the expenseDetails - including the share details
*/

interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  expense: ExpenseType;
  groupMembers: Record<number, UserType>;
  layoutClass: string;
}

/*
doubts:
1. paidBy - are we gonna get user id or the user's name directly?
2. currency - are we just gonna send the string
above 2 decisions make more sense > implementing below comp like this
*/
export function ExpenseDetails({ children, ...props }: CardProps) {
  const expense = props.expense;
  const groupMembers = props.groupMembers;
  expense.createdAt = new Date(expense.createdAt).toLocaleDateString("en-GB",
    {
      day: "numeric",
      month: "short",
    }
  );

  /*todo: add avatar beside paid by person name */
  return props.expense.expenseType == "summary" ? (
    // <Card children={children}>
    //fix: padding-2 not taking precedence.
    //todo: card should be clickable.
    <Card className= {`${props.layoutClass} !p-3 !m-2`}>
      <div className="flex flex-row text-center justify-center items-center">
        <div className="hidden grow md:flex flex-row justify-center items-center">
          <Calendar />
          <p className="ml-2 text-slate-600 text-sm text-center">
            {expense.createdAt}
          </p>
        </div>
        <div className="grow flex flex-col">
          <div className="flex flex-row items-center justify-center">
            <ReceiptText className="mr-2" />
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{expense.expenseName}</p>
              <p className="md:hidden sm:flex text-slate-600 text-sm">
                {expense.createdAt}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden grow md:flex md:flex-row justify-center items-center">
          <img
            src={groupMembers[expense.paidBy[0]].profilePic}
            alt="img"
            className="h-10 w-10 rounded-full"
          />
          <p className="ml-2">{groupMembers[expense.paidBy[0]].firstname}</p>
        </div>
        <div className="flex flex-col grow items-center">
          <p className="grow">
            {expense.currencySymbol}
            {expense.amount}
          </p>
          <span
            className={`px-2 py-1 text-xs rounded-full ${expense.userSumAmount > 0 ? "bg-green-200" : expense.userSumAmount == 0 ? "bg-gray-200" : "bg-red-200"} w-fit`}
          >
            {expense.userSumAmount < 0
              ? "You owe " + -expense.userSumAmount
              : expense.userSumAmount == 0
                ? "Settled up"
                : "You get" + expense.userSumAmount}
          </span>
        </div>
      </div>
    </Card>
  ) : (
    <Card children={children}></Card>
  );
}
