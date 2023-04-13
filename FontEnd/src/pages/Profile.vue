
<template>
   <div v-for="user in userinfo" :key="user.customer_id">
    <!-- component -->
<div class="flex items-center h-screen w-full justify-center">

<div class="max-w-xs">
    <div class="bg-white shadow-xl rounded-lg py-3">
        <div class="photo-wrapper p-2">
            <img class="w-32 h-32 rounded-full mx-auto"  :src=" user.customer_pic" alt="John Doe">
        </div>
        <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{{ user.customer_firstN }}</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
                <tbody><tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">fullname</td>
                    <td class="px-2 py-2"> {{ user.customer_firstN}}  {{ user.customer_lastN }}</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="px-2 py-2">+66 {{ user.customer_phone }}</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">{{ user.customer_email }}</td>
                </tr>
            </tbody></table>

            <div class="text-center my-3">
                <a class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium" @click="logout()">logout</a>
            </div>

        </div>
    </div>
</div>

</div>
  </div>

  </template>

  <script>
  import navbar from '../components/Navbar.vue'
  import axios from 'axios';
  export default {
    name: 'App',
    components: {
      navbar
    },
    data () {
      return {
        userinfo : null
      }
    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/sign');
      }
    },
    created(){
      this.email = localStorage.getItem("email");
    axios.get(`http://localhost:3001/userinfo/${this.email}`)
      .then((response) => {
        this.userinfo = response.data.userinfo;
        console.log(this.email);
        console.log(this.userinfo);
      })
      .catch((err) => {
        console.log(err);
      });


          }

}

  </script>

  <style>

  </style>
