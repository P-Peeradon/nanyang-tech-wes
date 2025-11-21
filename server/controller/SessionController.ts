import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { HttpError } from "../model/error.ts";
import type { Feature, Credential } from "../nanyang.ts";
import pool from "../services/db/database.ts";

// Handle Login User
// POST /login
// Unprotected
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const nanyangStudentEmail: RegExp = /^[a-z]{4}\.[0-9]{7}@student.ntu.edu.sg/;
        const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]/;
        

        if (!username || !password) {
            return next(new HttpError("Please enter username and password", 404));
        }
        

        
    } catch (err) {
        console.log(err)
    }
};

const fetchFeatures = async (req: Request, res: Response, next: NextFunction) => {
    const q: string = 'SELECT ft_name, ft_view FROM feature';
    try {
        const [rows, _fields] = await pool.query<Feature[]>(q);

        res.status(200).send(rows);
    } catch (error) {
        console.error('Error fetching features:', error);
        res.status(500).send('Database query failed');
    }
}

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        console.log(err);
    }
};

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        console.log(err);
    }
};

export default {loginUser, getCurrentUser, fetchFeatures, logoutUser};