import jwt from "jsonwebtoken";
import { jwtTokenUserSchema } from "../../interfaces/schemaDeclarations.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const authenticateRequest = (req, res) => {
    const jwtString = req.header('Authorization').split(' ');
    const jwtToken = jwtString[0] == "Bearer" ? jwtString[1] : null;
    ;
    if (jwtToken) {
        try {
            const a = jwtTokenUserSchema.parse(jwt.verify(jwtToken, JWT_SECRET_KEY));
            return a.userId;
        }
        catch (err) {
            throw new Error("INVALID_JWT");
        }
    }
    else {
        throw new Error("NO_AUTH_HEADER");
        //     "name": "noAuthHeader",
        //     "message": "user not logged in",
        //     "suggestion": "please authenticate"
        // });
        // return -1;
    }
};
//# sourceMappingURL=authenticateRequest.js.map