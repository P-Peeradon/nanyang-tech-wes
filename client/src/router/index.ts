import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import LoginView from '../views/LoginView.vue';
import AddDropView from '../views/AddDropView.vue';

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
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { layout: 'BlankLayout' },
        },
        {
            path: '/addDropCourse',
            name: 'addDropCourse',
            component: AddDropView,
            meta: { layout: 'DefaultLayout', props: { title: 'Add/Drop Course' } }
        }
    ],
});

export default router;
