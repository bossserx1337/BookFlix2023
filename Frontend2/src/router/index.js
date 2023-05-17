import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Package from "../views/Package.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
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
        component: Profile
    }


]


const router = createRouter({
    history: createWebHistory(),
    routes

})

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')

    if (to.meta.login && !isLoggedIn) {
      next({ path: '/login' })
    }

    next()
  })

export default router
