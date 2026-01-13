import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { prisma } from "../../db/connectDB.js";
import { Request, Response, NextFunction } from "express";

export async function getDashboardBalance(req: Request, res: Response) {

    const user = req.user;
    if (!user || typeof user.userId !== "bigint" || user.userId <= 0n) {
        throw ErrorResponse.errorFromCode("INVALID_JWT");
    }
    const userId = user.userId;

    // Fetch total balance from the database
    const expenseShares = await prisma.expenseShares.findMany({
        where: {userId: userId, fk_expense: {isSettled: false}},
        select: {paidAmount: true,
                 owedAmount: true,
                // fk_expense:{ 
                //     select: { currencyId: true} 
                //     }
                },
    });
    // type BalanceByCurrency = {
        // [currencyId: number]: {
            // getsBack: number;
            // hasToPay: number;
        // };
    // };
    // const balanceByCurrency: BalanceByCurrency = {};
    let getsBack = 0;
    let hasToPay = 0;

    for(const expenseShare of expenseShares) {
        // const currencyId = expenseShare.fk_expense.currencyId;
        // if(!balanceByCurrency[currencyId]) {
        //     balanceByCurrency[currencyId] = {getsBack: 0, hasToPay: 0};
        // }

        const summary = expenseShare.paidAmount - expenseShare.owedAmount;
        if(summary > 0) {
            // balanceByCurrency[currencyId].getsBack += summary;
            getsBack += summary;
            // balanceByCurrency
        } else if(summary < 0) {
            // balanceByCurrency[currencyId].hasToPay += Math.abs(summary);
            hasToPay += Math.abs(summary);
        }
    }
    // res.send({balanceByCurrency});
    res.send({
        getsBack: getsBack,
        hasToPay: hasToPay
    });
            // [currencyId: number]: {})

}