import type { RowDataPacket } from 'mysql2/promise.js';

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

// Student DTO
export interface StudentProfile extends RowDataPacket {
    std_id: string;
    std_fname: string;
    std_lname: string;
    std_program: string;
    std_yearOfStudy: number;
};

// Course DTO
export interface CourseProfile extends RowDataPacket {
    cos_code: string;
    cos_title: string;
    cos_au: number;
}

// Enrolment DTO
export interface MyEnrolmentProfile extends RowDataPacket {
    cos_code: string;
    enrol_semester: number;
    enrol_year: number;
    enrol_remark?: string | null;
}

/* 
{ 
    id: student?.std_id, 
    role: 'student', 
    email: student?.std_email 
}
*/
export interface JWTPayload {
    id: string;
    email: string;
    role: 'student' | 'admin' | 'staff'
}

export interface OfferProfile extends RowDataPacket {
    cos_code: string, 
    off_day: string, 
    off_section: number, 
    off_start: string, 
    off_end: string,
    off_capacity: number
}