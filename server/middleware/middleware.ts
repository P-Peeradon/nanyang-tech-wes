import type { Request, Response, NextFunction } from "express"
import { HttpError } from "../model/error.js";
import jwt from 'jsonwebtoken';
import type { JWTPayload } from "../nanyang.js";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = (req.headers.authorization);
    if (!authHeader) {
        return next(new HttpError("Unauthorised: No token provided.", 401))
    }
    
    if (!authHeader.startsWith("Bearer ")) {
        return next(new HttpError("Unauthorised, Token is not in 'Bearer <token>' format.", 401));
    }

    const token: string | undefined = authHeader?.split(' ')[1];
    if (!token) {
        return next(new HttpError("Unauthorized: Token is missing after 'Bearer '.", 401));
    }
    
    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, info: any) => {
        if (err) {
            return next(new HttpError('Forbidden: Token invalid or expired.', 403));
        }

        req.user = (info as JWTPayload);
    });

    next();
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = error instanceof HttpError ? error.errorCode : 500;
    const message: string = error.message || 'An unknown error occurred on the server.';

    if (statusCode === 500) {
        console.error(error.stack);
    }

    res.status(statusCode).json({ name: error.name || "ServerError", message: message });
}
