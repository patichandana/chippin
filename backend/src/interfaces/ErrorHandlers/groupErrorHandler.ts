import { ZodError } from "zod";
import { ErrorResponse } from "./genericErrorHandler.js";

export const GroupErrorObject = {
    "ERROR_CREATING_GROUP": {
        message: "error creating group",
        status: 400,
        details: "none"
    }
}

export type GroupErrorType = keyof typeof GroupErrorObject;

export class GroupError extends ErrorResponse {
    constructor(errorCode: GroupErrorType, details: string) {
        super(errorCode, GroupErrorObject[errorCode].status, GroupErrorObject[errorCode].message, details ?? GroupErrorObject[errorCode].details);
    }
}