<template>
    <div class="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
      <h1 class="text-3xl font-bold mb-4">Buy Package</h1>
      <form @submit.prevent="submitForm" class="w-full max-w-md">
        <div class="mb-4">
          <label for="idcard" class="block text-gray-700 font-bold mb-2">ID Card:</label>
          <input type="text" id="idcard" v-model="idcard" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="text" id="name" v-model="name" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <div class="mb-4">
          <label for="ccnum" class="block text-gray-700 font-bold mb-2">Credit Card Number:</label>
          <input type="text" id="ccnum" v-model="ccnum" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <div class="mb-4">
          <label for="expdate" class="block text-gray-700 font-bold mb-2">Expiration Date:</label>
          <input type="text" id="expdate" v-model="expdate" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <div class="flex justify-end">
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Buy
          </button>
        </div>
      </form>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        idcard: '',
        name: '',
        ccnum: '',
        expdate: '',
      };
    },
    methods: {
      submitForm() {
        // handle form submission here, e.g. send data to server or process locally
        console.log('Submitted:', this.idcard, this.name, this.ccnum, this.expdate);
      },
    },
  };
  </script>
