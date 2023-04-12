<template>
   <div class="text-center text-5xl font-bold"> Welcome  {{ userdata.Name }}  !!</div>
   <div class="text-center text-4xl text-fuchsia-800"> Your package is   {{ userdata.package}}  </div>
  </template>

  <script>
  import navbar from '../components/Navbar.vue'
  export default {
    name: 'App',
    components: {
      navbar
    },
    data () {
      return {

      }
    },
    methods: {
    },
    created(){
      


          }

}

  </script>

  <style>

  </style>
