<script setup lang="ts">
import { RouterView, useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import { onMounted, computed, type Component, type ComputedRef, onUnmounted } from 'vue';
import { routeStore, timeStore } from './stores/direction';

import DefaultLayout from './layouts/DefaultLayout.vue';
import BlankLayout from './layouts/BlankLayout.vue';
import { courseStore, offerStore } from './stores/stars';

// A map to link layout names (strings) to the actual component imports
const layoutComponents: Record<string, Component> = {
    DefaultLayout,
    BlankLayout,
};

const route: RouteLocationNormalizedLoaded = useRoute();
const routeState = routeStore();
const courseState = courseStore();
const timeState = timeStore();
const offerState = offerStore();

const currentLayout: ComputedRef<Component> = computed(() => {
    // Get the layout name from the route meta, or default to 'DefaultLayout'
    const layoutName: string = (route.meta.layout as string) ?? 'DefaultLayout';
    return layoutComponents[layoutName] as Component;
});

const currentLayoutProps = computed(() => {
    return route.meta?.props ?? {};
});

// When the app is mounted, fetch all functions.
onMounted(() => {
    routeState.getAllRoutes();
    courseState.getAllCourses();
    offerState.getAllOffers();

    timeState.intervalId = window.setInterval(() => {
        timeState.currentTime = new Date();
    }, 60000);

    timeState.currentTime = new Date();
});

onUnmounted(() => {
    if (timeState.intervalId !== undefined) {
        window.clearInterval(timeState.intervalId);
    }

    localStorage.removeItem('authToken');
    localStorage.removeItem('NTUeMail');
    localStorage.removeItem('studentId');
})
</script>

<template>
    <component :is="currentLayout" v-bind="currentLayoutProps">
        <RouterView />
    </component>
</template>

<style scoped></style>
