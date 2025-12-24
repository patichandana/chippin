import { prisma } from "../db/connectDB.js"
import { ErrorResponse } from "../interfaces/ErrorHandlers/genericErrorHandler.js";

export async function isUserInGroup(groupId: bigint, userId: bigint) { // is userId supposed to be bigint? or Number?
    try {
        // userID validation
        if (userId == null || Number.isNaN(userId) || !Number.isInteger(userId) ) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }

        // groupID validation
        if (groupId == -1n || groupId == null || groupId == undefined || Number.isNaN(Number(groupId))) {
            return true;
        }
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