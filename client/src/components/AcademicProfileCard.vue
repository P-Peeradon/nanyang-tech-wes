<template>
    <div class="academic-card">
        <h3 class="academic-card-header">{{ props.header }}</h3>
    </div>
</template>

<script setup lang="ts">
interface academicProfileProps {
    header: string;
}

const props = defineProps<academicProfileProps>();
</script>

<style></style>
