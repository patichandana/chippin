import { groupUserSchema } from '../../interfaces/schemaDeclarations.js';
import { prisma } from "../../db/connectDB.js";
import { GroupErrorObject, GroupError } from "../../interfaces/ErrorHandlers/groupErrorHandler.js"
import { parseObject } from "../../utils/commonUtil.js";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";

export async function addGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const groupDetails = groupUserSchema.parse(req.body);
        const user = req.user;
        if (!user || user.userId === -1n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }
        const userId = user.userId;

        const groupDBRecord = await prisma.$transaction(async () => {
            const group = await prisma.groups.create({
                data: {
                    groupName: groupDetails.groupName,
                    groupType: groupDetails.groupType,
                    createdBy: userId
                }
            });
            await prisma.groupMembers.create({
                data: {
                    groupId: group.groupId,
                    memberId: group.createdBy
                }
            })

            return group;
        })

        res.send(parseObject(groupDBRecord));
    } catch(err) {
        next(new GroupError("ERROR_CREATING_GROUP", "error creating group"));
    }
}