<template>
  <div class="text-2xl font-semibold pl-3 ">Trending now</div>
  <div class="flex ml-2 gap-x-4 pl-4">
    <div v-for="book in books " :key="book.book_id">
      <div class="card w-40 bg-base-100 shadow-xl ">
        <figure><img :src="book.book_img" /></figure>
      </div>
    </div>
  </div> <h1 v-for="user in userinfo" :key="user.customer_id"> welcome {{  user.customer_firstN}}</h1>

</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      books: null,
      email: '',
      userinfo : null// add blogs variable

    };
  },
  // methods: {
  //     addLike(Boss) {
  //         axios.post(`http://localhost:3000/blogs/addlike/${Boss.id}`).then((response) => {
  //             response;
  //             Boss.like++
  //             // this.$router.push({path: '/'})
  //             // window.location.reload();
  //         });
  //     }
  // },
  created() {
    axios.get("http://localhost:3001/book")
      .then((response) => {
        this.books = response.data.book;
        console.log(this.books);

      })
      .catch((err) => {
        console.log(err);
      });
    this.email = localStorage.getItem("email");
    // axios.get(`http://localhost:3000/userinfo/${this.email}`)
    //   .then((response) => {
    //     this.userinfo = response.data.userinfo;
    //     console.log(this.userinfo[0].customer_id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

  },
  components: { RouterLink }
}


</script>

<style>
</style>
