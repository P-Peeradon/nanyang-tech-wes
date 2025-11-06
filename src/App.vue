<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';

import WebHeader from './components/WebHeader.vue';
import WebFooter from './components/WebFooter.vue';

// When the app is mounted, fetch all functions.
onMounted(() => {});
</script>

<template>
    <WebHeader />

    <RouterView />
    <WebFooter />
</template>

<style scoped></style>
