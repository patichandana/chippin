import { ErrorResponse } from "../interfaces/ErrorHandlers/genericErrorHandler.js";

export const handleErrors = (err, req, res, next) => {

    if (err instanceof ErrorResponse) {
        const statusCode = err.getResponseStatus();
        const errorBody = err.getResponseErrorObject();

        res.status(statusCode).send(errorBody);
    } else {
        if (err.type == "entity.parse.failed") {
            res.status(err.statusCode).send({
                errorCode: "INVALID_PAYLOAD",
                message: "enter valid payload"
            })
        }
            res.status(400).send(err)
    }

    return 1;
}