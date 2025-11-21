import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { layout: 'DefaultLayout', props: { title: 'Welcome to Nanyang' } },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: { layout: 'DefaultLayout', props: { title: 'Student Profile' } },
        },
    ],
});

export default router;
