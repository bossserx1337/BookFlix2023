<template>
  <div class="ml-2 gap-x-4 pl-4 flex overflow-x-auto" @wheel="handleWheel">
        <div v-for="book in books" :key="book.book_id" class="flex-shrink-0" style="width: 200px">
            <div
                class="h-[200px] w-40 bg-base-100 flex flex-col justify-end transition-transform transform hover:scale-105 hover:shadow-xl">
                <router-link :to="`/book/${book.book_id}/chapter/`">
                    <figure><img :src="book.book_img" /></figure>
                </router-link>
                <button @click="addToFavorites(book.book_id)"
                    class="favorite-button bg-white text-black w-full hover:bg-gray-200 font-semibold">Add
                    Favorites</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from '/plugins/axios'
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      books: null,
      email: '',
      userinfo: null,
      customerid: null,
    };
  },

  methods: {
    async addToFavorites(book_id) {
      try {
        const postResponse = await axios.post(`http://localhost:3001/favorite/${this.userinfo.user_id}`, { book_id: book_id });
        console.log(postResponse);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Add to Favorites already!',
          showConfirmButton: false,
          timer: 1500
        })

      } catch (err) {
        console.log(err);
      }
    },

    handleWheel(event) {
      // Prevent default scrolling behavior
      event.preventDefault();

      // Calculate the new scroll position based on the mouse wheel movement
      const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
      const container = event.target;
      container.scrollLeft += delta * 50; // Adjust the scrolling speed here
    }
  },
  async created() {
    try {
      this.userinfo = this.$store.getters.getUserInfo;
    } catch (err) {
      console.log(err);
    };
    axios.get("http://localhost:3001/book")
      .then((response) => {
        this.books = response.data.book;

      })
      .catch((err) => {
        console.log(err);
      })

  },
}


</script>
  
<style>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}
</style>
  