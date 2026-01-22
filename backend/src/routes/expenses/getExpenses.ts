import { Request, Response } from 'express';
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { isUserInGroup } from "../../services/groupService.js"
import { ExpenseError, ExpenseErrorObject } from '../../interfaces/ErrorHandlers/ExpenseErrorHandler.js';
import { prisma } from "../../db/connectDB.js";
import { parseObject } from '../../utils/commonUtil.js';
import { z } from "zod";

//zod schema for expense query parameters
export const ExpenseQuerySchema = z.object({
    //filters
    groupId: z.preprocess((val) => {
        if (val === "null") return null;
        if (val === '' || val === undefined) return undefined;
        return val;
    }, z.coerce.bigint().nullish()),
    expenseStatus: z.string().optional().default("ACTIVE"),
    createdBy: z.coerce.bigint().optional(),

    //search
    searchExpenseName: z.string().optional(),
    searchExpenseDescription: z.string().optional(),

    //date range
    expenseCreatedStartDate: z.coerce.date().optional(),
    expenseCreatedEndDate: z.coerce.date().optional(),

    //pagination
    lastExpenseId: z.coerce.bigint().optional(),
    limit: z.coerce.number().optional().default(30)
})

export async function getExpenses(req: Request, res: Response) {
    try {
        const user = req.user;

        //invalid user
        if (!user || typeof user.userId !== "bigint" || user.userId <= 0n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }

        //checking if the query is as expected, if not throw an error
        const result = ExpenseQuerySchema.safeParse(req.query);
        if (!result.success) {
            throw new ExpenseError("ERROR_EVAULATING_QUERY_PARAMS", result.error.issues[0].message)
            return;
        }

        const userId = user.userId;
        const { groupId, expenseStatus, lastExpenseId, searchExpenseName, searchExpenseDescription, createdBy, expenseCreatedStartDate, expenseCreatedEndDate, limit } = result.data;

        // check if user part of the group.
        if (groupId && !isUserInGroup(groupId, userId)) {
            throw new ExpenseError("USER_NOT_IN_GROUP", null);
        }

        let where: any = {
            groupId: groupId,
            expenseName: searchExpenseName ? { contains: searchExpenseName, mode: 'insensitive' } : undefined,
            description: searchExpenseDescription ? { contains: searchExpenseDescription, mode: 'insensitive' } : undefined,
            createdBy: createdBy,
            expenseDate: {
                gte: expenseCreatedStartDate ? new Date(expenseCreatedStartDate) : undefined,
                lte: expenseCreatedEndDate ? new Date(expenseCreatedEndDate) : undefined
            },
            expenseStatus: expenseStatus == "ACTIVE" || "INACTIVE" ? expenseStatus : undefined,
        };

        if (groupId === null || groupId === undefined) {
            where.OR = [
                { createdBy: userId },
                { expenseShares: { some: { userId: userId } } }
            ]
        }
        //the ones the current user is part of.
        const expenses = await prisma.expenses.findMany({
            where: where,
            include: {
                expenseShares: true
            },
            take: limit + 1,
            cursor: lastExpenseId ? { expenseId: lastExpenseId } : undefined,
            skip: lastExpenseId ? 1 : 0,
            orderBy: {
                updatedAt: "desc"
            }
        })
        res.send(parseObject({
            data: expenses.slice(0, limit),
            meta: {
                "hasMore": expenses.length > limit,
                "nextExpenseId": expenses.length > limit ? expenses[limit].expenseId : null,
                "count": expenses.length > 0 ? expenses.length : 0,
            }
        }));
    } catch (err) {
        //TODO: check if there's better way to handle these errors.
        // throw new ExpenseError("ERROR_FETCHING_EXPENSES", null);
        res.send(err);
    }
}