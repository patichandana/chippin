type ExpenseShare = {
    userId : number,
    paidAmount : number,
    owedAmount : number
}

type Expense = {
    expenseName : string,
    description : string,
    expenseDate : string,
    totalAmount: number,
    currencyId : number,
    groupId ?: number,
    expenseShares ?: Array<ExpenseShare>
}

export async function createExpense(expense: Expense) {
   const response = await fetch(import.meta.env.VITE_BACKEND_PATH + "expense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense)
    });

    return response;
}