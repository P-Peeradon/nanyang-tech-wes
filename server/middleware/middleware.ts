import type { Request, Response, NextFunction } from "express"
import { HttpError } from "../model/error.js";
import jwt from 'jsonwebtoken';
import type { JWTPayload } from "../nanyang.js";
import { DateTime } from 'luxon';

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload
        }
    }
}

function transformSqlTimes(obj: object | Array<any>, referenceDate: string = '1970-01-01'): any {
    const SQL_TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    
    // 1. Handle Null or non-objects immediately
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 2. DO NOT recurse into Date objects (Fixes the infinite loop)
    if (obj instanceof Date) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => transformSqlTimes(item, referenceDate));
    }

    const record = obj as Record<string, any>;
    
    for (const key in record) {
        if (!Object.prototype.hasOwnProperty.call(record, key)) continue;

        const value = record[key];

        if (typeof value === 'string' && SQL_TIME_REGEX.test(value)) {
            // Transform to UTC Date
            record[key] = DateTime.fromISO(`${referenceDate}T${value}`, { 
                zone: 'Asia/Singapore' 
            }).toJSDate();
        } 
        // 3. Only recurse if it's a plain object or array, NOT a Date
        else if (value !== null && typeof value === 'object' && !(value instanceof Date)) {
            record[key] = transformSqlTimes(value, referenceDate);
        }
    }

    return obj;

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

export const mysqlTimeHandler = (req: Request, res: Response, next: NextFunction) => {
    
    const originalJson =  res.json.bind(res);
    
    res.json = function (body) {
        // 1. Cleverly scan and transform the entire body
        const transformedBody = transformSqlTimes(body);

        // 2. Pass the modified body back to the original res.json
        return originalJson.call(this, transformedBody);
    };

    next();
}

export const sanitizeMySQLTime = (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        req.body = transformSqlTimes(req.body);
    }
    
    next();
}