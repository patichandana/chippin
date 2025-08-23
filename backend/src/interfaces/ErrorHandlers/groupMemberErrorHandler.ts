import { ZodError } from "zod";
import { ErrorResponse } from "./genericErrorHandler.js";

export const GroupMemberErrorObject = {
    "ERROR_ADDING_GROUP_MEMBERS": {
        message: "error adding group members to the group",
        status: 400,
        details: "not able to add group members to the group. please reach out to admin"
    }
}

export type GroupMemberErrorType = keyof typeof GroupMemberErrorObject;

export class GroupMemberError extends ErrorResponse {
    constructor(errorCode: GroupMemberErrorType, details: string) {
        super(errorCode, GroupMemberErrorObject[errorCode].status, GroupMemberErrorObject[errorCode].message, details ?? GroupMemberErrorObject[errorCode].details);
    }
}