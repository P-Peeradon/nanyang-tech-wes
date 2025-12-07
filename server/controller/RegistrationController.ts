import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../model/error.js";
import pool from "../db/database.js";
import type { CourseProfile, MyEnrolmentProfile } from "../nanyang.js";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

// Get all courses taught at Nanyang
// GET /courses
// Unprotected
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const query: string = "SELECT cos_code, cos_title, cos_au FROM course;"
        const [rows, _field] = await pool.execute<CourseProfile[]>(query);

        return res.status(200).json(rows);
    } catch (err: any) {
        return next(new HttpError(err));
    }
}

// Get all courses taught at Nanyang
// GET /courses/:code
// Unprotected
export const getCourse = async (req: Request, res: Response, next: NextFunction) => {

    const { code } = req.params;

    try {   
        const query: string = "SELECT cos_code, cos_title, cos_au FROM course WHERE cos_code = ?;"
        const [rows, _field] = await pool.execute<CourseProfile[]>(query, [code]);

        return res.status(200).json(rows[0]);
    } catch (err: any) {
        return next(new HttpError(err));
    }
}

// Get all enrolment entries made my that student
// GET /students/:id/enrolment
// Protected
export const getStudentEnrolments = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const user: object  = (req as any).user ?? {};

        if (!user) {
            return next(new HttpError("Unauthorised access to student's enrolment data", 401));
        }

        // If match, get the student data
        const query = 'SELECT cos_code, enrol_semester, enrol_year, enrol_remark FROM enrolment WHERE std_id = ?';
        const [rows, _field] = await pool.execute<MyEnrolmentProfile[]>(query, [id]);

        res.status(200).json(rows);
    } catch (err: any) {
        if (err instanceof TokenExpiredError) {
            return next(new HttpError("Your session is expired", 403));
        }
        else if (err instanceof JsonWebTokenError) {
            return next(new HttpError("Your token is invalid", 401));
        }

        return next(new HttpError(err));
    }
}

// Create new enrolment for a student in NTU
// POST /enrolment
// Protected
export const createEnrolment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, courseCode } = req.body;
        const user: object = (req as any).user ?? {};

        if (!user) {
            return next(new HttpError('You are unauthorised to add enrolment data.', 401))
        }

        if (!studentId || !courseCode) {
            return next(new HttpError('Please enter your student ID and course code', 400));
        }

        /*
        if (user.id !== studentId) {
            return next(new HttpError('You cannot enrol courses on behalf of other student', 403));
        }
        */

        // Add to enrolment table.
        const query: string = 'INSERT INTO enrolment (std_id, cos_code, enrol_year, enrol_semester) VALUES (?, ?, ?, ?)'
        await pool.execute(query, [studentId, courseCode, 2025, 1]);
        await pool.commit();

        // But send 202 as the status is not approved.
        return res.status(202).json({
            studentId, 
            courseCode, 
            year: 2025,
            semester: 1,
        });
    } catch (err: any) {
        return next(new HttpError(err));
    }
}

// Create new enrolment for a student in NTU
// DELETE /enrolment
// Protected
export const deleteEnrolment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, courseCode } = req.body;
        const user: object = (req as any).user ?? {};

        if (!user) {
            return next(new HttpError('You are unauthorised to delete enrolment data.', 401))
        }

        if (!studentId || !courseCode) {
            return next(new HttpError('Please enter your student ID and course code', 400));
        }

        /*
        if (user.id !== studentId) {
            return next(new HttpError('You cannot enrol courses on behalf of other student', 403));
        }
        */

        // Add to enrolment table.
        const query: string = 'DELETE FROM enrolment WHERE std_id = ? AND cos_code = ?'
        await pool.execute(query, [studentId, courseCode]);
        await pool.commit();

        // But send 204 as we do not need any data, but if successful, that data must be wiped out from the state.
        return res.status(204)
    } catch (err: any) {
        return next(new HttpError(err));
    }
}