<template>
  <navbar/>
  <router-view>
  </router-view>
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
  }
}
</script>

<style>

</style>
