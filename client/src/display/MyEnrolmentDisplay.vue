<template>
    <div class="my-enrol">
        <h2 class="my-enrol-header">My Enrolment</h2>
        <div class="my-10"></div>
        <DataTable
            :value="displayEnrolment"
            showGridlines
            table-style="min-width: 50px"
            :rows="5"
        >
            <Column field="courseCode" header="Course Code"></Column>
            <Column field="remark" header="Remark"></Column>
            <Column>
                <template #body="{ data }">
                    <Button @click="dropCourse(data.code)">
                        Add Course
                    </Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { enrolmentStore } from '../stores/stars';
import axios from 'axios';
import DataTable from 'primevue/datatable';
import { computed, onMounted } from 'vue';

const enrolmentState = enrolmentStore();
const displayEnrolment = computed<object[]>(() => {
    return enrolmentState.myEnrolment.map()
});

const dropCourse = async (code) => {
    await axios.delete();
}

onMounted(async () => {
    await enrolmentState.getMyEnrolment();
})
</script>

<style>

</style>
