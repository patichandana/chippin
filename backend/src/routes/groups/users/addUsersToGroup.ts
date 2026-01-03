import { prisma } from "../../../db/connectDB.js";
import { GroupMemberError } from "../../../interfaces/ErrorHandlers/groupMemberErrorHandler.js";
import { isUserInGroup, addUsersToGroupByIds } from "../../../services/groupService.js";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../../interfaces/ErrorHandlers/genericErrorHandler.js";


export type AddUsersToGroupBody = {
    users: (string | number | bigint)[];
};
export async function addUsersToGroup(req: Request<{group_id: string}, any, AddUsersToGroupBody>, 
                                    res: Response, next: NextFunction) {
    try {
        //query should be like check if user is part of the group first
        //then make one query per user id in the users 
        const user = req.user;
        if (!user || user.userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }
        const userId = user.userId;
        const groupId = BigInt(req.params.group_id);
        const userIds = req.body.users.map(id => BigInt(id));

        const userInGroup = await isUserInGroup(groupId, userId);
        if (!userInGroup) {
            return next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", "user not part of the group"));
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

        const result = await addUsersToGroupByIds(groupId, userIds);
        res.send({
            status: "Success",
            groupMembers: result
        });
    } catch (e) {
        next(e);
    }
}