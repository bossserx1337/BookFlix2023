<template>
  <div class="bg-white ">
    <div class="container mx-auto py-8">
      <div class="flex md:flex-row">
        <div class="md:w-1/3">
          <img :src="book.img" class="w-full h-auto rounded-lg" alt="Book Cover" />
        </div>
        <div class="md:w-2/3 md:pl-8">
          <h2 class="text-2xl font-bold mb-2">{{ book.title }}</h2>
          <div class="flex flex-cols items-center space-x-4 mb-4">
            <div class="text-gray-600 text-sm">author: {{ book.author }}</div>
            <div class="text-gray-600 text-sm"><a :href="book.pub_url">publisher: {{ book.publisher }}</a></div>
          </div>
          <p class="text-gray-700 mb-4">{{ book.description }}</p>
          <div class="flex flex-cols items-center space-x-4 mb-4">
            <div class="text-gray-600 text-sm">Tags:</div>
            <div class="text-gray-600 text-sm" v-for="(tag, index) in book.tags" :key="index">{{ tag.tag }}</div>
          </div>
          <h3 class="text-xl font-bold mb-4">Chapters</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(chapter, index) in book.chapters" :key="index" class="bg-gray-100 rounded-lg p-4">

              <router-link :to="'/book/' + book.id + '/chapter/' + (index + 1)"
                class="text-lg font-medium hover:text-indigo-500">{{ chapter.chapter_content }}</router-link>
              <div class="text-gray-600">{{ chapter.chapter_update }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- back to books -->
      <div class="bg-white min-h-screen">
        <router-link to="/" class="text-gray-500 hover:text-gray-700 font-medium mb-4">&lt; Back to
          Books</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      book: {
        id: "1",
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        publisher: "Shueisha",
        pub_url: "https://www.shonenjump.com/j/rensai/myhero.html",
        description: "In a world where people with superpowers are the norm, Izuku Midoriya born without any powers, despite that he still dreams of becoming a hero. After helping his childhood friend and fellow hero Katsuki Bakugo, Midoriya accepts an invitation to attend U.A. High School, which is known for its rigorous training for young heroes. This is the start of Midoriya's journey to becoming the world's greatest hero.",
        img: "https://du.lnwfile.com/015vj6.jpg",
        chapters: [
          {
            id: 1,
            title: "Izuku Midoriya: Origin",
            date: "July 7, 2014"
          },
          {
            id: 2,
            title: "Roaring Sports Festival",
            date: "November 3, 2014"
          },
          {
            id: 3,
            title: "Smashing into Academia",
            date: "February 2, 2015"
          },
          {
            id: 4,
            title: "Starting Line",
            date: "May 1, 2015"
          },
          {
            id: 5,
            title: "Shiketsu High Lurking",
            date: "August 3, 2015"
          }
        ],
        tags:[
          {}
        ]
      }
    }
  },
  mounted() {
    this.getBookDetail(this.$route.params.bookid);
    this.scrollToTop()
  },
  methods: {
    getBookDetail(id) {
      axios.get(`http://localhost:3001/book/${id}/chapter/`).then((response) => {
        console.log(response.data.book[0]);
        this.book.id = response.data.book[0].book_id;
        this.book.title = response.data.book[0].book_name;
        this.book.author = response.data.book[0].author_name;
        this.book.publisher = response.data.book[0].pub_name;
        this.book.pub_url = response.data.book[0].pub_url;
        this.book.description = response.data.book[0].book_desc;
        this.book.img = response.data.book[0].book_img;
        this.book.chapters = response.data.chapter;
        this.book.tags = response.data.tag;
        console.log(this.book.tags);
      }).catch((error) => {
        console.log(error);
      })
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }


  },

}
</script>
