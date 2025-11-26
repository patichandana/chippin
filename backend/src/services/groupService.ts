import { prisma } from "../db/connectDB.js"

export async function isUserInGroup(groupId: number, userId: number) {
    try {
        const membership = await prisma.groupMembers.findFirst({
            where: {
                groupId: groupId,
                memberId: userId
            }
        });

        return membership != null;
    } catch(e) {
        //todo : proper error handling
        return null;
    }
}