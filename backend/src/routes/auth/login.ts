import { prisma } from "../../db/connectDB.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { LoginError } from "../../interfaces/ErrorHandlers/loginErrorHandler.js";
import { loginUserSchema } from "../../interfaces/schemaDeclarations.js";
import { ZodError } from "zod";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function login(req, res, next) {

    try {
        const loginUser = loginUserSchema.parse(req.body)

        const dbUserRecord = await prisma.users.findFirstOrThrow({
            where: { email: loginUser.email }
        })

        const result = await bcrypt.compare(loginUser.password, dbUserRecord.password);

        if (result) {
            const jwtPayload = {
                'userId': dbUserRecord.user_id.toString(),
                'email': dbUserRecord.email
            };


            const jwtToken = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: '8h' });
            
            // res.header('Set-Cookie', `Authorization=Bearer ${jwtToken}`)
            res.cookie('Authorization', jwtToken, {  path: "/", httpOnly: true, secure: true, sameSite: "None"})

            res.send({
                "status": "success",
                "token": jwtToken
            })
        } else {
            next(new LoginError("INVALID_PASSWORD", "passwords don't match"), req, res);
        }
    } catch (err) {
        if (err instanceof ZodError) {
            const e = LoginError.formatZodError(err);
            switch (e.code) {
                case 'ERROR_PARSING_EMAIL': {
                    next(new LoginError("ERROR_PARSING_EMAIL", e.details), req, res);
                    break;
                }
            }
        } else {
            next(new LoginError("INVALID_PASSWORD", "error logging in. Please reach out to admin"), req, res);
        }
    }
}