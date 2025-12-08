<template>
    <div class="w-full h-auto px-2">
        <div class="flex flex-row gap-10">
            <ProfileCard :name="studentState.studentData?.fullName ?? ''" :program="studentState.studentData?.program ?? ''" :id="studentState.studentData?.studentId ?? NanyangID" />
            <EventCalendar />
        </div>
        <br />
        <div class="grid grid-cols-3 gap-6">
            <AcademicProfileCard :header="'Norn'"/>
            <AcademicProfileCard :header="'Norn'"/>
            <AcademicProfileCard :header="'Norn'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProfileCard from '../components/ProfileCard.vue';
import AcademicProfileCard from '../components/AcademicProfileCard.vue';
import EventCalendar from '../components/EventCalendar.vue';
import { studentStore } from '../stores/profile';

const studentState = studentStore();
const NanyangID: string = localStorage.getItem('studentId') ?? '';
</script>

<style></style>
