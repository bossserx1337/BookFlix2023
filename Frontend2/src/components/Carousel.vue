<template>
    <div class="swiper-container relative">
        <div class="swiper-wrapper flex justify-center absolute">
            <div v-for="manhwa in manhwas" :key="manhwa.id" class="swiper-slide">
                <img :src="manhwa.image" alt="Manhwa Image" class="h-4/6 w-2/6  object-cover " />
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
    data() {
        return {
            manhwas: [
                { id: 1, image: "https://cdn.shopify.com/s/files/1/0578/8532/7560/products/TrueBeauty.jpg?v=1628750653" },
                { id: 2, image: "https://images.saymedia-content.com/.image/t_share/MTkzNDI2MjE3ODk3NTAyNjI3/the-20-best-father-daughter-manhwa-webtoons-you-must-read.jpg" },
                // Add more manhwa objects as needed
            ],
        };
    },
    mounted() {
        new Swiper(".swiper-container", {
            autoplay: {
                delay: 10000, // Set the delay between slides in milliseconds
            },
            loop: true, // Enable infinite loop
            pagination: {
                el: ".swiper-pagination",
            },
        });
    },
};
</script>

<style>
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center center;
  }
</style>
