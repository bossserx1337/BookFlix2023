<template>
    <div class="flex gap-5 flex-row overflow-x-scroll py-3 ">

        <!-- template for book -->
        <div v-for="(book, index) in genres" :key="index"
            class="flex basis-1/6 flex-row h-full scroll-smooth shadow-md rounded-md mr-15 cursor-pointer hover:shadow-lg bg-stone-100 ">
            <div class="h-52 w-60 rounded-lg shadow-md items-center justify-center overflow-hidden">
                <img :src='book.image' class="h-full w-full">
            </div>
            <div class="w-full ph:w-full px-0 flex flex-col justify-center md:h-full pl-3 ph:py-2">
                <h5 class="text-gray-900 text-l font-medium mb-2"> {{ book.title }}</h5>
                <p class="text-gray-700 text-base mb-4"><a class="font-medium">author:</a> {{ book.author }} </p>
                <div
                    class=" text-red-500 hover:text-white border-2 border-red-500 hover:bg-red-500 font-semibold rounded-full p-1 px- w-24 text-center mt-2 ph:text-sm ph:p-2 ph:20 ">
                    Read</div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Genre",
    data() {
        return {
            genres: [
                {
                    title:"action",
                    
                },
            ],
            check: ""
        }
    },
    methods: {

    },

}
</script>

<style>
</style>
