import { prisma } from "../db/connectDB.js"

export async function isUserInGroup(userId: number, groupId: number) {
    try {
        const membership = await prisma.groupMembers.findFirst({
            where: {
                group_id: groupId,
                member_id: userId
            }
        });

        return membership != null;
    } catch(e) {
        //todo : proper error handling
        return null;
    }
}
