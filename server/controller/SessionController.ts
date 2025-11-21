import type { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import { HttpError } from "../model/error.ts";
import type { Feature, Credential } from "../nanyang.ts";
import pool from "../db/database.ts";
const bcrypt = require('bcryptjs');

// Handle Login User
// POST /login
// Unprotected
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const nanyangStudentEmail: RegExp = /^[a-z]{4}\.[0-9]{7}@student.ntu.edu.sg$/;
        const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]$/;
        

        if (!username || !password) {
            return next(new HttpError("Please enter username and password", 404));
        }
        let query: string;
        let student: object;
        
        if (username.test(nanyangStudentEmail)) {
            query = 'SELECT std_id, std_email, std_password FROM student WHERE std_email = ?';
            const [rows, _field] = await pool.execute<Credential[]>(query, [username]);
            student = rows[0] ?? {};
        } else if (username.test(nanyangStudentId)) {
            query = 'SELECT std_id, std_email, std_password FROM student WHERE std_id = ?';
            const [rows, _field]  = await pool.execute<Credential[]>(query, [username]);
            student = rows[0] ?? {};
        } else {
            return next(new HttpError("You must use either NTU Student ID or Email to log in.", 404));
        }        

        if (!student) {
            return next(new HttpError("Invalid Credential", 422));
        }

        const comparedPassword = await bcrypt.compare(password, student?.password);
        if (!comparedPassword) {
            return next(new HttpError("Invalid Credential", 422));
        }

        const token = await jwt.sign({ 
            id: student?.std_id, 
            role: 'student', 
            email: student?.std_email }, 
            process.env.JWT_SECRET_KEY, { 
                expiredIn: '3h'
            });
        res.status(200).json({ token, id: student?.std_id, email: student?.std_email });
    } catch (err) {
        console.log(err)
    }
};

// Get all features in the app.
// GET /features
// Unprotected
const fetchFeatures = async (req: Request, res: Response, next: NextFunction) => {
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
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, studentId, program, yearOfStudy, password } = req.body;
        const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]$/;

        if (!firstName || !lastName || !studentId || !program || !yearOfStudy || !password) {
            return next(new HttpError("Invalid. Please input your name, student ID, program, year of study and password", 422));
        }

        if (studentId.test(nanyangStudentId)) {
            return next(new HttpError("Student ID should be either of these format: U0000000X for Undergraduate and P0000000X for Postgraduate.", 422));
        }

        const email = `${firstName[0]?.toLowerCase()}${lastName?.substring(0,3).toLowerCase()}.${studentId?.substring(1,7)}@student.ntu.edu.sg`;
    
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        const query: string = `INSERT INTO student (std_id, std_fname, std_lname, std_email, std_program, std_yearOfStudy, std_password)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`
        await pool.execute(query, [studentId, firstName, lastName, email, program, new Date().getFullYear(), hashedPassword]);

        const newUser = { firstName: firstName, lastName: lastName, studentId: studentId, program: program, yearOfStudy: yearOfStudy};
        res.status(201).json(newUser);
    } catch (err: any) {
        return next(new HttpError(err?.message));
    }

};

export default { loginUser, fetchFeatures, registerUser };