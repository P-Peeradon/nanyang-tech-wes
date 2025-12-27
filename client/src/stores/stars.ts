import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Course } from '../../../server/utility/course.ts'
import { Offer } from "../../../server/utility/offer.ts";

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

// All offer in Nanyang
export const offerStore = defineStore('offer', () => {
    const offers = ref<Offer[]>([]);
});
