import { z as zod } from 'zod';
const numberRegex = new RegExp("[0-9]");
export const signupUserSchema = zod.object({
    email: zod.string().email(),
    username: zod.string().min(5).max(50),
    firstname: zod.string().min(1).max(50),
    lastname: zod.string().max(50),
    password: zod.string().min(8, 'Password must be min 8 characters long').
        max(50, 'password maximum can be 50 char long').
        regex(numberRegex, 'Make sure password has atleast one number')
});
export const loginUserSchema = zod.object({
    email: zod.string().email(),
    username: zod.string(),
    password: zod.string().min(8).max(50)
});
export const jwtTokenUserSchema = zod.object({
    email: zod.string().email(),
    userId: zod.number(),
    username: zod.string()
});
//# sourceMappingURL=typeDeclarations.js.map