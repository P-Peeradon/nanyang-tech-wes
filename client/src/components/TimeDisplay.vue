<template>
    <div class="w-auto h-6">
        <p class="text-end text-lg pe-5 font-bold text-fuchsia-900 underline underline-offset-2">{{ timeState.timeZoneTime }}</p>
    </div>
</template>

<script setup lang="ts">
import { timeStore } from '../stores/direction';

const timeState = timeStore();
</script>

<style scoped></style>
