<template>
    <div class="my-enrol">
        <h2 class="my-enrol-header">My Enrolment</h2>
        <div class="my-10"></div>
        <DataTable
            :value="displayedEnrolment"
            dataKey="courseCode"
            showGridlines
            table-style="min-width: 40px"
            :rows="5"
        >
            <Column field="courseCode" header="Course Code"></Column>
            <Column field="title" header="Title"></Column>
            <Column field="remark" header="Remark"></Column>
            <Column>
                <template #body="{ data }">
                    <button class="danger-button" @click.prevent="dropCourse(data)">
                        Drop
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { enrolmentStore, courseStore } from '../stores/stars';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import type { IEnrolment } from '../../../server/utility/enrolment';
import type { ICourse } from '../../../server/utility/course';

const enrolmentState = enrolmentStore();
const courseState = courseStore();

const displayedEnrolment = computed<object[]>(() => {
    return enrolmentState.myEnrolment.map((enrol: IEnrolment) => {
        // Course that match the code
        const course = courseState.allCourses.find((course: ICourse) => course.code === enrol.courseCode)

        return {
            ...enrol.toJSON(),
            ...course?.toJSON()
        };
    });
});

const dropCourse = async (code: string) => {
    alert("Delete: " + code);

    try {
        const token = localStorage.getItem('authToken');
        const id = localStorage.getItem('studentId');

        console.log("Before:", enrolmentState.myEnrolment.length);

        await axios.delete(`${import.meta.env.VITE_API_URL}/api/enrolment/${id}/${code}`, {
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

        // Delete that enrolment entry
        const targetIndex: number = enrolmentState.myEnrolment.findIndex(
            e => e.courseCode.trim() === code.trim()
        );

        if (targetIndex !== -1) {
            // In-place mutation
            enrolmentState.myEnrolment.splice(targetIndex, 1);
        } else {
            console.warn("Cannot find code in state");
        }

    } catch (err) {
        console.error(err);
    }
};

onMounted(async () => {
    await enrolmentState.getMyEnrolment();
});

onBeforeUnmount(() => {
    enrolmentState.myEnrolment = [];
});
</script>

<style>

</style>
