import { userDetailsSchema } from "../../interfaces/schemaDeclarations.js";
import { prisma } from "../../db/connectDB.js";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";

export async function getCurrentUser(req, res, next) {
    try {
        const userId = req.body.userId;
        if (!userId) {
            throw new ErrorResponse("USER_NOT_AUTHENTICATED", 401, "User not authenticated","No userId found in request body");
            }
        const userRecord = await prisma.users.findUnique({
            where: {
                user_id: userId
            },
            select: {
                user_id: true,
                email: true,
                firstname: true,
                lastname: true,
                fk_currency:{
                    select: {
                        currency_name: true
                    }
                }
            }
        })

        if (userRecord) {
            const userDetails = userDetailsSchema.parse({
                userId: userRecord.user_id.toString(),
                email: userRecord.email,
                firstName: userRecord.firstname,
                lastName: userRecord.lastname,
                currencyName: userRecord.fk_currency.currency_name});
            res.status(200).send(userDetails);
        } else {
            throw new ErrorResponse("USER_NOT_FOUND", 404, "User not found", "No user found with the given userId");
        }
    } catch (err) {
        next(err);
    }
}