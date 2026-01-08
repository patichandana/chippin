import { userDetailsSchema } from "../../interfaces/schemaDeclarations.js";
import { prisma } from "../../db/connectDB.js";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { parseObject } from "../../utils/commonUtil.js";
import { Request, Response, NextFunction } from "express";

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        if (!user || user.userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }
        const userId = user.userId;
        const userRecord = await prisma.users.findUnique({
            where: {
                userId: userId
            },
            select: {
                userId: true,
                email: true,
                firstname: true,
                lastname: true,
                fk_currency:{
                    select: {
                        currencyName: true
                    }
                }
            }
        });
        if (!userRecord) {
            throw ErrorResponse.errorFromCode("USER_NOT_FOUND");
        }

        const responseRecord = {
            userId: userRecord.userId,
            email: userRecord.email,
            firstname: userRecord.firstname,
            lastname: userRecord.lastname,
            currencyName: userRecord.fk_currency.currencyName
        };

        const response = userDetailsSchema.parse(responseRecord);
        res.send(parseObject(response));
    } catch (err) {
        next(err);
    }
}