import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

/**
 *  Views 
 */ 
const Blogger = () => import('../views/Blogger/Blogger.vue');
const Home = () => import('../views/Home/Home.vue');
const Authentication = () => import('@/views/Authentication/Authentication.vue');
const NotFound = () => import('@/views/NotFound/NotFound.vue');

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
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, _from) => {
    const authStore = useAuthStore();

    // Just for so we don't have to login everytime
    // if (to.meta.requiresAuth && !authStore.authenticated) {
    //     return {
    //         path: '/auth',
    //         query: {
    //             authType: 'login',
    //             redirect: to.fullPath
    //         }
    //     }
    // }

    if (authStore.authenticated) {
        if (to.name === 'blogger' || to.name === 'auth') {
            return false // don't allow the user to go back
        }
    } 
    return true
})

export default router;