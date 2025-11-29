<template>
    <nav>
        <ul @mouseover="() => (expanded = true)" @mouseleave="() => (expanded = false)">
            <li
                class="w-20 h-16 lg:w-24 lg:h-20 bg-indigo-400 border-2 border-amber-300"
                :class="{ 'w-60 lg:w-60': expanded }"
            >
                <a href="#">
                    <router-link
                        to="/"
                        class="py-3 px-auto flex flex-row items-center"
                        :class="{ 'py-1.5 ps-7 gap-10': expanded, 'justify-center': !expanded }"
                        ><img
                            src="../assets/ntu_coat.svg.png"
                            alt="Welcome"
                            class="h-8 w-6 lg:h-12 lg:w-9"
                        />
                        <p v-show="expanded" class="text-lg lg:text-xl text-orange-900">Welcome</p>
                    </router-link></a
                >
            </li>
            <li
                class="w-20 h-16 lg:w-24 lg:h-20 bg-indigo-400 border-2 border-amber-300"
                :class="{ 'w-60 lg:w-60': expanded }"
            >
                <a href="#">
                    <router-link
                        to="/profile"
                        class="py-3 px-auto flex flex-row items-center"
                        :class="{ 'py-1.5 ps-7 gap-10': expanded, 'justify-center': !expanded }"
                        ><img
                            src="../assets/account.png"
                            alt="Profile"
                            class="h-8 w-6 lg:h-12 lg:w-9"
                        />
                        <p v-show="expanded" class="text-lg lg:text-xl text-orange-900">Profile</p>
                    </router-link></a
                >
            </li>
            <li
                class="w-20 h-16 lg:w-24 lg:h-20 bg-indigo-400 border-2 border-amber-300"
                :class="{ 'w-60 lg:w-60': expanded }"
            >
                <a href="#">
                    <router-link
                        to="/addDropCourse"
                        class="py-3 px-auto flex flex-row items-center"
                        :class="{ 'py-1.5 ps-7 gap-10': expanded, 'justify-center': !expanded }"
                        ><img
                            src="../assets/google-docs.png"
                            alt="Enrolment"
                            class="h-8 w-6 lg:h-12 lg:w-9"
                        />
                        <p v-show="expanded" class="text-lg lg:text-xl text-orange-900">
                            Enrolment
                        </p>
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
