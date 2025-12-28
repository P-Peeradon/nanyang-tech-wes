import { defineStore } from "pinia";
import { ref } from "vue";
import { Student } from '../../../server/utility/student.ts'
import { Offer } from '../../../server/utility/offer.ts'
import { Enrolment, type IEnrolment } from '../../../server/utility/enrolment.ts'
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

    async function clearStudentMemory() {
        studentData.value = null;
    }

    return {studentData, getStudentProfile, clearStudentMemory};
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

    function addEnrolment(newEnrolment: Enrolment) {
        myEnrolment.value.push(newEnrolment);
    }

    function removeEnrolment(code: string) {
        myEnrolment.value = myEnrolment.value.filter((enrol: IEnrolment) => enrol.courseCode !== code);
    }

    function clearEnrolment() {
        myEnrolment.value = []
    }

    return { myEnrolment, getMyEnrolment, addEnrolment, removeEnrolment, clearEnrolment };
});

export const timetableStore = defineStore('timetable', () => {
    const selectedOffers = ref<Offer[]>();

    async function getSelectedOffer() {
        //pass
    }

    async function changeSection(courseCode: string, newSection: number) {
        // pass
    }

    return { selectedOffers, getSelectedOffer, changeSection }
});
