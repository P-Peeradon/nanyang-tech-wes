import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../model/error.js";
import pool from "../db/database.js";
import type { CourseProfile } from "../nanyang.js";


// Get all courses taught at Nanyang
// POST /login
// Unprotected
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const query1: string = "SELECT cos_code, cos_title, cos_au FROM course;"
        const [rows, _field] = await pool.execute<CourseProfile[]>(query1);

        return res.status(200).json(rows);
    } catch (err: any) {
        return next(new HttpError(err));
    }
}