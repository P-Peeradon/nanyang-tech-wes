<template>
    <FullCalendar class="w-65 h-50 xl:w-80 xl:h-70" :options="calendarOptions" />
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarOptions: object = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
};
</script>

<style scoped>
:deep(.fc-toolbar-title) {
    font-size: 14px;
    font-weight: 500;
    color: blue;
}
:deep(.fc-button) {
    font-size: 12px;
}
:deep(.fc-col-header-cell) {
    font-size: 14px;
    font-weight: 500;
}
:deep(.fc-daygrid-day-number) {
    font-size: 13px;
    font-weight: 400;
}
:deep(.fc-daygrid-day) {
    /* Sets a minimum height to make the cell taller */
    height: 20px;
}
</style>
