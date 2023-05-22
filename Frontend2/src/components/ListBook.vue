<template>
  <div class=" mt-14">
    <h1 class="">Manhwa</h1>
    <div class="ml-2 gap-x-4 pl-4 flex overflow-x-auto" @wheel="handleWheel">
      <div v-for="book in books" :key="book.book_id" class="flex-shrink-0" style="width: 200px">

        <div
          class="h-[275px] w-40 bg-base-100 flex flex-col justify-end transition-transform transform hover:scale-105 hover:shadow-xl">


          <div v-if="userinfo.user_status == 'R' || userinfo.user_role == 'admin'">
            <router-link :to="`/book/${book.book_id}/chapter/`">
              <figure><img :src="book.book_img" /></figure>
            </router-link>
          </div>
          <div v-else>
            <figure><img :src="book.book_img" /></figure>
          </div>
          <div>

            {{ book.book_name }}

          </div>
          <div v-if="userinfo.user_status == 'R'">
            <button v-if="!isFavorite(book)" @click="addToFavorites(book)"
              class="favorite-button bg-white text-black w-full hover:bg-gray-200 font-semibold">Add
              Favorites</button>
            <button v-else disabled class="favorite-button bg-gray-300 text-gray-500 w-full cursor-not-allowed">Added to
              Favorites</button>
          </div>
        </div>
      </div>
    </div>



    <div class=" px-52 mt-16">


      <h1 class="">Sort by tag</h1>
      <!-- dropdown tag -->
      <select id="tag" v-model="selectedTag" class="block w-full border border-gray-400 p-2 rounded mb-4 text-black">
        <option selected value="">Select a tag</option>
        <option v-for="(tag, index) in tags" :value="tag.tag" :key="index">{{ tag.tag }}</option>
      </select>
      <div class="ml-2 gap-x-4 pl-4 grid grid-cols-5 grid-flow-row auto-cols-max overflow-x-auto" @wheel="handleWheel">
        <div v-for="book in books_sort" :key="book.book_id" class="flex-shrink-0 w-40">
          <div
            class="h-[150] bg-base-100 flex flex-col justify-end transition-transform transform hover:scale-105 hover:shadow-xl">

            <div v-if="userinfo.user_status == 'R'">
              <router-link :to="`/book/${book.book_id}/chapter/`">
                <figure><img :src="book.book_img" /></figure>
              </router-link>
            </div>
            <div v-else>
              <figure><img :src="book.book_img" /></figure>
            </div>
            <div>{{ book.book_name }}</div>
            <div v-if="userinfo.user_status == 'R'">
              <button v-if="!isFavorite(book)" @click="addToFavorites(book)"
                class="favorite-button bg-white text-black w-full hover:bg-gray-200 font-semibold">Add Favorites</button>
              <button v-else disabled class="favorite-button bg-gray-300 text-gray-500 w-full cursor-not-allowed">Added to
                Favorites</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '/plugins/axios'
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      books: null,
      email: '',
      userinfo: null,
      favorites: [], // เพิ่มตัวแปร favorites เพื่อเก็บรายการหนังสือโปรด
      tags: [],
      selectedTag: '',

    };
  },
  methods: {
    async addToFavorites(book) {
      try {
        const postResponse = await axios.post(`/favorite`);
        // console.log(postResponse);
        this.getFav(); // เรียกใช้ฟังก์ชัน getFav เพื่ออัปเดตรายการหนังสือโปรด
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
    },

    async getFav() {
      try {
        const favoriteResponse = await axios.get(`/favorite`);
        this.favorites = favoriteResponse.data.favorite; // อัปเดตตัวแปร favorites เมื่อได้รับข้อมูลหนังสือโปรดใหม่
      } catch (error) {
        console.log(error);
      }
    },

    async getBook() {
      try {
        const books = await axios.get("/book");
        this.books = books.data.book;
        this.tags = books.data.tag;
        console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    isFavorite() {
      return (book) => this.favorites.some(favBook => favBook.book_id === book.book_id);
    },
    books_sort() {
      if (this.selectedTag === '') {
        return this.books;
      } else {
        return this.books.filter(book => book.tag.includes(this.selectedTag));
      }
    }

  },

  async mounted() {
    try {
      this.userinfo = this.$store.getters.getUserInfo;
      this.getBook();
      this.getFav();
    } catch (err) {
      console.log(err);
    }
  },
}
</script>
