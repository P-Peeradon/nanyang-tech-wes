import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Course, type ICourse } from '../../../utility/course.ts'
import { Enrolment } from '../../../utility/enrolment.ts'

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

    function resolveCourse(courseCode: string): ICourse {

        const returnedCourse: ICourse = allCourses.value.find((course) => {
            return course.code === courseCode;
        }) ?? new Course('XX0000', 'Unknown', 0);

        return returnedCourse;
    }

    return { allCourses, getAllCourses, resolveCourse };
});

export const enrolmentStore = defineStore('enrolment', () => {
    const courseState = courseStore();

    const myEnrolment = ref<Enrolment[]>([]); // Only the present semester.
    const coursesData = computed<ICourse[]>(() => {
        return myEnrolment.value.map((enrol) => courseState.resolveCourse(enrol.courseCode));
    });

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

    return { myEnrolment, coursesData, getMyEnrolment };
})
