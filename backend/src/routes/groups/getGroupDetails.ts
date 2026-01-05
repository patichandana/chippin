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
        const groupId = BigInt(req.params.group_id);
        const userId = BigInt(req.user.userId);
        //security: need to check if the user is in the group.
        const userInGroup = await isUserInGroup(groupId, userId);
        if(!userInGroup) {
            throw new Error("user not in group");
        }
        if (groupId && userInGroup) {
            let groupDetails = await prisma.groups.findUnique({
                relationLoadStrategy: 'join',
                include: {
                    expenses: {
                        include: {
                            expenseShares: {
                                include: { fk_user: true},
                                omit: {
                                    expenseId: true,
                                }
                            }
                        }
                    },
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

            //adding userFullName in the expenseShares object, and removing the fk_user foreign object

            for(const expense of groupDetails.expenses) {
                for(let expenseShare of expense.expenseShares) {
                     let share: any = expenseShare;
                    share.userFullName = `${share.fk_user.firstname} ${share.fk_user.lastname}`;
                    delete share.fk_user; 
                    expenseShare = share;
                }
                
            }
            res.send(parseObject(groupDetails));
        }
    } catch (err) {
        next(err, req, res);
    }
}