<template>
    <nav>
        <ul @mouseover="() => (expanded = true)" @mouseleave="() => (expanded = false)">
            <li
                class="w-24 h-20 bg-indigo-400 border-2 border-amber-300"
                :class="{ 'w-60': expanded }"
            >
                <a href="#">
                    <router-link
                        to="/"
                        class="py-3 px-auto flex flex-row items-center"
                        :class="{ 'py-1.5 ps-7 gap-10': expanded, 'justify-center': !expanded }"
                        ><img src="../assets/ntu_coat.svg.png" alt="Welcome" class="h-12 w-9" />
                        <p v-show="expanded" class="text-xl text-black">Welcome</p>
                    </router-link></a
                >
            </li>
            <li
                class="w-24 h-20 bg-indigo-400 border-2 border-amber-300"
                :class="{ 'w-60': expanded }"
            >
                <a href="#">
                    <router-link
                        to="/profile"
                        class="py-3 px-auto flex flex-row items-center"
                        :class="{ 'py-1.5 ps-7 gap-10': expanded, 'justify-center': !expanded }"
                        ><img src="../assets/account.png" alt="Profile" class="h-12 w-9" />
                        <p v-show="expanded" class="text-xl">Profile</p>
                    </router-link></a
                >
            </li>
            <li
                class="w-24 h-20 bg-indigo-400 border-2 border-amber-300"
                :class="{ 'w-60': expanded }"
            >
                <a href="#">
                    <router-link
                        to="/"
                        class="py-3 px-auto flex flex-row items-center"
                        :class="{ 'py-1.5 ps-7 gap-10': expanded, 'justify-center': !expanded }"
                        ><img src="../assets/google-docs.png" alt="Enrolment" class="h-12 w-9" />
                        <p v-show="expanded" class="text-xl">Enrolment</p>
                    </router-link></a
                >
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const expanded = ref<boolean>(false);
</script>

<style></style>
