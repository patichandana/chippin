import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

await prisma.groupTypes.createMany({
    data: [
        {
            "group_type_name": "Home"
        },
        {
            "group_type_name": "Trip"
        },
        {
            "group_type_name": "Friends"
        },
        {
            "group_type_name": "Other"
        }
    ]
});

await prisma.currencies.createMany({
    data: [
        {
            "currency_name" : "US Dollar",
            "code": "USD",
            "symbol": "$"
        },
        {
            "currency_name": "Indian Rupees",
            "code": "INR",
            "symbol": "₹"
        },
        {
            "currency_name": "Canadian dollar",
            "code": "CAD",
            "symbol": "$"
        }
    ]
}).then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
})