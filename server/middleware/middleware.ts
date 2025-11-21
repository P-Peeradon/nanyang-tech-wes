import type { Request, Response, NextFunction } from "express"
import { HttpError } from "../model/error.ts";
import jwt from 'jsonwebtoken';
import "dotenv";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string = req.headers.Authorization || req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
        const token: string = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, info) => {
            if (err) {
                return next(new HttpError('Token invalid', 403));
            }

            (req as any).user = info;
            next();
    });
    } else {
        return next(new HttpError("Unauthorised, no token.", 401));
    }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error)
    }

    res.status(error.code ?? 500).json({ message: error.message ?? "An unknown error occurred."});
}