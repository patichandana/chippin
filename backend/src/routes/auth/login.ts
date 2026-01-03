import { prisma } from "../../db/connectDB.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { LoginError } from "../../interfaces/ErrorHandlers/loginErrorHandler.js";
import { loginUserSchema } from "../../interfaces/schemaDeclarations.js";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";



export async function login(req: Request, res: Response, next: NextFunction) {

    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        if(!JWT_SECRET_KEY){
            throw ErrorResponse.errorFromCode("SERVER_MISCONFIGURED");
        }
        const loginUser = loginUserSchema.parse(req.body)

        const dbUserRecord = await prisma.users.findFirstOrThrow({
            where: { email: loginUser.email }
        })

        const result = await bcrypt.compare(loginUser.password, dbUserRecord.password);

        if (result) {
            const jwtPayload = {
                'userId': dbUserRecord.userId.toString(),
                'email': dbUserRecord.email
            };


            const jwtToken = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: '8h' });
            
            // res.header('Set-Cookie', `Authorization=Bearer ${jwtToken}`)
            res.cookie('Authorization', jwtToken, { path: "/", httpOnly: true, secure: false, sameSite: "lax" })

            res.send({
                "status": "success",
                "token": jwtToken
            })
        } else {
            next(new LoginError("INVALID_PASSWORD", "passwords don't match"));
        }
    } catch (err) {
        if (err instanceof ZodError) {
            const e = ErrorResponse.formatZodError(err);
            next(ErrorResponse.errorFromCode(e.code));
            return; 
        } else {
            next(new LoginError("INVALID_PASSWORD", "error logging in. Please reach out to admin"));
        }
    }
}