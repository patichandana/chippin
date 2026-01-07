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
                    groupMembers: {
                        include: {
                            fk_member: true
                        }
                    }
                },
                where: {
                    groupId: groupId
                }
            });

            let groupDetailsResponse: any = groupDetails;

            const groupMembers = {};
            for(const tempMember of groupDetails?.groupMembers) {
                groupMembers[Number(tempMember.memberId) ] = {
                    userFullName: tempMember.fk_member.userFullName,
                    profilePic: "https://marketplace.canva.com/EAFqNrAJpQs/2/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-nHZ1TkZ0aGk.jpg"
                };
            }

            groupDetailsResponse.groupMembers = groupMembers;

            //adding userFullName in the expenseShares object, and removing the fk_user foreign object

            for (const expense of groupDetailsResponse.expenses) {
                let modifiedExpense: any = expense;
                const paidBy = [];

                for(let expenseShare of expense.expenseShares) {
                    delete expenseShare.fk_user;
                    if (expenseShare.paidAmount > 0) paidBy.push(expenseShare.userId)
                }

                modifiedExpense.paidBy = paidBy;
            }

            res.send(parseObject(groupDetailsResponse));
        }
    } catch (err) {
        next(err, req, res);
    }
}