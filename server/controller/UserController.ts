import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../model/error.js";
import pool from "../db/database.js";
import type { StudentProfile } from "../nanyang.js";

// Get a specific user data
// POST /user/:userId
// Protected
export const getUser = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const { userId } = req.params;
        const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]$/;

        if (!nanyangStudentId.test(userId!)) {
            return next(new HttpError("Student ID format is invalid. It must match the pattern U/PxxxxxxxX (e.g., U1234567A).", 400));
        }

        const query: string = "SELECT stu_id, stu_fname, stu_lname, stu_program FROM student WHERE stu_id = ?";
        const [rows, _field] = await pool.execute<StudentProfile[]>(query, [userId]);
        if (rows.length === 0) {
            return next(new HttpError('Student not found', 404));
        }
        const studentData = rows[0];
        res.status(200).json(studentData);
    } catch (err: any) {
        return next(new HttpError(err?.message || "An unknown error occurred", 500));
    }

};