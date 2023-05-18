<template>
    <div class="bg-white">
      <div class="text-2xl font-semibold pl-3 ">Manhwa in Website</div>

      <ListBook />
    </div>
  </template>
  
  <script>
  import ListBook from "../components/Listbook.vue";
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
      
      ListBook
    
    },
    computed: {},
  };
  </script>
  <style scoped>
  </style>
  