import type { RowDataPacket } from 'mysql2/promise';

// Define the shape of your expected query results for better type safety
export interface Feature extends RowDataPacket {
    ft_name: string;
    ft_view: string;
};

export interface Credential extends RowDataPacket {
    std_id: string;
    std_email: string;
    std_password: string;
};