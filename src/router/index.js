import { createRouter, createWebHistory } from "vue-router";
import { useRootStore } from "@/store/root";

/**
 *  Views 
 */ 
const Blogger = () => import('../views/Blogger/Blogger.vue');
const Home = () => import('../views/Home/Home.vue');
// Authentication
const Authentication = () => import('../views/Authentication/Index.vue')
const Login = () => import('../views/Authentication/Login.vue');
const Signup = () => import('../views/Authentication/Signup.vue');

const routes = [
    {
        path: '/',
        name: 'blogger',
        component: Blogger,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/auth',
        name: 'auth',
        component: Authentication,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'signup',
                name: 'signup',
                component: Signup
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _from) => {
    const rootStore = useRootStore();

    if (to.meta.requiresAuth && !rootStore.authenticated) return '/'

    if (rootStore.authenticated) {
        if (to.name === 'login' || to.name === 'blogger' || to.name === 'signup') {
            return false // don't allow the user to go back
        }
    } 
    return true
})

export default router;