import { groupUserSchema } from '../../interfaces/schemaDeclarations.js';
import { prisma } from "../../db/connectDB.js";
import { GroupErrorObject, GroupError } from "../../interfaces/ErrorHandlers/groupErrorHandler.js"


export async function addGroup(req, res, next) {
    try {
        const groupDetails = groupUserSchema.parse(req.body);

        const groupDBRecord = await prisma.groups.create({
           data: {
            group_name: groupDetails.groupName,
            group_type: groupDetails.groupType,
            created_by: groupDetails.userId
           }
        })

        console.log(groupDBRecord);

        res.send({
            "groupId": groupDBRecord.group_id.toString(),
            "groupName": groupDBRecord.group_name,
            "createdBy": groupDBRecord.created_by.toString(),
            "createdAt": groupDBRecord.created_at
        })
    } catch(err) {
        next(new GroupError("ERROR_CREATING_GROUP", null), req, res);
    }
}