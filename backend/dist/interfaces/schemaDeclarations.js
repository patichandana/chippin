import { z as zod } from 'zod';
const numberRegex = new RegExp("[0-9]");
const capitalLetterRegex = new RegExp("[A-Z]");
const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const specialCharRegex = new RegExp(`[${specialCharacters.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&')}]`);
export const signupUserSchema = zod.object({
    email: zod.string().email(),
    username: zod.string().min(5).max(50),
    firstname: zod.string().min(1).max(50),
    lastname: zod.string().max(50).optional(),
    password: zod.string().min(8, 'Password must be min 8 characters long').
        max(50, 'password maximum can be 50 char long').
        regex(numberRegex, 'Make sure password has atleast one number').
        regex(capitalLetterRegex, 'Make sure password has atleast one capital letter').
        regex(specialCharRegex, 'Make sure there\'s alteast one special character')
});
export const loginUserSchema = zod.object({
    email: zod.string().email(),
    username: zod.string().optional(),
    password: zod.string().optional()
}).refine(data => !!data.email || !!data.username, 'either username or email must be provided');
export const jwtTokenUserSchema = zod.object({
    email: zod.string().email(),
    userId: zod.number(),
    username: zod.string()
});
//# sourceMappingURL=schemaDeclarations.js.map