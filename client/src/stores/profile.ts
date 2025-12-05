import { defineStore } from "pinia";
import { ref } from "vue";
import type { Student } from '../../../utility/student.ts'
import axios from "axios";

export const studentStore = defineStore('student', () => {
    const studentData = ref<Student | null>(null);

    async function getStudentProfile() {

        const token: string | null = localStorage.getItem('authToken');
        const NanyangID: string | null = localStorage.getItem('studentId');



    }

    return {studentData, getStudentProfile};
})
