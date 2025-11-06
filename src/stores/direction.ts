import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Feature } from '../utility/feature';

export const routeStore = defineStore('route', () => {
    const routes = ref<Array<Feature>>([
        {
            name: 'Welcome',
            path: '/',
        },
        {
            name: 'Profile Management',
            path: '/profile',
        },
        {
            name: 'Timetable Planner',
            path: '/',
        },
        {
            name: 'Add/Drop Course',
            path: '/',
        },
    ]);

    function getRoute(name: string) {
        return routes.value.find((route: object) => route.name === name);
    }

    function getAllRoutes() {
        return;
    }

    return { routes, getRoute, getAllRoutes };
});
