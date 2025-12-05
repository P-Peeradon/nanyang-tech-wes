// Define the shape of your expected query results for better type safety
export interface FeatureRoute{
    ft_name: string;
    ft_view: string;
};

// Student DTO
export interface StudentProfile{
    std_id: string;
    std_fname: string;
    std_lname: string;
    std_program: string;
};

// Course DTO
export interface CourseProfile {
    cos_code: string;
    cos_title: string;
    cos_au: number;
}

// Enrolment DTO
export interface MyEnrolmentProfile {
    cos_code: string;
    enrol_semester: number;
    enrol_year: number;
    enrol_remark?: string | null;
}
