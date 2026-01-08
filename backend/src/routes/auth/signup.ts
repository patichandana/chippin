import bcrypt from 'bcrypt';
import { prisma } from "../../db/connectDB.js";
import { SignupError, SignupErrorType } from '../../interfaces/ErrorHandlers/signupErrorHandler.js';
import { signupUserSchema } from '../../interfaces/schemaDeclarations.js';
import { ZodError } from 'zod';
import { ErrorType } from '../../interfaces/ErrorHandlers/genericErrorHandler.js';
import { parseObject } from '../../utils/commonUtil.js';
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

const saltRounds = 10;

export async function signup(req: Request, res: Response, next: NextFunction) {

    try {
        const user = signupUserSchema.parse(req.body);

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(user.password, salt);

        const createdUser = await prisma.users.create({
                                data: {
                                    email: user.email,
                                    password: hash,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    currencyId: user?.currencyId
                                },
                                omit: {
                                    password: true
                                }
                            });                 
                    res.send(parseObject(createdUser));
    } catch (err) {
        if (err instanceof ZodError) {
            // next(new SignupError("ERROR_PARSING_PASSWORD", error.message), req, res);
            const e = SignupError.formatZodError(err);
            switch (e.code) {
                case 'ERROR_PARSING_PASSWORD': {
                    next(new SignupError("ERROR_PARSING_PASSWORD", e.details));
                    break;
                };
                case 'ERROR_PARSING_USERNAME': {
                    next(new SignupError("ERROR_PARSING_USERNAME", e.details));
                    break;
                }
            }
            return;
        }
        let errorType: SignupErrorType = "ERROR_CREATING_USER";
        let details = "sign up failed";
        if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002"){
            console.log("PRISMA ERROR =>", err);
            const target = err.meta?.target;

            if(Array.isArray(target) && target.length > 0){
                console.log("TARGET =>", target[0]);
                switch (target[0]) {
                    case 'email': {
                        errorType = "DUPLICATE_SIGNUP_EMAIL";
                        details = 'user with this email already exists. try logging in';
                        break;
                    };
                    case 'currency_id': {
                        errorType = "INVALID_CURRENCY";
                        break;
                    };
                }
            }
            
        }
        next(new SignupError(errorType, details));
        // next(new SignupError("SIGNUP_FAILURE", error.details), req, res)
    }
}