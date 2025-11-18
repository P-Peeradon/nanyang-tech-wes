<template>
    <div class="flex flex-row h-15 items-center">
        <div class="w-5/6">
            <h1>{{ props.title }}</h1>
        </div>
        <div class="w-1/6 flex justify-center">
            <LogoutButton />
        </div>
    </div>
</template>

<script setup lang="ts">
import LogoutButton from './LogoutButton.vue';

interface titleProps {
    title: string;
}

const props = defineProps<titleProps>();
</script>

<style scoped></style>
