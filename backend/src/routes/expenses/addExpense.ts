import { prisma } from "../../db/connectDB.js";
import { Prisma } from "@prisma/client";
import { parseObject } from "../../utils/commonUtil.js";
import { isUserInGroup } from "../../services/groupService.js";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
/*
    issues: 
        1. expense not rolling back, if expense shares failed from getting added
        2. [DONE] in response, send "who paid", if the user lent or borrowed, (share = +ve or -ve)
            {
                "paidBy": [userid],
                "totalAmount": 100$
                "share": -50
            }
            to get paid by >> need to check the +ve amounts in the shares
            to get share amount >> need to calculate all the shares and send the ultimate summary split.
        3. expense image, comments, expense category.
        4. proper error handling, and appropriate error messages.
        5. req doesn't jwt token, req.body.userId = NaN
*/

export async function addExpense(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        if (!user || user.userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }
        const userId = user.userId;
        const expenseDetails = req.body;

        type ExpenseShareInput = {
            userId: bigint;
            paidAmount: number;
            owedAmount: number;
        }
        const expenseShareDetails: ExpenseShareInput[] = expenseDetails.expenseShares;

        let paidBy = [];
        let currentUserShare = 0;

        if (!isUserInGroup(expenseDetails.groupId, userId)) {
            throw new Error("can't add expense. user not part of this group");
        }
        //first: create the expense - and get the expense id
        const expense = await prisma.$transaction(async (tx) => {
            const expense = await tx.expenses.create({
                data: {
                    expenseName: expenseDetails.expenseName,
                    description: expenseDetails.description,
                    expenseDate: new Date(expenseDetails.expenseDate),
                    amount: expenseDetails.totalAmount,
                    currencyId: expenseDetails.currencyId,
                    createdBy: userId,
                    groupId: expenseDetails.groupId
                }
            });
            
            const expenseShares: Prisma.ExpenseSharesCreateManyInput[] = 
            expenseShareDetails.map((share) => ({
                expenseId: expense.expenseId,
                userId: share.userId,
                paidAmount: share.paidAmount,
                owedAmount: share.owedAmount
            }));

            await tx.expenseShares.createMany({ data: expenseShares });

            return expense;
                
        });

        res.send(parseObject(expense));
    } catch (err) {
        console.log(err);
        res.send("error creating group");
    }
}