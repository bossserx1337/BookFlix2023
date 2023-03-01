<template>
    <div class="bg-black">
      <CarouselBar />
      <ListBook />
    </div>
  </template>


  <script>
  import Navbar from '../components/Nav.vue'
  import ListBook from '../components/ListBook.vue'

  import CarouselBar from '../components/CarouselBar.vue'

  export default {
    name: 'App',
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
