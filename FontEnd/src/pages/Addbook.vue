<template>
  <div class="max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add Book</h1>
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
        <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">Add Book</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      trainnum: null,
      date: null,
      routeid: null,
    }
  },
  methods: {
    addLike() {

    },
    submit() {
      var formData = new FormData();
      formData.append("bookname", this.bookname)
      formData.append("bookdesc", this.bookdesc)
      formData.append("bookimg", this.bookimg);
      formData.append("authorid", this.authorid);
      formData.append("pubid", this.pubid);

      console.log(formData);
      axios.post('http://localhost:3001/addbook', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
        Swal.fire(
          response.data,
          'Add Book Already',
          'success'
        )
      })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(error.message);
        });
    },

  }
}
</script>

