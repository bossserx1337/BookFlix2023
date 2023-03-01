import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/Home.vue";
import Sign from "../pages/Sign.vue";
import Notfound from "../pages/404.vue";
import Fav from "../pages/Fav.vue";
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
    ,
        {
            path: '/fav',
        component: Fav
        }
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
