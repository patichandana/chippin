import { ExpenseDetails, ExpenseType } from "./ExpenseDetails";

type GroupProps = {
  groupId: number;
  children?: React.ReactNode;
};

export function GroupLandingPage({ groupId }: GroupProps) {
  //todo: fetch the groups expense details
  console.log(groupId);
  const expense: ExpenseType = {
    expenseId: 1,
    description: "expense",
    expenseDate: "Jan 16,2020",
    name: "expense",
    paidBy: "chandu",
    currency: "$",
    amount: 100,
    expenseType: "summary",
    userSumAmount: 20
  };
  return(<>
    <ExpenseDetails expense={expense}></ExpenseDetails>
  </>);
}
