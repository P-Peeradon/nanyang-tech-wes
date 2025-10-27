<script setup lang="ts">
import { RouterView } from 'vue-router';

import WebHeader from './components/WebHeader.vue';
import WebFooter from './components/WebFooter.vue';
</script>

<template>
    <WebHeader />

    <RouterView />
    <WebFooter />
</template>

<style scoped></style>
