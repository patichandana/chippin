import { prisma } from "../../../db/connectDB.js";
import { GroupMemberError } from "../../../interfaces/ErrorHandlers/groupMemberErrorHandler.js";
import { isUserInGroup } from "../../../services/groupService.js";

export async function addUsersToGroup(req, res, next) {
    try {
        //query should be like check if user is part of the group first
        //then make one query per user id in the users 
        console.log(req)
        const userId = req.body.userId;
        const groupId = Number(req.params.group_id)
        const userIds = req.body.users;

        const userInGroup = await isUserInGroup(userId, groupId);
        if(!userInGroup) {
            next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", "user not part of the group"));
            return ;
        }

        type groupMemberType = {
            group_id: number,
            member_id: number
        }
        let groupMemberList: groupMemberType[] = [];

        for(const userId in userIds) {
            groupMemberList.push({
                group_id: groupId,
                member_id: Number(userId)
            })
        }

        const count = await prisma.groupMembers.createMany({
            data: groupMemberList,
        })

        res.send({
            count: count
        })
    } catch(e) {
        next()
    }
}