<template>
    <WebHeader />
    <main class="bg-imperial-800">
        <slot />
    </main>
    <WebFooter />
</template>

<script setup lang="ts">
import WebHeader from '../components/WebHeader.vue';
import WebFooter from '../components/WebFooter.vue';
</script>

<style scoped>

</style>
