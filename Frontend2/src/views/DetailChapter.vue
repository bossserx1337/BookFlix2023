<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-5">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ chapterTitle }}</h1>
    <div v-for="image in chapterImg">
      <img class="max-w-lg w-full" :src="image.image_url" alt="Manhwa chapter image">
    </div>
    <div class="flex justify-between w-full mb-8">
      <a :href="getPrevChapterUrl()"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg focus:outline-none">Previous Chapter</a>
      <a :href="getNextChapterUrl()"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg focus:outline-none"> Next Chapter </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chapterTitle: "Chapter 1",
      chapterImg: [
        "https://w0.peakpx.com/wallpaper/368/441/HD-wallpaper-cute-anime-girl-anime-cat-girl-anime-girl-cartoon-cat-girl-cute-anime-thumbnail.jpg",
      ],
    };
  },
  mounted() {
    this.getBookDetail(this.$route.params.bookid, this.$route.params.chapterid);

  },
  methods: {
    getBookDetail(bookid, chapterid) {
      axios.get(`http://localhost:3001/book/${bookid}/chapter/${chapterid}`).then((response) => {
        this.chapterTitle = response.data.chapter[0].chapter_content
        this.chapterImg = response.data.image;

      }).catch((error) => {
        console.log(error);
        // this.$router.push(`/book/${bookid}/chapter/`);
      })
    },
    getCurrentChapterNumber() {
      // get the current chapter number from the URL
      const currentPath = this.$route.path;
      const chapterNumber = currentPath.match(/\/chapter\/(\d+)/)[1];
      return parseInt(chapterNumber);
    },
    getPrevChapterUrl() {
      const currentChapterNumber = this.getCurrentChapterNumber();
      // decrement the chapter number by 1
      const prevChapterNumber = currentChapterNumber - 1;
      // return the updated URL
      return `/book/${this.$route.params.bookid}/chapter/${prevChapterNumber}`;
    },
    getNextChapterUrl() {
      const currentChapterNumber = this.getCurrentChapterNumber();
      // increment the chapter number by 1
      const nextChapterNumber = currentChapterNumber + 1;
      // return the updated URL
      return `/book/${this.$route.params.bookid}/chapter/${nextChapterNumber}`;
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
