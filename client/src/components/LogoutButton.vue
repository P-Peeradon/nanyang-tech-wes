<template>
    <button class="danger-button" @click="handleLogout">Logout</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('NTUeMail');
    localStorage.removeItem('studentId');

    router.push('/login');
};
</script>

<style></style>
