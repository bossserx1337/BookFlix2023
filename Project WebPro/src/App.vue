<template>
  <div class="">
    <Nav></Nav>
    <div>
      หนังสือยอดฮิต
    </div>
    <ListBook />
    <div>
      หนังสือมังงะ
    </div>
    <ListBook />
    <div>
      หนังสือนิยาย
    </div>
    <ListBook />

    <!-- <Genre /> -->
  </div>
</template>


<script>
import Nav from './components/Nav.vue'
import ListBook from './components/ListBook.vue'
import Genre from './components/Genre.vue'
export default {
  name: 'App',
  components: {
    Nav,
    ListBook,
    Genre

  },
  computed: {
    // ...mapGetters(['getAuthUser'])
  },
}
</script>
<style scoped>

</style>
