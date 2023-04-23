<template>
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Edit Book</h1>
      <form @submit.prevent="updateBook">
        <div class="mb-4">
          <label class="block font-bold mb-2">Book ID</label>
          <input class="border rounded w-full py-2 px-3" type="text" v-model="book.id">
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2">Book Name</label>
          <input class="border rounded w-full py-2 px-3" type="text" v-model="book.title">
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2">Book img</label>
          <input class="border rounded w-full py-2 px-3" type="text" v-model="book.title">
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2">Author</label>
          <input class="border rounded w-full py-2 px-3" type="text" v-model="book.author">
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2">Publisher</label>
          <input class="border rounded w-full py-2 px-3" type="text" v-model="book.publisher">
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2">Genre</label>
          <select class="border rounded w-full py-2 px-3" v-model="book.Genre">
            <option value="">-- Select a type --</option>
            <option v-for="type in types" :value="type">{{ type }}</option>
          </select>
          <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">Add more genre</button>
        </div>
        <div class="mt-8">
          <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">Update Book</button>
        </div>
      </form>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        book: {},
        types: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance'],
      }
    },
    async created() {
      // Fetch the book data from the API using Axios
      const bookId = this.$route.params.id;
      const response = await axios.get(`http://localhost:3001/books/${bookId}`);
      this.book = response.data;
    },
    methods: {
      async updateBook() {
        // Send a PUT request to update the book data in the API using Axios
        const bookId = this.$route.params.id;
        await axios.put(`http://localhost:3001/books/${bookId}`, this.book);
        // Redirect the user to the book details page
        this.$router.push(`http://localhost:3001/books/${bookId}`);
      }
    }
  }
  </script>
