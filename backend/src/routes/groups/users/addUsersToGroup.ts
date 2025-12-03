import { prisma } from "../../../db/connectDB.js";
import { GroupMemberError } from "../../../interfaces/ErrorHandlers/groupMemberErrorHandler.js";
import { isUserInGroup } from "../../../services/groupService.js";

export async function addUsersToGroup(req, res, next) {
    try {
        //query should be like check if user is part of the group first
        //then make one query per user id in the users 
        const userId = req.body.userId;
        const groupId = BigInt(req.params.group_id);
        const userIds = req.body.users.map(id => BigInt(id));

        const userInGroup = await isUserInGroup(groupId, userId);
        if (!userInGroup) {
            next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", "user not part of the group"));
            return;
        }

        // check if all the userIds exist in the users table
        const existingUsers = await prisma.users.findMany({
            where: { userId: { in: userIds } },
            select: { userId: true }
        });
        const existingUserIds = existingUsers.map(user => user.userId);
        const invalidUserIds = userIds.filter(id => !existingUserIds.includes(id));
        if(invalidUserIds.length > 0) {
            return next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", 
                `the following user ids do not exist: ${invalidUserIds.join(", ")}. Please ensure all users are registered and try again.`) );
        }

        type groupMemberType = {
            groupId: bigint,
            memberId: bigint
        }
        let groupMemberList: groupMemberType[] = [];

        userIds.forEach(userId => {
            groupMemberList.push({
                groupId: groupId,
                memberId: userId
            })
        });

        const count = await prisma.groupMembers.createMany({
            data: groupMemberList,
        })

        res.send({
            status: "Success",
            groupMembers: count
        });
    } catch (e) {
        next();
    }
}