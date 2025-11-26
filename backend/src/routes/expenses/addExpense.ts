import { prisma } from "../../db/connectDB.js";
import { Prisma } from "@prisma/client";
import { parseObject } from "../../utils/commonUtil.js";
import { isUserInGroup } from "../../services/groupService.js";

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

export async function addExpense(req, res, next) {
    try {
        if (req.body.userId == -1 || req.body.userId == undefined || Number.isNaN(req.body.userId))
            throw new Error("User not authenticated");

        const expenseDetails = req.body;
        let expenseShares: Prisma.ExpenseSharesCreateManyInput[] = [];
        const expenseShareDetails = req.body?.expenseShares;
        let paidBy = [];
        let currentUserShare = 0;

        if (!isUserInGroup(expenseDetails.groupId, req.body.userId)) {
            throw new Error("can't add expense. user not part of this group");
        }
        //first: create the expense - and get the expense id
        const expenseDBRecord = await prisma.$transaction(async () => {
            try {
                const expense = await prisma.expenses.create({
                    data: {
                        expenseName: expenseDetails.expenseName,
                        description: expenseDetails.description,
                        expenseDate: new Date(expenseDetails.expenseDate),
                        amount: expenseDetails.totalAmount,
                        currencyId: expenseDetails.currencyId,
                        createdBy: expenseDetails.userId,
                        groupId: expenseDetails.groupId
                    }
                });

                expenseShareDetails.forEach((share) => {
                    if(share.paidAmount > 0)
                        paidBy.push(share.userId);

                    if(share.userId == expenseDetails.userId)
                        currentUserShare += share.paidAmount - share.owedAmount;

                    expenseShares.push({
                        "expenseId": expense.expenseId,
                        "userId": share.userId,
                        "paidAmount": share.paidAmount,
                        "owedAmount": share.owedAmount
                    })
                })

                await prisma.expenseShares.createMany({
                    data: expenseShares
                })

                res.send(parseObject(expense));
            } catch(err) {
                console.log(err);
                res.send(err);
                throw err;
            }
        });
    } catch (err) {
        console.log(err);
        res.send("error creating group");
    }
}