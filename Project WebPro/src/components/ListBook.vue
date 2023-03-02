<template>




    <!-- drop down -->

    <label for="genre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Genre</label>
    <select id="genre" v-model="genre"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a genre</option>
        <option v-for="(genre, index ) in genrelists" :key="index" :value="genre">{{ genre }}</option>
    </select>




    <!-- list Book -->
    <div class="flex gap-5 flex-row overflow-x-scroll py-3 ">

        <!-- template for book -->
        <div v-for="(book, index) in books" :key='index' v-show="book.genre.includes(genre.toLowerCase()) || genre == 'Choose a genre'"
            class="flex basis-1/4 flex-col h-full scroll-smooth shadow-md rounded-md mr-15 cursor-pointer hover:shadow-lg bg-stone-100 ">

            <div class="h-50 w-full rounded-lg shadow-md items-center justify-center overflow-hidden">
                <img :src='book.image'>
            </div>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
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

        }

    }
}
</script>

<style>
</style>
