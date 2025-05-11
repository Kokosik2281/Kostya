import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contacts from '../views/Contacts.vue';
import Students from '../views/Students.vue';
import Teachers from '../views/Teachers.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '../store';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/contacts', name: 'Contacts', component: Contacts },

    {
        path: '/students',
        name: 'Students',
        component: Students,
        meta: { requiresAuth: true }
    },
    {
        path: '/teachers',
        name: 'Teachers',
        component: Teachers,
        meta: { requiresAuth: true }
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;