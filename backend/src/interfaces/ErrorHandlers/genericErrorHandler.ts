import { ZodError } from "zod";

export type ErrorType = {
    code: string,
    details: string
}

export const genericErrorMessages = {
    ERROR_PARSING_PASSWORD: {
        message: "enter valid password",
        status: 400,
        details: "make sure the password has atleast one number, one capital letter, one alphanumeric number"
    },
    ERROR_PARSING_USERNAME: {
        message: "enter valid username",
        status: 400,
        details: "make sure the username is valid"
    },
    ERROR_PARSING_EMAIL: {
        message: "enter valid email",
        status: 400,
        details: "make sure the email id is valid"
    },
    INVALID_JWT: {
        message: "error validating user",
        status: 500,
        details: "please try logging in again"
    },
    NO_AUTH_HEADER: {
        message: "error validating user",
        status: 500,
        details: "user hasn't logged in"
    },
    USER_NOT_FOUND: {
        message: "user not found",
        status: 404,
        details: "no user found with the given userId"
    }
}

export class ErrorResponse extends Error {
    status: number;
    errorCode: string;
    message: string;
    details: string;

    constructor(errorCode: string, status: number, message: string, details: string) {
        super();
        this.errorCode = errorCode;
        this.status = status;
        this.message = message;
        this.details = details;
    }

    static errorFromCode(errorCode: string): ErrorResponse {
        const errorInfo = genericErrorMessages[errorCode];
        return new ErrorResponse(errorCode, errorInfo.status, errorInfo.message, errorInfo.details);
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
            "message": this.message,
            "details": this.details
        }
    }

    static formatZodError(error: ZodError): ErrorType {
        const err = error.flatten();
        let formattedError : ErrorType;

        Object.keys(err.fieldErrors).forEach(field =>  {
            switch(field) {
                case 'password': {
                    formattedError = { code: "ERROR_PARSING_PASSWORD", details: err.fieldErrors[field][0] };
                    break;
                }
                case 'username': {
                    formattedError = {code: "ERROR_PARSING_USERNAME", details: err.fieldErrors[field][0]};
                    break;
                }
                case 'email': {
                    formattedError = {code: "ERROR_PARSING_EMAIL", details: err.fieldErrors[field][0]};
                }
            }
        })
        // return {code: "generic", details: 'some'};
        return formattedError;
    }
}