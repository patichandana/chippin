import express from 'express';
// This is required to extend the Express Request interface
// to include the 'user' property we are adding to the request in our middleware
// instead of taking the userId from req.body, we are adding a user object to request
// which contains the userId as a bigint
declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                userId: bigint;
            };
        }
    }
}