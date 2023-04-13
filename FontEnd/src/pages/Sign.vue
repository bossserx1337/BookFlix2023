<template>
  <div class="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
    <h1 class="text-3xl font-bold mb-4">Sign In</h1>
    <form class="max-w-md" @submit.prevent="signIn">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
        <input type="email" id="email" v-model="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 font-bold mb-2">Password:</label>
        <input type="password" id="password" v-model="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
      <router-link to="/signup" class="ml-2 text-blue-600 hover:text-blue-800">Create an account</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('http://localhost:3001/signin', {
          email: this.email,
          password: this.password,
        });
        this.$store.commit('login', this.email);
        console.log(response.data);
        console.log();
        Swal.fire({
                            icon: 'success',
                            title: "Congratulations! You've successfully Login",
                            confirmButtonText: `Go Login`,

                        })
        this.$router.push('/package');
        // redirect to another page or show a success message
      } catch (error) {
        console.error(error.response.data);
      }
    },
  },
};
</script>

<style>
/* add your tailwind styles here */
</style>
