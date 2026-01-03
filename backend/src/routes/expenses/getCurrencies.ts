import { prisma } from "../../db/connectDB.js";
import { parseObject } from "../../utils/commonUtil.js";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";

export async function getCurrencies(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        if (!user || user.userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }
        const userId = user.userId;
        const currencyDBValues = await prisma.currencies.findMany();
        res.send(parseObject(currencyDBValues))
    } catch (err) {
        //TODO: proper error handling using ZOD
        res.send(err);
    }
}