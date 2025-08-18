import { ErrorResponse, ErrorType, genericErrorMessages } from "./genericErrorHandler.js";

export const SignupErrorsObject = {
    ...genericErrorMessages,
    SIGNUP_FAILURE: {
        message: "Error signing up. Please try after sometime",
        details: "check application logs for more information",
        status: 500
    },
    DUPLICATE_SIGNUP_EMAIL: {
        message: "user already exists. please login",
        details: 'user with this email already exists. choose another email',
        status: 400
    },
    INVALID_CURRENCY: {
        message: "invalid currency",
        details: 'enter a valid currency id',
        status: 400
    },
    ERROR_CREATING_USER: {
        message: "error creating user",
        status: 400,
        details: "none"
    },
}

export type SignupErrorType = keyof typeof SignupErrorsObject;

export class SignupError extends ErrorResponse {
    constructor(errorCode: SignupErrorType, details: string) {
        super(errorCode, SignupErrorsObject[errorCode].status, SignupErrorsObject[errorCode].message, details ?? SignupErrorsObject[errorCode].details);
    }
}