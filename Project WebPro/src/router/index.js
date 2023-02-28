import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/Home.vue";
import Sign from "../pages/Sign.vue";
import Notfound from "../pages/404.vue";
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/:pathMatch(.*)*',
        component: Notfound
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
