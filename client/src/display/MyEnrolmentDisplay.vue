<template>
    <div class="my-enrol">
        <h2 class="my-enrol-header">My Enrolment</h2>
        <div class="my-10"></div>
        <DataTable
            :value="displayedEnrolment"
            showGridlines
            table-style="min-width: 50px"
            :rows="5"
        >
            <Column field="courseCode" header="Course Code"></Column>
            <Column field="title" header="Title"></Column>
            <Column field="remark" header="Remark"></Column>
            <Column>
                <template #body="{ data }">
                    <button class="danger-button" @click.prevent="dropCourse(data.courseCode)">
                        Drop
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { enrolmentStore } from '../stores/stars';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import type { IEnrolment } from '../../../server/utility/enrolment';
import type { ICourse } from '../../../server/utility/course';

const enrolmentState = enrolmentStore();
const enrols = computed<object[]>(() => {
    return enrolmentState.myEnrolment.map((enrolment: IEnrolment) => {
        return enrolment.toJSON();
    });
});
const classes = computed<object[]>(() => {
    return enrolmentState.coursesData.map((course: ICourse) => {
        return course.toJSON();
    });
});

const displayedEnrolment = computed<object[]>(() => {
    if (enrols.value.length !== classes.value.length) {
        // Handle error or return an empty array if lengths don't match
        console.error("The 'enrols' and 'classes' arrays have different lengths.");
        return [];
    }

    return enrols.value.map((enrolmentObject: object, index: number) => {
        const classObject = classes.value[index];

        // 1. Using the spread syntax (...) to merge properties
        // This creates a new object containing all properties from both objects.
        return {
            ...enrolmentObject,
            ...classObject
        };
    });
});

const dropCourse = async (code: string) => {
    try {
        const token = localStorage.getItem('authToken');
        const id = localStorage.getItem('studentId');

        await axios.delete(`${import.meta.env.VITE_API_URL}/api/enrolment/${id}/${code}`, {
            withCredentials: true, headers: {
                authorization: `Bearer ${token}`
            }
        });

        // Delete that enrolment entry
        enrolmentState.myEnrolment.filter((enrolment: IEnrolment) => {
            return enrolment.courseCode !== code;
        });

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
