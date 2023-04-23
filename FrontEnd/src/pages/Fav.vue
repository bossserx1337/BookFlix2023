<template>
   <div class="flex ml-2 gap-x-4 pl-4">
    <div v-for="book in favorite " :key="book.book_id">
      <router-link :to="`/book/${book.book_id}/chapter/`">
        <div class="card w-40 bg-base-100 shadow-xl">
          <figure><img :src="book.book_img" /></figure>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script >
import axios from 'axios';

export default {
    name: 'Fav',
    data() {
        return {
            fav: [],
            userinfo : null,
            favorite : null,
            customerid : null,
        }

    },
    methods: {
        
    },
    components: {

    },
    created() {

    this.email = localStorage.getItem("email");
    axios.get(`http://localhost:3001/userinfo/${this.email}`)
      .then((response) => {
        this.userinfo = response.data.userinfo;
        this.customerid = response.data.userinfo[0].customer_id;
        console.log(this.customerid);
        axios.get(`http://localhost:3001/favorite/${this.customerid}`)
      .then((response) => {
        this.favorite = response.data.favorite;
        console.log(this.favorite[0].book_id);

      })
      .catch((err) => {
        console.log(err);
      });
      })
      .catch((err) => {
        console.log(err);
      });
    

  
}
}
</script>

<style>
</style>
