<script setup lang="ts">
import VerticalNav from '../components/VerticalNav.vue';
</script>

<template>
    <div class="flex flex-row">
        <aside class="w-60">
            <VerticalNav />
        </aside>
        <main class="view">
            <div class="flex flex-row h-15 items-center">
                <div class="w-5/6">
                    <h1 class="text-3xl font-semibold text-blue-700 text-center">
                        Welcome to Nanyang
                    </h1>
                </div>
                <div class="w-1/6 flex justify-center">
                    <button
                        class="px-1 py-1 bg-red-700 text-white text-lg text-center font-semibold border-rose-400 rounded-2xl items-center"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.view {
    width: calc(100vw - 240px);
}
</style>
