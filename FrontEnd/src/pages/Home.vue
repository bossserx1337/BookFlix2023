<template>
  <div class="bg-white">
    <nav/>
    <CarouselBar />
    <div class="text-2xl font-semibold pl-3 ">Manhwa in Website</div>
    <ListBook />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ListBook from "../components/ListBook.vue";

import CarouselBar from "../components/CarouselBar.vue";

export default {
  name: "App",
  data() {
    fav: [];
    userinfo: null;
  },
  created() {
    this.fav = JSON.parse(localStorage.getItem("book"));
    this.email = localStorage.getItem("email");
    // axios.get("http://localhost:3001/userinfo")
    //   .then((response) => {
    //     this.userinfo = response.data.userinfo;
    //     console.log(this.userinfo);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  components: {
    Navbar,
    ListBook,
    CarouselBar,
  },
  computed: {},
};
</script>
<style scoped>
</style>
