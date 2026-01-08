import { ErrorResponse, genericErrorMessages } from "./genericErrorHandler.js";

//LoginErrors
export const LoginErrorsObject = {
    INVALID_PASSWORD: {
        message: "wrong email or password",
        status: 400,
        details: "invalid credentials"
    }
}

export type LoginErrorType = keyof typeof LoginErrorsObject;

export class LoginError extends ErrorResponse {
    constructor(errorCode: LoginErrorType, details?:string) {
        super(errorCode, LoginErrorsObject[errorCode].status, LoginErrorsObject[errorCode].message, details ?? LoginErrorsObject[errorCode].details);
    }
}