<script setup lang="ts">
import VerticalNav from '../components/VerticalNav.vue';
import MenuDisplay from '../display/MenuDisplay.vue';
import TitleSection from '../components/TitleSection.vue';
</script>

<template>
    <div class="flex flex-row justify-evenly">
        <aside class="w-60">
            <VerticalNav />
        </aside>
        <main class="view">
            <TitleSection :title="'Welcome to Nanyang'" />
            <MenuDisplay />
            <div class="mb-3 lg:mb-6 xl:mb-10" />
        </main>
    </div>
</template>

<style scoped>
.view {
    width: calc(100vw - 280px);
}
</style>
