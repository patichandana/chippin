import { ErrorResponse } from "./genericErrorHandler.js";

export const ExpenseErrorObject = {
    "USER_NOT_IN_GROUP": {
        message: "Authorization failed",
        status: 403,
        details: "You do not have access to this group"
    },
    "ERROR_EVAULATING_QUERY_PARAMS": {
        message: "Error evaluating query paraneters",
        status: 400,
        details: ""
    },
    "ERROR_FETCHING_EXPENSES": {
        message: "error fetching expenses",
        status: 400,
        details: ""
    }
}

export type ExpenseErrorType = keyof typeof ExpenseErrorObject;

export class ExpenseError extends ErrorResponse {
    constructor(errorCode: ExpenseErrorType, details: string | null) {
        super(errorCode, ExpenseErrorObject[errorCode].status, ExpenseErrorObject[errorCode].message, details ?? ExpenseErrorObject[errorCode].details);
    }
}