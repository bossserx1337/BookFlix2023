<template>
    <carousel>
        <slide v-for="(book, index) in books" :key="index">
            <div
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

        </slide>

    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
    name: "Carousel",
    data() {
        return {
            books: [
                {
                    title: "Harry Potter and the Philosopher's Stone",
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/cb9e1040-9097-41bc-b312-a85e726ddb58/harry-potter-philosophers-stone.jpg?auto=webp&width=914&height=1371&crop=0.667:1,smart'
                },
                {
                    title: 'Harry Potter and the Chamber of Secrets',
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/4070adc6-36b5-41c8-8266-995f068c8180/english-harry-potter-2-epub-9781781100226.jpg?auto=webp&width=1200&height=1800&crop=0.667:1,smart'
                },
                {
                    title: 'Harry Potter and the Prisoner of Azkaban',
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/097d9d47-194d-491d-8059-a6c6c6eb0716/english-harry-potter-3-epub-9781781100233.jpg?auto=webp&width=1200&height=1800&crop=0.667:1,smart'
                },
                {
                    title: 'Harry Potter and the Goblet of Fire',
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/e7a793ea-2148-41f6-8b34-219fc21a3408/english-harry-potter-4-epub-9781781105672.jpg?auto=webp&width=1200&height=1800&crop=0.667:1,smart'
                },
                {
                    title: 'Harry Potter and the Order of the Phoenix',
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/1eded690-a308-4c16-a7b9-31dd7f8c2ed0/english-harry-potter-5-epub-9781781100240.jpg?auto=webp&width=1200&height=1800&crop=0.667:1,smart'
                },
                {
                    title: 'Harry Potter and the Half-Blood Prince',
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/2a650159-14c6-4efd-8ae4-8496ca920770/english-harry-potter-6-epub-9781781100257.jpg?auto=webp&width=1200&height=1800&crop=0.667:1,smart'
                },
                {
                    title: 'Harry Potter and the Deathly Hallows',
                    author: 'J.K. Rowling',
                    image: 'https://sportshub.cbsistatic.com/i/2022/06/10/91e49e5d-41c3-4252-a649-fbf540595907/english-harry-potter-7-epub-9781781100264.jpg?auto=webp&width=1200&height=1800&crop=0.667:1,smart'
                }

            ],
            check: ""
        }
    },
    components: {
        Carousel,
        Slide
    },
}

</script>

<style>
</style>
