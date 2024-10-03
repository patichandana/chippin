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
    }
};
export class ErrorResponse extends Error {
    constructor(errorCode, status, message, details) {
        super();
        this.errorCode = errorCode;
        this.status = status;
        this.message = message;
        this.details = details;
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
        };
    }
    static formatZodError(error) {
        const err = error.flatten();
        let formattedError;
        Object.keys(err.fieldErrors).forEach(field => {
            switch (field) {
                case 'password': {
                    formattedError = { code: "ERROR_PARSING_PASSWORD", details: err.fieldErrors[field][0] };
                    break;
                }
                case 'username': {
                    formattedError = { code: "ERROR_PARSING_USERNAME", details: err.fieldErrors[field][0] };
                    break;
                }
                case 'email': {
                    formattedError = { code: "ERROR_PARSING_EMAIL", details: err.fieldErrors[field][0] };
                }
            }
        });
        // return {code: "generic", details: 'some'};
        return formattedError;
    }
}
//# sourceMappingURL=genericErrorHandler.js.map