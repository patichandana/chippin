import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtTokenUserSchema } from "../../interfaces/schemaDeclarations.js";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if(!JWT_SECRET_KEY){
    throw ErrorResponse.errorFromCode("SERVER_MISCONFIGURED");
}

export const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.cookies?.Authorization ?? null;

        if (!jwtToken) {
            throw ErrorResponse.errorFromCode("NO_AUTH_HEADER");
        }

        try {
            const parsed = jwtTokenUserSchema.parse(jwt.verify(jwtToken, JWT_SECRET_KEY));

            req.user = {
                userId: BigInt(parsed.userId),
                email: parsed.email
            };
            console.log("Authenticated user:", req.user);
            next();
        } catch (err) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");

        }
    } catch(err) {
        // return -1;
        next(err);
    }
}