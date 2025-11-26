import { userDetailsSchema } from "../../interfaces/schemaDeclarations.js";
import { prisma } from "../../db/connectDB.js";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import { parseObject } from "../../utils/commonUtil.js";

export async function getCurrentUser(req, res, next) {
    try {
        const userId = req.body.userId;
        if (!userId) {
            throw new ErrorResponse("USER_NOT_AUTHENTICATED", 401, "User not authenticated","No userId found in request body");
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
            res.send(parseObject(userRecord));
        } else {
            throw new ErrorResponse("USER_NOT_FOUND", 404, "User not found", "No user found with the given userId");
        }
    } catch (err) {
        next(err);
    }
}