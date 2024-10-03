import { ErrorResponse, genericErrorMessages } from "./genericErrorHandler.js";
//LoginErrors
export const LoginErrorsObject = {
    ...genericErrorMessages,
    INVALID_USERNAME_PASSWORD: {
        message: "wrong username or password",
        status: 400
    }
};
export class LoginError extends ErrorResponse {
    constructor(errorCode, details) {
        super(errorCode, LoginErrorsObject[errorCode].status, LoginErrorsObject[errorCode].message, details);
    }
}
//# sourceMappingURL=loginErrorHandler.js.map