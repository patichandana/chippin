import { prisma } from "../../db/connectDB.js";
import { isUserInGroup } from "../../services/groupService.js"
import { parseObject } from "../../utils/commonUtil.js";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
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

export async function getGroupDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId = BigInt(req.params.group_id);
        const user = req.user;
        if (!user || user.userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }
        const userId = user.userId;
        //security: need to check if the user is in the group.
        const userInGroup = await isUserInGroup(groupId, userId);
        if(!userInGroup) {
            throw new Error("user not in group");
        }
        if (groupId && userInGroup) {
            const groupDetails = await prisma.groups.findUnique({
                relationLoadStrategy: 'join',
                include: {
                    expenses: true,
                    groupMembers: true
                },
                where: {
                    groupId: groupId
                }
            });

            if(!groupDetails) {
                throw new Error("GROUP_NOT_FOUND");
            }

            const response = {
            ...groupDetails,
            groupMembers: groupDetails.groupMembers.map(m => m.memberId)
        };
            res.send(parseObject(response));
        }
    } catch (err) {
        next(err);
    }
}