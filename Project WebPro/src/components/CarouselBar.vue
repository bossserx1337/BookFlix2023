<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators m-3">
      <button v-for="(preview, index) in previews" :key="index" type="button" style="padding:3px;" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index"
        class="active btn btn-light ml-2" aria-current="true" aria-label="index"></button>

    </div>
    <div  class="carousel-inner">
      <div v-for="(preview, index) in previews" :key="index"  class="carousel-item active" style="max-height: 720px;" data-bs-interval="5000">
        <img :src="preview.image" class="d-block w-100 h-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
<script>
import previews from '../data/preview.json'

export default {
  name: 'EventBar',
  data() {
    return {
      previews: previews,
    }
  },
}
</script>
