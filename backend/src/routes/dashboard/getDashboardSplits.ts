import { Request, Response } from 'express';
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { prisma } from "../../db/connectDB.js";

type DashboardSplitResponse = {
    expenseId: string;
    expenseAmount: number;
    expenseDate: Date;
    expenseName: string;
    currencySymbol: string;
    groupName: string;
    splitType: "You Pay" | "You Get";
    splitAmount: number;
};


export async function getDashboardSplits(req: Request, res: Response) {

    const user = req.user;
    if (!user || typeof user.userId !== "bigint" || user.userId <= 0n) {
        throw ErrorResponse.errorFromCode("INVALID_JWT");
    }
    const userId = user.userId;

    // Fetch total expense splits from the database
    // I'm assuming all the unsettled expenses will have non-zero difference between paidAmount and owedAmount
    const splits = await prisma.expenseShares.findMany({
        where: { userId: userId, fk_expense: {isSettled: false} },
        select: {
            expenseId: true,
            paidAmount: true,
            owedAmount: true,
            fk_expense: {
                select: {
                    amount: true,
                    expenseDate: true,
                    expenseName: true,
                    fk_currency_id: {
                        select: {
                            symbol: true
                        }
                    },
                    fk_group: {
                        select: {
                            groupName: true
                        }
                    }
                }
            }
        },
        orderBy: {
            fk_expense: {
                expenseDate: 'desc'
            }
        },
        take: 5 // most recent 5 splits
    });

    // Process the splits to include:
    // - expenseId
    // - expenseAmount
    // - expenseDate
    // - expenseName
    // - currencySymbol
    // - groupName
    // - splitType (owes or owed)
    // - splitAmount (absolute value of owedAmount - paidAmount)
    
    const response: DashboardSplitResponse[] = splits.map(split => {
        const difference = split.owedAmount - split.paidAmount;

        const splitType: DashboardSplitResponse["splitType"] = difference > 0 ? "You Pay" : "You Get";
        
        const splitAmount = difference > 0 ? difference : -difference;


        return {
            expenseId: split.expenseId.toString(),
            expenseAmount: split.fk_expense.amount,
            expenseDate: split.fk_expense.expenseDate,
            expenseName: split.fk_expense.expenseName,
            currencySymbol: split.fk_expense.fk_currency_id.symbol,
            groupName: split.fk_expense.fk_group?.groupName?? "Personal Expenses",
            splitType: splitType,
            splitAmount: splitAmount
        }
    });

    res.send(response);
}