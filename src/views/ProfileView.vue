<template>
    <div class="flex flex-row">
        <aside class="w-60">
            <VerticalNav />
        </aside>
        <main class="view">
            <div class="flex flex-row h-15 items-center">
                <div class="w-5/6">
                    <h1 class="text-3xl font-semibold text-blue-700 text-center">User Profile</h1>
                </div>
                <div class="w-1/6 flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import VerticalNav from '../components/VerticalNav.vue';
import LogoutButton from '../components/LogoutButton.vue';
</script>

<style scoped>
.view {
    width: calc(100vw - 240px);
}
</style>
