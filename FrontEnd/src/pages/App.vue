<template >
  <div class="relative h-screen ">
    <navbar/>
    <router-view>
    </router-view>

    <foot/>
  </div>
</template>

<script>
import navbar from '../components/Navbar.vue'
import foot from '../components/Footer.vue'
export default {
  name: 'App',
  components: {
    navbar,
    foot
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
