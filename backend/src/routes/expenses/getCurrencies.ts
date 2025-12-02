import { prisma } from "../../db/connectDB.js";
import { parseObject } from "../../utils/commonUtil.js";

export async function getCurrencies(req, res, next) {
    try {
        if (req.body.userId == -1)
            throw new Error("user not authenticated");
        const currencyDBValues = await prisma.currencies.findMany();
        res.send(parseObject(currencyDBValues))
    } catch (err) {
        //TODO: proper error handling using ZOD
        res.send(err);
    }
}