<script setup lang="ts">
import { RouterView, useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import { onMounted, computed, type Component, type ComputedRef } from 'vue';
import { routeStore } from './stores/direction';

import DefaultLayout from './layouts/DefaultLayout.vue';
import BlankLayout from './layouts/BlankLayout.vue';
import { courseStore } from './stores/stars';

// A map to link layout names (strings) to the actual component imports
const layoutComponents: Record<string, Component> = {
    DefaultLayout,
    BlankLayout,
};

const route: RouteLocationNormalizedLoaded = useRoute();
const routeState = routeStore();
const courseState = courseStore();

const currentLayout: ComputedRef<Component> = computed(() => {
    // Get the layout name from the route meta, or default to 'DefaultLayout'
    const layoutName: string = (route.meta.layout as string) ?? 'DefaultLayout';
    return layoutComponents[layoutName] as Component;
});

const currentLayoutProps: ComputedRef<object> = computed(() => {
    return route.meta?.props ?? {};
});

// When the app is mounted, fetch all functions.
onMounted(() => {
    routeState.getAllRoutes();
    courseState.getAllCourses();
});
</script>

<template>
    <component :is="currentLayout" v-bind="currentLayoutProps">
        <RouterView />
    </component>
</template>

<style scoped></style>
