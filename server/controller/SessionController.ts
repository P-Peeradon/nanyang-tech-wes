import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { HttpError } from "../model/error.ts";
import type { Feature, Credential } from "../nanyang.ts";
import pool from "../db/database.ts";
const bcrypt = require('bcryptjs');

// Handle Login User
// POST /login
// Unprotected
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const nanyangStudentEmail: RegExp = /^[a-z]{4}\.[0-9]{7}@student.ntu.edu.sg$/;
        const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]$/;
        

        if (!username || !password) {
            return next(new HttpError("Please enter username and password", 404));
        }
        let query: string;
        let student: Credential | undefined;
        
        if (nanyangStudentEmail.test(username)) {
            query = 'SELECT std_id, std_email, std_password FROM student WHERE std_email = ?';
            const [rows, _field] = await pool.execute<Credential[]>(query, [username]);
            student = rows[0];
        } else if (nanyangStudentId.test(username)) {
            query = 'SELECT std_id, std_email, std_password FROM student WHERE std_id = ?';
            const [rows, _field]  = await pool.execute<Credential[]>(query, [username]);
            student = rows[0];
        } else {
            // 400 Bad Request for incorrect input format.
            return next(new HttpError("You must use either NTU Student ID or Email to log in.", 400));
        }        

        if (!student) {
            return next(new HttpError("Invalid Credential", 401));
        }

        const comparedPassword = await bcrypt.compare(password, student?.password);
        if (!comparedPassword) {
            return next(new HttpError("Invalid Credential", 401));
        }

        const token = await jwt.sign({ 
            id: student?.std_id, 
            role: 'student', 
            email: student?.std_email }, 
            process.env.JWT_SECRET_KEY!, { 
                expiresIn: '3h'
            });
        res.status(200).json({ token, id: student?.std_id, email: student?.std_email });
    } catch (err: any) {
        return next(new HttpError(err?.message ?? "Login failed due to a server error.", 500));
    }
};

// Get all features in the app.
// GET /features
// Unprotected
export const fetchFeatures = async (req: Request, res: Response, next: NextFunction) => {
    const q: string = 'SELECT ft_name, ft_view FROM feature';
    try {
        const [rows, _fields] = await pool.query<Feature[]>(q);

        res.status(200).send(rows);
    } catch (err: any) {
        return next(new HttpError(err?.message ?? 'Error in fetching features', 500));
    }
};

// Handle Register User
// POST /register
// Unprotected
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, studentId, program, yearOfStudy, password } = req.body;
        const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]$/;

        if (!firstName || !lastName || !studentId || !program || !yearOfStudy || !password) {
            return next(new HttpError("Please ensure all fields (Name, Student ID, Program, Year of Study, Password) are completed.", 400));
        }

        if (!nanyangStudentId.test(studentId)) {
            return next(new HttpError("Student ID format is invalid. It must match the pattern U/PxxxxxxxX (e.g., U1234567A).", 400));
        }

        // Generate Nanyang Email.
        const idDigits: string = String(studentId).substring(1, 8); // Get the 7 digits (index 1 to 7)
        const emailFirstNamePart: string = String(firstName)[0]?.toLowerCase() ?? ''; // Get first initial
        const emailLastNamePart: string = String(lastName)?.substring(0, 3).toLowerCase() ?? ''; // Get first 3 of last name
        const email: string = `${emailFirstNamePart}${emailLastNamePart}.${idDigits}@student.ntu.edu.sg`;
    
        // Check Existing user.
        const [existingUserRows] = await pool.execute(
            'SELECT std_id FROM student WHERE std_id = ? OR std_email = ?',
            [studentId, email]
        );
        
        if (Array.isArray(existingUserRows) && existingUserRows.length > 0) {
            // If data exist in database, call 409.
            return next(new HttpError('A user with this Student ID or generated Email already exists.', 409)); // 409 Conflict
        }
        
        // Insertion to Database
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        const query: string = `INSERT INTO student (std_id, std_fname, std_lname, std_email, std_program, std_yearOfStudy, std_password)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`
        await pool.execute(query, [studentId, firstName, lastName, email, program, yearOfStudy ?? 1, hashedPassword]);

        const newUser = { firstName: firstName, lastName: lastName, studentId: studentId, program: program, yearOfStudy: yearOfStudy};
        res.status(201).json(newUser);
    } catch (err: any) {
        return next(new HttpError(err?.message));
    }

};