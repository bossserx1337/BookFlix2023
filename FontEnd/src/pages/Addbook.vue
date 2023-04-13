<template>
    <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
        Enter Bookname
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="bookname" class="bg-gray-200 appearance-none border-2 
      border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
       focus:bg-white focus:border-purple-500" name="bookname" type="text">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
       Enter Book Desc
      </label>
    </div>
    <div class="md:w-2/3">
      <input  v-model="bookdesc" class="bg-gray-200 appearance-none border-2
       border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="bookdesc" >
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Book img url
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="bookimg" class="bg-gray-200 appearance-none border-2
       border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
       focus:outline-none focus:bg-white focus:border-purple-500" name="bookimg" >
    </div>
    
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Author id
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="authorid" class="bg-gray-200 appearance-none border-2
       border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
       focus:outline-none focus:bg-white focus:border-purple-500" name="authorid" >
    </div>
    
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Publisher id
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="pubid" class="bg-gray-200 appearance-none border-2
       border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
       focus:outline-none focus:bg-white focus:border-purple-500" name="pubid" >
    </div>
    
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline
       focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" @click=" submit()">
        Add
      </button>
    </div>
  </div>
</form>
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
      addLike(){
        
      },
      submit(){
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

