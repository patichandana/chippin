import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { prisma } from "../../db/connectDB.js";
import { Request, Response, NextFunction } from "express";

export async function getDashboardBalance(req: Request, res: Response, next: NextFunction) {

    const user = req.user;
    if (!user || user.userId === -1n) {
        throw ErrorResponse.errorFromCode("INVALID_JWT");
    }
    const userId = user.userId;
    if (typeof userId !== "bigint" || userId <= 0n) {
                throw ErrorResponse.errorFromCode("INVALID_JWT");
    }
    // Fetch total balance from the database
    const expenses = await prisma.expenseShares.findMany({
        where: {userId},
        select: {paidAmount: true, owedAmount: true}
    });
    let totalGetsBack = 0;
    let totalHasToPay = 0;

    for(const expense of expenses) {
        const summary = expense.paidAmount - expense.owedAmount;
        if(summary > 0) {
            totalGetsBack += summary;
        } else if(summary < 0) {
            totalHasToPay += Math.abs(summary);
        }
    }
    res.send({
        totalGetsBack,
        totalHasToPay
    });

}