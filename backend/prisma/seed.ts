import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// console.log(prisma);

async function main() {
    await prisma.grouptypes.createMany({
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
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
})