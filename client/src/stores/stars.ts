import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Course } from '../../../utility/course.ts'
import type { CourseProfile } from "../../../server/nanyang.ts";

export const courseStore = defineStore('course', () => {
    const allCourses = ref<Array<Course>>([]); // Collect all courses taught at NTU.

    async function getAllCourses() {
        try {
            const response =  await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
            if (!response?.data) {
                throw new Error("Data does not exist.");
            }

            allCourses.value = response?.data.map((course: CourseProfile) =>
                new Course(course?.cos_code, course?.cos_title, course?.cos_au)
            );

        } catch (err) {
            console.error(err);
        }
    }

    return { allCourses, getAllCourses }
})
