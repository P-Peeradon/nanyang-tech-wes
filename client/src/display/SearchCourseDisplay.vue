<template>
    <form>
        <h2 class="course-header">Search Course</h2>
        <div class="course-search-bar">
            <div class="course-input">
                <label for="code">By Course Code</label>
                <input type="text" name="code" id="code" v-model="code" />
            </div>

            <div class="course-input">
                <label for="code">By Course Title</label>
                <input type="text" name="code" id="code" v-model="title" />
            </div>
        </div>

        <DataTable
            :value="courses"
            showGridlines
            table-style="min-width: 40px"
            paginator
            :rows="10"
            :rowsPerPageOptions="[10, 20, 40, 60]"
        >
            <Column field="code" header="Course Code"></Column>
            <Column field="title" header="Course Title"></Column>
            <Column field="au" header="AUs"></Column>
            <Column>
                <template #body="{ data }">
                    <button class="primary-button" @click.prevent="enrolInCourse(data.code)">
                        Enrol
                    </button>
                </template>
            </Column>
        </DataTable>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { courseStore, enrolmentStore } from '../stores/stars';
import axios from 'axios';
import { type ICourse } from '../../../server/utility/course';
import { Enrolment } from '../../../server/utility/enrolment';

const courseState = courseStore();
const enrolmentState = enrolmentStore();

const code = ref<string>('');
const title = ref<string>('');
const courses = computed<ICourse[]>(() => {
    const allCourses = courseState?.allCourses ?? [];

    return allCourses.filter((course: ICourse) => {
        if (!course) return false;

        const matchesCode: boolean = course.code.startsWith(code.value.toUpperCase());
        const matchesTitle: boolean = course.title.toLowerCase().includes(title.value.toLowerCase());

        return matchesCode && matchesTitle;
    })
});

const enrolInCourse = async (code: string) => {
    const NTUid = localStorage.getItem('studentId');
    const token = localStorage.getItem('authToken');

    // Use API to create enrolment.
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enrolment`, {
            studentId: NTUid,
            courseCode: code,
        },{
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

        const { data } = response;

        enrolmentState.myEnrolment.push(new Enrolment(data.studentId, data.courseCode, data.year, data.semester));

    } catch (err) {
        console.error(err);
    }
}

</script>

<style>

</style>
