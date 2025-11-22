import type { RowDataPacket } from 'mysql2/promise.js';
import type { Request } from 'express';

// Define the shape of your expected query results for better type safety
export interface FeatureRoute extends RowDataPacket {
    ft_name: string;
    ft_view: string;
};

export interface Credential extends RowDataPacket {
    std_id: string;
    std_email: string;
    std_password: string;
};

export interface AuthenticatedRequest extends Request {
    user?: any;
}