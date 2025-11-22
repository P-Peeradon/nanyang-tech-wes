<template>
    <div>
        <WebHeader />
        <slot />
        <WebFooter />
    </div>
</template>

<script setup lang="ts">
import WebHeader from '../components/WebHeader.vue';
import WebFooter from '../components/WebFooter.vue';
</script>

<style scoped>

</style>
