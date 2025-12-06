<template>
    <div class="container">
        <form class="login-form" @submit.prevent="handleLogin">
        <h2 class="login-header">Login to Nanyang WES</h2>
        <p class="danger-text">{{ message }}</p>
        <div class="login-form-input">
            <label for="username">NTU Student ID/Email</label>
            <input type="text" v-model="username" />
        </div>
        <div class="login-form-input">
            <label for="username">Password</label>
            <input type="password" v-model="password" />
        </div>
        <div class="login-form-button">
            <button class="primary-button" type="submit">Login</button>
            <button class="secondary-button">Forgot Password</button>
        </div>
    </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { studentStore } from '../stores/profile';

interface LoginResponse {
    token: string;
    id: string;
    email: string;
}

interface ServerErrorResponse {
    name: string;
    message: string;
    errorCode: number;
}

const studentState = studentStore();
const router = useRouter();

const username = ref<string>('');
const password = ref<string>('');
const message = ref<string>('');

const handleLogin = async () => {
    try {
        const response = await axios.post(`${process.env.VITE_API_URL}/api/login`, {
            username: username.value,
            password: password.value
        });

        const data: LoginResponse = response?.data;
        const { token, id, email } = data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("studentId", id);
        localStorage.setItem("NTUeMail", email);

        await studentState.getStudentProfile();

        router.push('/');

    } catch (err) {
        // 1. Check if the error is an Axios error
        if (axios.isAxiosError(err)) {
            // 2. Check if the error has a response body (i.e., not a network error)
            const errorPayload = err.response?.data as ServerErrorResponse;
            if (errorPayload!) {
                // Now you can safely access properties:
                console.error(`Error Code: ${errorPayload.errorCode}`);
                console.error(`Error Message: ${errorPayload.message}`);

                // Set reactive property in your Vue component:
                message.value = errorPayload.message;
            }
        }

        // Handle network errors or other non-Axios errors
        message.value = 'A network error occurred or the server is unavailable.';
        return;
    }
}

</script>

<style scoped>
.container {
    width: 100vw;
    height: 65vh;
    display: flex;
    justify-content: center;
}
</style>
