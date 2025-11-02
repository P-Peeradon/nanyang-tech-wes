import { defineStore } from 'pinia';
import { ref } from 'vue';

export const routeStore = defineStore('route', () => {
    const routes = ref<Array<object>>([
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
            path: '',
        },
    ]);

    function getRoute(name: string) {
        return routes.value.find((route: object) => route.name === name);
    }

    return { routes, getRoute };
});
