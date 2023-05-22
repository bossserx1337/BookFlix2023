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
import axios from '/plugins/axios'
import Swal from 'sweetalert2'
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
        await axios.delete(`favorite/${book_id}`);
        this.getFav();
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
    async getFav() {
      try {

        const favoriteResponse = await axios.get(`/favorite`);
        this.favorite = favoriteResponse.data.favorite;
        console.log(this.favorite)
      } catch (error) {
        console.log(error);

      }
    }
  },
  components: {

  },
  mounted() {
    this.userinfo = this.$store.getters.getUserInfo;
    this.getFav();



  }
}
</script>

<style>
</style>
