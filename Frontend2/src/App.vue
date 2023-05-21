<template>
  <div id="app">

    <Navbar />
    <div class=" mt-11">
      <router-view>
      </router-view>
    </div>

  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar
  }
}

</script>
<style scoped>
</style>
