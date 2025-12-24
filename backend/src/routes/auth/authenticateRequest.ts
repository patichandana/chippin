import jwt from "jsonwebtoken";
import { jwtTokenUserSchema } from "../../interfaces/schemaDeclarations.js";
import { ErrorResponse, genericErrorMessages } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticateRequest = (req, res) => {
    try {
        const jwtToken = req.cookies?.Authorization ?? null;

        if (jwtToken) {
            try {
                const a = jwtTokenUserSchema.parse(jwt.verify(jwtToken, JWT_SECRET_KEY));
                return a.userId;
            } catch (err) {
                throw ErrorResponse.errorFromCode("INVALID_JWT");
    
            }
        } else {
            throw ErrorResponse.errorFromCode("NO_AUTH_HEADER");
            //     "name": "noAuthHeader",
            //     "message": "user not logged in",
            //     "suggestion": "please authenticate"
            // });
            // return -1;
        }
    } catch(err) {
        
    }
}