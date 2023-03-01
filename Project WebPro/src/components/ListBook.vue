<template>
    <!-- list Book -->

    <div class="flex gap-5 flex-row overflow-x-scroll py-3 ">

        <!-- template for book -->
        <div v-for="(book, index) in books" :key="index"
            class="flex basis-1/4 flex-col h-full scroll-smooth shadow-md rounded-md mr-15 cursor-pointer hover:shadow-lg bg-stone-100 ">

            <div class="h-50 w-full rounded-lg shadow-md items-center justify-center overflow-hidden">
                <img :src='book.image'>
            </div>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="addtofav(book)">
  favorite
</button>
            </div>

        </div>
    </div>
</template>

<script>
import books from "../data/book.json";
export default {
    name: "ListBook",
    data() {
        return {
            books: books,
            fav : []
        }
    },
    methods: {
        addtofav(item){
                if(this.fav.includes(item)){
                        this.fav[this.fav.indexOf(item)].quantity++
                    }else{
                        item.quantity = 1
                        this.fav.push(item)

            }
            localStorage.setItem("book", JSON.stringify(this.fav))
    },

}}
</script>

<style>
</style>
