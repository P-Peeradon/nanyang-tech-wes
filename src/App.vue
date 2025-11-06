<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { routeStore } from './stores/direction';

import WebHeader from './components/WebHeader.vue';
import WebFooter from './components/WebFooter.vue';

const routeState = routeStore();

// When the app is mounted, fetch all functions.
onMounted(() => {
    routeState.getAllRoutes();
});
</script>

<template>
    <WebHeader />

    <RouterView />
    <WebFooter />
</template>

<style scoped></style>
