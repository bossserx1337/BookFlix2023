<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ chapterTitle }}</h1>
      <img class="max-w-lg w-full mb-8" :src="chapterImg" alt="Manhwa chapter image">
      <div class="flex justify-between w-full mb-8">
        <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg focus:outline-none">Previous Chapter</button>
        <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg focus:outline-none">Next Chapter</button>
      </div>
      <div class="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
        <p v-for="page in chapterPages" :key="page" class="mb-4">{{ page }}</p>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        chapterTitle: "Chapter 1",
        chapterImg: "https://w0.peakpx.com/wallpaper/368/441/HD-wallpaper-cute-anime-girl-anime-cat-girl-anime-girl-cartoon-cat-girl-cute-anime-thumbnail.jpg",
        chapterPages: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "Vestibulum auctor, eros eu tristique rutrum, enim eros auctor nisi, at bibendum lorem mauris vel enim.",
          "Curabitur pharetra massa quis ante auctor euismod.",
          "Nunc dapibus, odio at fermentum sagittis, enim justo sodales mauris, nec faucibus nisl tortor eu lorem.",
          "Aliquam gravida est eget urna dictum hendrerit.",
          "Donec nec lorem dui. Fusce euismod eros sed dui tincidunt, at fermentum ex dictum.",
        ],
      };
    },
  };
  </script>

  <style scoped>
  /* Add your custom styles here */
  </style>
