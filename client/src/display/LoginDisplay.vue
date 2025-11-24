<template>
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
            <button type="submit">Login</button>
            <button>Forgot Password</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

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

const username: Ref<string> = ref('');
const password: Ref<string> = ref('');
const message: Ref<string> = ref('');

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

<style>

</style>
