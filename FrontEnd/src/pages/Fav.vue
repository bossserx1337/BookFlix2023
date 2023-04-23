<template>
  <div class="flex ml-2 gap-x-4 pl-4 h-screen">
    <div v-for="book in favorite " :key="book.book_id">
      <router-link :to="`/book/${book.book_id}/chapter/`">
        <div class="card w-40 bg-base-100 shadow-xl">
          <figure><img :src="book.book_img" /></figure>
        </div>
      </router-link>
      <button @click="removeFromFavorites(book.book_id)"> Remove
      </button>
    </div>
  </div>
</template>

<script >
import axios from 'axios';

export default {
  name: 'Fav',
  data() {
    return {
      fav: [],
      userinfo: null,
      favorite: null,
      customerid: null,
    }

  },
  methods: {
    async removeFromFavorites(book_id) {

      try {
        const response = await axios.get(`http://localhost:3001/userinfo/${this.email}`);
        this.userinfo = response.data.userinfo;
        this.customerid = response.data.userinfo[0].customer_id;
        const postResponse = await axios.delete(`http://localhost:3001/favorite/${this.customerid}/${book_id}`);
        this.getUserInfo();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Remove from Favorites already!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        console.log(err);
      }
    },
    async getUserInfo() {
      try {
        const response = await axios.get(`http://localhost:3001/userinfo/${this.email}`);
        this.userinfo = response.data.userinfo;
        this.customerid = response.data.userinfo[0].customer_id;

        const favoriteResponse = await axios.get(`http://localhost:3001/favorite/${this.customerid}`);
        this.favorite = favoriteResponse.data.favorite;
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: {

  },
  created() {

    this.email = localStorage.getItem("email");
    this.getUserInfo();




  }
}
</script>

<style>
</style>
