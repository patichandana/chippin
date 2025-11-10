import { prisma } from "../../db/connectDB.js";

export async function getCurrencies(req, res, next) {
    try {
        if (req.body.userId == -1)
            throw new Error("user not authenticated");
        const currencyDBValues = await prisma.currencies.findMany();
        const currencies = []
        currencyDBValues.forEach(c => {
            currencies.push({
                "id": c.currency_id,
                "name": c.currency_name,
                "symbol": c.symbol,
                "code": c.code
            })
        })
        res.send(currencies)
    } catch (err) {
        //TODO: proper error handling using ZOD
        res.send(err);
    }
}