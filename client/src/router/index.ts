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
            meta: {
                layout: 'DefaultLayout',
                props: {
                    title: 'Welcome to Nanyang'
                },
                requiresAuth: true
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {
                layout: 'DefaultLayout',
                props: {
                    title: 'Student Profile'
                },
                requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                layout: 'BlankLayout',
                requiresAuth: false
            },
        },
        {
            path: '/addDropCourse',
            name: 'addDropCourse',
            component: AddDropView,
            meta: {
                layout: 'DefaultLayout',
                props: {
                    title: 'Add/Drop Course'
                },
                requiresAuth: true
            }
        }
    ],
});

function isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}

router.beforeEach(async (to, from, next) => {
    if (!isAuthenticated() && to.name !== 'login') {
        next({ name: 'login' });
        return;
    } else if (isAuthenticated() && to.name === 'login') {
        next('/');
        return;
    }

    next();
})

export default router;
