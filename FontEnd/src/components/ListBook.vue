<template>




    <!-- drop down -->


    <label for="genre" class="block mb-2 text-lg font-medium text-gray-900 dark:text-black bg-white">Select Genre</label>
    <select id="genre" v-model="genre"
        class="text-center  bg-amber-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a genre</option>
        <option v-for="(genre, index ) in genrelists" :key="index" :value="genre">{{ genre }}</option>
    </select>



    <!-- list Book -->

    <label for="genre" class="block mb-2 text-2xl font-medium text-gray-900 dark:text-black bg-white text-center">New Arrival</label>

    <div class="flex gap-5 flex-row overflow-x-scroll py-6 bg-white ml-40 mr-20">


        <!-- template for book -->
        <div v-for="(book, index) in books" :key='index' v-show="book.genre.includes(genre.toLowerCase()) || genre == 'Choose a genre'"
            class="flex basis-48 flex-col h-full scroll-smooth shadow-md  mr-15 cursor-pointer hover:shadow-lg bg-white">

            <div class="h-50 w-full shadow-md items-center justify-center overflow-hidden">
                <img :src='book.image'>
            </div>
            <div>
                <button class="bg-slate-900  hover:bg-blue-700 text-white font-bold py-2 px-4  w-full"
                    @click="addtofav(book)">
                    favorite
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import books from "../data/book.json";
import genrelists from "../data/genre.json";
export default {
    name: "ListBook",
    data() {
        return {
            books: books,
            fav: [],
            genre: "Choose a genre",
            genrelists: genrelists,
            search: "",
        }
    },
    methods: {
        addtofav(item) {
            if (this.fav.includes(item)) {
                this.fav[this.fav.indexOf(item)].quantity++
            } else {
                item.quantity = 1
                this.fav.push(item)

            }
            localStorage.setItem("book", JSON.stringify(this.fav))
        },
        searchBook() {

        },

    },
    created(){
                this.fav=  JSON.parse(localStorage.getItem("book"))


    }
}
</script>

<style>
</style>
