import { prisma } from "../../../db/connectDB.js";
import { GroupMemberError } from "../../../interfaces/ErrorHandlers/groupMemberErrorHandler.js";
import { isUserInGroup } from "../../../services/groupService.js";
import { addUsersToGroup } from "./addUsersToGroup.js";

export async function addUsersToGroupByEmail(req, res, next) {
    try {
        //query should be like check if user is part of the group first
        //then make one query per user id in the users 
        const userId = req.user.userId;
        const groupId = BigInt(req.params.group_id);
        const userEmails = req.body.emails; // array of user emails

        const userInGroup = await isUserInGroup(groupId, userId);
        if (!userInGroup) {
            next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", "user not part of the group"));
            return;
        }

        // Search if any emails do not exist in the users table
        const users = await prisma.users.findMany({
            where: { email: { in: userEmails } },
            select: { userId: true, email: true }
        });

        const foundEmails = users.map(user => user.email);
        const invalidEmails = userEmails.filter(email => !foundEmails.includes(email));
        if(invalidEmails.length > 0) {
            return next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", 
                `the following emails do not exist: ${invalidEmails.join(", ")}. Please ensure all emails are registered and try again.`));
        }
        

        const userIds = users.map(user => user.userId);

        // check if any of the userIds are already in the group
        const existingMembers = await prisma.groupMembers.findMany({
            where: {
                groupId: groupId,
                memberId: { in: userIds }
            },
            select: { memberId: true }
        });
        
        // If there are existing members, return an error
        if(existingMembers.length > 0) {
            const existingMemberIds = existingMembers.map(member => member.memberId);   
            const existingMemberEmails = users
                .filter(user => existingMemberIds.includes(user.userId))
                .map(user => user.email);
            return next(new GroupMemberError("ERROR_ADDING_GROUP_MEMBERS", 
                `the following users are already members of the group: ${existingMemberEmails.join(", ")}.`));
        }

        req.body.users = userIds; // replace emails with user IDs for further processing

        // Now call the existing function to add users by their IDs
        return addUsersToGroup(req, res, next);

        
    } catch (e) {
        next();
    }
}