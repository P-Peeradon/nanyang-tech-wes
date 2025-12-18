import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Course } from '../../../server/utility/course.ts'
import { Enrolment } from '../../../server/utility/enrolment.ts'

export const courseStore = defineStore('course', () => {
    const allCourses = ref<Course[]>([]); // Collect all courses taught at NTU.

    async function getAllCourses() {

        try {

            const response =  await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
            if (!response?.data || !Array.isArray(response.data)) {
                throw new Error("Invalid or empty data received from the API.");
            }

            allCourses.value = response.data.map(course =>
                new Course(course.cos_code, course.cos_title, course.cos_au)
            );

        } catch (err) {
            console.error(err);
        }
    }

    return { allCourses, getAllCourses };
});

export const enrolmentStore = defineStore('enrolment', () => {
    const myEnrolment = ref<Enrolment[]>([]); // Only the present semester.

    async function getMyEnrolment() {

        const token: string | null = localStorage.getItem('authToken');
        const NanyangID: string | null = localStorage.getItem('studentId');

        try {

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/students/${NanyangID}/enrolment`, {
                withCredentials: true, headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (!response?.data || !Array.isArray(response.data)) {
                throw new Error("Data does not exist.");
            }

            myEnrolment.value = response.data.map(enrol => {
                return new Enrolment(NanyangID ?? '', enrol.cos_code, enrol.enrol_year, enrol.enrol_semester)
            });

        } catch (err) {
            console.error(err);
        }

    }

    return { myEnrolment, getMyEnrolment };
})
