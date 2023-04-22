<template>
    <div class="bg-white min-h-screen">
      <div class="container mx-auto py-8">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3">
            <img :src="book.img" class="w-full h-auto rounded-lg" alt="Book Cover" />
          </div>
          <div class="md:w-2/3 md:pl-8">
            <h2 class="text-2xl font-bold mb-2">{{ book.title }}</h2>
            <div class="flex flex-row items-center space-x-4 mb-4">
              <div class="text-gray-600 text-sm">{{ book.author }}</div>
              <div class="text-gray-600 text-sm">{{ book.publisher }}</div>
            </div>
            <p class="text-gray-700 mb-4">{{ book.description }}</p>
            <h3 class="text-xl font-bold mb-4">Chapters</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(chapter, index) in book.chapters" :key="index" class="bg-gray-100 rounded-lg p-4">
                <router-link :to="'/books/' + book.id + '/chapters/' + chapter.id" class="text-lg font-medium hover:text-indigo-500">{{ chapter.title }}</router-link>
                <div class="text-gray-600">{{ chapter.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        book: {
          id: null,
          title: "My Hero Academia",
          author: "Kohei Horikoshi",
          publisher: "Shueisha",
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
          ]
        }
      }
    },
    mounted() {
      // this.getBlogDetail(this.$route.params.id);
    },
    methods: {
      getBlogDetail(id) {
        axios.get(`http://localhost:3000/book/${id}`).then((response) => {
          this.blog = response.data.blog;
          console.log(this.blog);
        });
      }
    }
  }
  </script>
