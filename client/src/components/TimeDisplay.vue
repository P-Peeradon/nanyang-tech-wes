<template>
    <div class="w-auto h-6">
        <p class="text-end text-lg text-imperial-400 underline underline-offset-2">{{ timeState.currentTime }}</p>
    </div>
</template>

<script setup lang="ts">
import { timeStore } from '../stores/direction';

const timeState = timeStore();
</script>

<style scoped></style>
