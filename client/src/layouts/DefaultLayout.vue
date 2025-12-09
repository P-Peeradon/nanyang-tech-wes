<template>
    <div class="bg-linear-to-tr from-imperial-300 via-blue-300 to-violet-400 w-screen">
        <WebHeader />
        <TimeDisplay />
        <div class="flex flex-row justify-between">
            <aside class="w-60">
                <VerticalNav />
            </aside>
            <main class="view">
                <TitleSection :title="props.title" />
                <br />
                <slot></slot>
            </main>
        </div>
        <div class="mb-3 lg:mb-6 xl:mb-10"></div>
        <WebFooter />
    </div>
</template>

<script setup lang="ts">
import TitleSection from '../components/TitleSection.vue';
import VerticalNav from '../components/VerticalNav.vue';
import WebHeader from '../components/WebHeader.vue';
import WebFooter from '../components/WebFooter.vue';
import TimeDisplay from '../components/TimeDisplay.vue';

interface layoutProps {
    title: string;
}

const props = defineProps<layoutProps>();
</script>

<style scoped>
.view {
    width: calc(100vw - 280px);
}
</style>
