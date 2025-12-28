import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Course } from '../../../server/utility/course.ts'
import { Offer, type IOffer } from "../../../server/utility/offer.ts";

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

    async function getAllOffers() {
        try {

            const response =  await axios.get(`${import.meta.env.VITE_API_URL}/api/offers`);
            if (!response?.data || !Array.isArray(response.data)) {
                throw new Error("Invalid or empty data received from the API.");
            }

            offers.value = response.data.map(offer =>
                new Offer(offer.cos_code, offer.off_section, offer.off_day, new Date(offer.off_start), new Date(offer.off_end), offer.off_capacity)
            )
        } catch (err) {
            console.error(err);
        }
    };

    function filterByCourse(courseCode: string): IOffer[] {
        return offers.value.filter((offer: IOffer) => {
            return offer.courseCode.toUpperCase() === courseCode.toUpperCase();
        })
    };

    return { offers, getAllOffers, filterByCourse };
});
