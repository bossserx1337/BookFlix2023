<template>
    <nav class="bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div class="flex-shrink-0">
                <router-link to="/">
                    <div class="flex flex-shrink-0 items-center">
                        <img class="hidden h-8 w-auto lg:block"
                            src="https://img.genial.ly/5eaaade40a067c22f66426e4/f8c73acc-4e63-4e1e-8f11-3f5f209ff9bd.png" />
                    </div>
                </router-link>
            </div>
            <div v-if="this.$store.getters.getUserInfo" class="hidden md:block relative">

                <button @click="isOpen = !isOpen"
                    class="bg-white hover:bg-slate-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>Menu</span>
                    <svg class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 14l-5-5h10l-5 5z" />
                    </svg>
                </button>
                <div v-if="isOpen"
                    class="z-50 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                            Your Profile
                        </router-link>
                        <router-link to="/fav" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                            Favorite List
                        </router-link>
                        <div v-if="userinfo.user_role == 'admin'">
                            <router-link to="/admin" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                                Admin
                            </router-link>
                        </div>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" @click="logout()">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>


export default {
    data() {
        return {
            userinfo : null,
            isOpen: false,
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login')
        },
    },
    async mounted() {
    try {
      this.userinfo = this.$store.getters.getUserInfo;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
