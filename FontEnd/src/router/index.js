import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/Home.vue";
import Sign from "../pages/Sign.vue";
import Notfound from "../pages/404.vue";
import Fav from "../pages/Fav.vue";
import Profile from "../pages/Profile.vue";
import Signup from "../pages/Signup.vue";
import Package from "../pages/Package.vue";
import addbook from  "../pages/Addbook.vue";
import approve from  "../pages/approve.vue";
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/sign',
        name: 'login',
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
    ,
    {
        path: '/Profile',
        component: Profile
    }
    ,
    {
        path: '/Signup',
        name: 'signup',
        component: Signup
    }
    ,
    {
        path: '/package',
        name: 'package',
        component: Package
    },
    {
        path: '/addbook',
        name: 'addbook',
        component: addbook
    },
    {
        path: '/approve',
        name: 'approve',
        component: approve
    }



]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
