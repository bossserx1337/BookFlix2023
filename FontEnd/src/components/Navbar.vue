<template>
  <Disclosure as="nav" class="bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src="https://img.genial.ly/5eaaade40a067c22f66426e4/f8c73acc-4e63-4e1e-8f11-3f5f209ff9bd.png"
              alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block" src="https://img.genial.ly/5eaaade40a067c22f66426e4/f8c73acc-4e63-4e1e-8f11-3f5f209ff9bd.png"
              alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="text-black   hover:text-white , rounded-md px-3 py-2 text-md font-medium"
                aria-current='page'>{{ item.name }}</router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class=" flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">Open user menu</span>
                <img :src='userdata.prof_img' class="h-8 w-8 rounded-full">
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <a href="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your
                  Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" @click="logout()">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
</script>
<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'Nav',
  data() {
    return {
      userdata : [],
      navigation: [
        { name: 'Home', href: '/', current: false },
        { name: 'MyFav', href: '/fav', current: false },
        { name: 'Sign In', href: '/sign', current: false },
      ]

    }
  },
  computed: {
    route() {
      return useRoute()
    }
  },
  methods : {
    logout(){
      localStorage.removeItem('userdata')
      window.location.href = "/sign"
    }
  },
  // created(){
  //   this.userdata=  JSON.parse(localStorage.getItem("userdata"))


  //         }


}

</script>
<style>
  .router-link-active{
    text-decoration-line: underline;;
    color: black;
    text-decoration-color: rgb(248 113 113);
    text-underline-offset: 8px;
    text-decoration-thickness: 3px;
  }
</style>
