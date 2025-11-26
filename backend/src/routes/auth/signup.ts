import bcrypt from 'bcrypt';
import { prisma } from "../../db/connectDB.js";
import { SignupError, SignupErrorType } from '../../interfaces/ErrorHandlers/signupErrorHandler.js';
import { signupUserSchema } from '../../interfaces/schemaDeclarations.js';
import { ZodError } from 'zod';
import { ErrorType } from '../../interfaces/ErrorHandlers/genericErrorHandler.js';
import { parseObject } from '../../utils/commonUtil.js';

const saltRounds = 10;

export function signup(req, res, next) {

    try {
        const user = signupUserSchema.parse(req.body)

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(new SignupError("SIGNUP_FAILURE", "error generating salt"), req, res);
            }
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (err) {
                    next(new SignupError("SIGNUP_FAILURE", "error generating hash"), req, res);
                }
                try {
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
                    let errorType: SignupErrorType = "ERROR_CREATING_USER";
                    let details = "sign up failed";
                    if (err?.code == "P2002") {
                        switch (err.meta.target[0]) {
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
                    next(new SignupError(errorType, details), req, res);
                }
            })
        });
    } catch (error) {
        if (error instanceof ZodError) {
            // next(new SignupError("ERROR_PARSING_PASSWORD", error.message), req, res);
            const e = SignupError.formatZodError(error);
            switch (e.code) {
                case 'ERROR_PARSING_PASSWORD': {
                    next(new SignupError("ERROR_PARSING_PASSWORD", e.details), req, res);
                    break;
                };
                case 'ERROR_PARSING_USERNAME': {
                    next(new SignupError("ERROR_PARSING_USERNAME", e.details), req, res);
                    break;
                }
            }
            return;
        }
        // next(new SignupError("SIGNUP_FAILURE", error.details), req, res)
    }
}