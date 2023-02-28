<template>
    <div class="bg-black">
      <Nav></Nav>
      <!-- <Carousel /> -->
      <!-- <div class="pl-5 font-bold text-white font-mono">
        Popular on Bookflix
      </div>
      <ListBook />
      <div>
        หนังสือมังงะ
      </div>
      <ListBook />
      <div>
        หนังสือนิยาย
      </div>
      <ListBook /> -->

      <!-- <Genre /> -->
    </div>
  </template>


  <script>
  import Nav from '../components/Nav.vue'
  import ListBook from '../components/ListBook.vue'


  export default {
    name: 'App',
    components: {
      Nav,
      ListBook,



    },
    computed: {
    },
  }
  </script>
  <style scoped>

  </style>
