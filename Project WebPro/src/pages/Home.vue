<template>
    <div class="bg-white">
      <CarouselBar />
      <ListBook />
    </div>
  </template>


  <script>
  import Navbar from '../components/Navbar.vue'
  import ListBook from '../components/ListBook.vue'

  import CarouselBar from '../components/CarouselBar.vue'

  export default {
    name: 'App',
    data(){
      fav  : []
  },
  created(){
                this.fav=  JSON.parse(localStorage.getItem("book"))
    },
    components: {
      Navbar,
      ListBook,
      CarouselBar

    },
    computed: {
    },
  }
  </script>
  <style scoped>

  </style>
