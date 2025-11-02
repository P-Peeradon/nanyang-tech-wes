<template>
    <div class="grid grid-cols-2 gap-3 xl:gap-10 justify-center">
        <MenuCard
            :category="'Personal Account'"
            :menus="['Profile Management', 'Add/Drop Course']"
        />
        <MenuCard :category="'Financial Service'" />
        <MenuCard :category="'Timetable'" :menus="['Timetable Planner']" />
        <MenuCard :category="'Student Service'" />
    </div>
</template>

<script setup lang="ts">
import MenuCard from '../components/MenuCard.vue';
</script>

<style></style>
