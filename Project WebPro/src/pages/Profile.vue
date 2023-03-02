<template>
   <div class="text-center text-5xl font-bold"> Welcome  {{ userdata.Name }}  !!</div>
   <div class="text-center text-4xl text-fuchsia-800"> Your package is   {{ userdata.package}}  </div>
  </template>

  <script>
  import navbar from '../components/Navbar.vue'
  import userdata from "../data/user.json";
  export default {
    name: 'App',
    components: {
      navbar
    },
    data () {
      return {

        userdata : []
      }
    },
    methods: {
    },
    created(){
              this.userdata=  JSON.parse(localStorage.getItem("userdata"))


          }

}

  </script>

  <style>

  </style>
