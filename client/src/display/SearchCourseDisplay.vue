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
            table-style="min-width: 50px"
            paginator
            :rows="10"
            :rowsPerPageOptions="[10, 20, 40, 60]"
        >
            <Column field="code" header="Course Code"></Column>
            <Column field="title" header="Course Title"></Column>
            <Column field="au" header="Academic Unit"></Column>
            <Column>
                <template #body="{ data }">
                    <Button @click="enrolInCourse(data.code)">
                        Add Course
                    </Button>
                </template>
            </Column>
        </DataTable>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { courseStore } from '../stores/stars';
import axios from 'axios';
import { Course } from '../../../utility/course';

const token: string = localStorage.getItem('authToken') ?? '';

const code = ref<string>('');
const title = ref<string>('');
const courses = computed(() => {
    return courseState?.allCourses.filter((course: Course) => {
        const matchesCode = course?.code.startsWith(code.value.toUpperCase());
        const matchesTitle = course?.title.toLowerCase().includes(title.value.toLowerCase());

        return matchesCode && matchesTitle;
    })
});

const courseState = courseStore();

const enrolInCourse = async (code: string) => {
    // Use API to create enrolment.
    try {
        const response = await axios.post(`${process.env.VITE_API_URL}/api/enrolment`, {
            courseCode: code,
        },{
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

    } catch (err) {
        console.error(err);
    }
}

</script>

<style>

</style>
