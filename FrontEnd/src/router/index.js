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
import editbook from "../pages/editbook.vue";
import DetailBook from "../pages/DetailBook.vue";
import DetailChapter from "../pages/DetailChapter.vue";
import admin from "../pages/admin.vue";

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
    },
    {
        path: '/editbook',
        name: 'editbook',
        component: editbook
    },
    {
        path: '/book/:bookid/chapter/',
        name: 'DetailBook',
        component: DetailBook
    },
    {
        path: '/book/:bookid/chapter/:chapterid',
        name: 'DetailChapter',
        component: DetailChapter
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin
    }



]



const router = createRouter({
    history: createWebHistory(),
    routes

})

export default router
