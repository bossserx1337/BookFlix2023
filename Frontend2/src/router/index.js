import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Package from "../views/Package.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import DetailBook from "../views/DetailBook.vue";
import DetailChapter from "../views/DetailChapter.vue";
import Fav from "../views/Fav.vue";
import admin from "../views/admin.vue";
import approve from  "../views/approve.vue";
const routes = [
    {
        name: 'Home',
        path: '/',
        meta: { login: true },
        component: Home
    },
    {
        name: 'Signup',
        path: '/signup',
        component: Signup
    },
    {
        name: 'Package',
        path: '/package',
        meta: { login: true },
        component: Package
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {   name: 'Profile',
        path: '/profile',
        meta: { login: true },
        component: Profile
    },
    {
        path: '/book/:bookid/chapter/',
        name: 'DetailBook',
        meta: { login: true },
        component: DetailBook
    },
    {
        path: '/book/:bookid/chapter/:chapterid',
        name: 'DetailChapter',
        meta: { login: true },
        component: DetailChapter
    },
    {
        path: '/fav',
        meta: { login: true },
        component: Fav
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin
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

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')
    

    if (to.meta.login && !isLoggedIn) {
        alert('Please login')
      next({ path: '/login' })
    }


    next()
  })

export default router
