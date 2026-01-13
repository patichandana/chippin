export type ExpenseShareType = {
  expenseShareId: number;
  userId: number;
  paidAmount: number;
  owedAmount: number;
};

export interface UserType {
    firstname: string,
    profilePic: string
}

export type ExpenseType = {
  expenseId: number;
  expenseName: string;
  expenseStatus: "ACTIVE"|"INACTIVE";
  groupId: number;
  amount: number;
  currencySymbol: string;
  createdAt: string;
  isSettled: boolean;
  description: string;
  expenseShares: ExpenseShareType[];
  paidBy: number[];
  expenseType?: string;
  userSumAmount: number;
};

export type GroupDataType = {
  groupId: number;
  groupType: number;
  groupName: string;
  createdBy: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  expenses: ExpenseType[];
  groupMembers: Record<number, UserType>;
};