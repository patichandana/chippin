import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ErrorResponse } from "../interfaces/ErrorHandlers/genericErrorHandler.js";
// import { Request, Response, NextFunction } from "express";

export const handleErrors:ErrorRequestHandler = (err:unknown, req:Request, res:Response, next:NextFunction): void => {

    if (err instanceof ErrorResponse) {
        const statusCode = err.getResponseStatus();
        const errorBody = err.getResponseErrorObject();

        res.status(statusCode).send(errorBody);
        return;
    } 
    if (typeof err === "object" && err !== null && (err as any).type === "entity.parse.failed") {
        res.status(400).send({
            errorCode: "INVALID_PAYLOAD",
            message: "enter valid payload"
        });
        return;
    }
            res.status(400).send(err);

}