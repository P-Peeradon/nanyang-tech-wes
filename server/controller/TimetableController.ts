import type { Request, Response, NextFunction } from "express";
import pool from "../db/database.js";
import { HttpError } from "../model/error.js";
import { type OfferProfile } from "../nanyang.js";

// Fetch all offers.
// GET /offer
// Unprotected
export const getOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const query: string = "SELECT cos_code, off_day, off_section, off_start, off_end, off_capacity FROM offer;"
        const [rows, _field] = await pool.execute<OfferProfile[]>(query);

        return res.status(200).json(rows);
    } catch (err: any) {
        return next(new HttpError(err));
    }
}