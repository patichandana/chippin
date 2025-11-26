import { prisma } from "../../db/connectDB.js";
import { isUserInGroup } from "../../services/groupService.js"
import { parseObject } from "../../utils/commonUtil.js";

/*
{
    name:
    type:
    expenses: [
        {
            date:
            name:
            description:
            paidBy: []
            amount:
            currency:
            "expenseShares": [
                {
                    userId
                    paidAmount
                    owedAmount
                }
            ]
        }
    ]

 }
*/

export async function getGroupDetails(req, res, next) {
    try {
        const groupId = Number(req.params.group_id);
        const userId = Number(req.body.userId);
        //security: need to check if the user is in the group.
        const userInGroup = await isUserInGroup(groupId, userId);
        if(!userInGroup) {
            throw new Error("user not in group");
        }
        if (groupId && userInGroup) {
            let groupDetails = await prisma.groups.findUnique({
                relationLoadStrategy: 'join',
                include: {
                    expenses: true,
                    groupMembers: true
                },
                where: {
                    groupId: groupId
                }
            });

            const groupMembers = [];
            for(const tempMember of groupDetails?.groupMembers) {
                groupMembers.push(tempMember.memberId);
            }

            groupDetails.groupMembers = groupMembers;
            res.send(parseObject(groupDetails));
        }
    } catch (err) {
        next(err, req, res);
    }
}