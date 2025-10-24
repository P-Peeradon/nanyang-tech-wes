<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalNav from './components/VerticalNav.vue';
import WebHeader from './components/WebHeader.vue';
</script>

<template>
    <WebHeader />
    <main class="flex flex-row">
        <VerticalNav />
        <RouterView />
    </main>
</template>

<style scoped></style>
