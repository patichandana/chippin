import jwt from "jsonwebtoken";
import { jwtTokenUserSchema } from "../../interfaces/schemaDeclarations.js";
import { ErrorResponse, genericErrorMessages } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticateRequest = (req, res) => {
    const jwtString = req.header('Authorization').split(' ');
    const jwtToken = jwtString[0] == "Bearer" ? jwtString[1] : null;
    ;

    if (jwtToken) {
        try {
            const a = jwtTokenUserSchema.parse(jwt.verify(jwtToken, JWT_SECRET_KEY));
            return a.userId;
        } catch (err) {
            throw new ErrorResponse("INVALID_JWT", 500, genericErrorMessages["INVALID_JWT"].message, genericErrorMessages["INVALID_JWT"].details);
        }
    } else {
        throw new ErrorResponse("NO_AUTH_HEADER", 500, genericErrorMessages["NO_AUTH_HEADER"].message, genericErrorMessages["NO_AUTH_HEADER"].details);
        //     "name": "noAuthHeader",
        //     "message": "user not logged in",
        //     "suggestion": "please authenticate"
        // });
        // return -1;
    }
}