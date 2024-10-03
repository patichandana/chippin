import { ErrorResponse, genericErrorMessages } from "./genericErrorHandler.js";

//LoginErrors
export const LoginErrorsObject = {
    ...genericErrorMessages,
    INVALID_USERNAME_PASSWORD: {
        message: "wrong username or password",
        status: 400
    }
}

export type LoginErrorType = keyof typeof LoginErrorsObject;

export class LoginError extends ErrorResponse {
    constructor(errorCode: LoginErrorType, details) {
        super(errorCode, LoginErrorsObject[errorCode].status, LoginErrorsObject[errorCode].message, details);
    }
}