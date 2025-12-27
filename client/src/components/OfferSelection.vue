<template>
    <form>
        <!-- For selecting the course that wish to add the index, and submit value -->
        <select v-model="code" name="course" id="code">
            <option value="">Course</option>
        </select>
    </form>
</template>

<script lang="ts" setup>
import { enrolmentStore } from '@/stores/profile';
import { onBeforeUnmount, onMounted, ref } from 'vue';

// All subject that the student enrols (after confirmation).
// User select timetable -> offer.
// `code - title`

const enrolmentState = enrolmentStore();

const code = ref('');

onMounted(async () => {
    enrolmentState.getMyEnrolment();
});

onBeforeUnmount(() => {
    enrolmentState.myEnrolment = [];
})
</script>


<style scoped></style>
