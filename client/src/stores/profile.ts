import { defineStore } from "pinia";
import { ref } from "vue";
import { Student } from '../../../server/utility/student.ts'
import axios from "axios";

export const studentStore = defineStore('student', () => {
    const studentData = ref<Student | null>(null);

    async function getStudentProfile() {

        const token: string | null = localStorage.getItem('authToken');
        const NanyangID: string | null = localStorage.getItem('studentId');

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/students/${NanyangID}`, {
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

        const { std_id, std_fname, std_lname, std_program, std_yearOfStudy } = response.data;

        studentData.value = new Student(std_id, std_fname, std_lname, std_program, std_yearOfStudy);

    }

    return {studentData, getStudentProfile};
})
