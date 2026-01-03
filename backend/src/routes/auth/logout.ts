import { Request, Response } from "express";

export async function logout(req: Request, res: Response) {
    res.clearCookie('Authorization', {path: '/',})
    res.send({ status:"success", message: 'Logged out successfully' });
}