export class ErrorResponse extends Error {
    constructor(errorCode, status, message) {
        super();
        this.errorCode = errorCode;
        this.status = status;
        this.message = message;
    }
    getErrorCode() {
        return this.errorCode;
    }
    getMessage() {
        return this.message;
    }
    getResponseStatus() {
        return this.status;
    }
    getResponseErrorObject() {
        return {
            "errorCode": this.errorCode,
            "message": this.message
        };
    }
}
// export class ApplicationError extends ErrorResponse {
//     static APP_ERROR = "Something went wrong. Please try again later";
//     constructor(errorObject: ErrorObject) {
//         super(errorObject);
//     }
// }
// const LoginError2 = {
//     INVALID_PASSWORD: {
//         status: 400,
//         messsge: "Wrong password"
//     },
//     INVALID_USERNAME: {
//         status: 400,
//         messsge: "Wrong password"
//     },
//     BANANA: {
//         status: 401,
//         message: 'banana'
//     }
// }
// type MyLoginError = keyof typeof LoginError2;
// class LoginErrorHandler {
//     constructor(type: MyLoginError) {
//         console.log(LoginError2[type]);
//     }
// }
export const LoginErrorsObject = {
    INVALID_USERNAME_PASSWORD: {
        message: "wrong username or password",
        status: 400
    }
};
export class LoginError extends ErrorResponse {
    constructor(errorCode) {
        super(errorCode, LoginErrorsObject[errorCode].status, LoginErrorsObject[errorCode].message);
    }
}
// export class GroupError extends ErrorResponse {
//     constructor(errorObject) {
//         super(errorObject);
//     }
// }
//# sourceMappingURL=error.js.map