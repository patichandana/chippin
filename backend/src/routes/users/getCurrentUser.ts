import { userDetailsSchema } from "../../interfaces/schemaDeclarations.js";
import { prisma } from "../../db/connectDB.js";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { parseObject } from "../../utils/commonUtil.js";

export async function getCurrentUser(req, res, next) {
    try {
        const userId = req.user.userId;
        if (userId === undefined || userId === null || userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
            }
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
        })

        if (userRecord) {
            userRecord["currencyName"] = userRecord.fk_currency.currencyName;
            delete userRecord["fk_currency"];
            const response = userDetailsSchema.parse(userRecord);
            res.send(parseObject(response));
        } else {
            throw ErrorResponse.errorFromCode("USER_NOT_FOUND");
        }
    } catch (err) {
        next(err);
    }
}