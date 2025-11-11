<template>
    <div class="w-full h-auto px-2">
        <div class="flex flex-row gap-10">
            <ProfileCard :name="'Stu1'" :program="'Bachelor of X'" :id="'NTU00000'" />
            <EventCalendar />
        </div>
        <br />
        <AcademicProfileCard />
    </div>
</template>

<script setup lang="ts">
import ProfileCard from '../components/ProfileCard.vue';
import AcademicProfileCard from '../components/AcademicProfileCard.vue';
import EventCalendar from '../components/EventCalendar.vue';
</script>

<style></style>
