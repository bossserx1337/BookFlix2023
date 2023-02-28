<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators m-3">
      <button type="button" style="padding:3px;" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
        class="active btn btn-light ml-2" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" style="padding:3px;" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
        class="btn btn-light ml-2" aria-label="Slide 2"></button>
      <button type="button" style="padding:3px;" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
        class="btn btn-light ml-2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" style="max-height: 500px;" data-bs-interval="10000">
        <img src="https://www.phoenixnext.com/pub/media/banner/tmp/_LN_Tokidoki_Russia_Vol.4.5_EC_4__1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
      <div class="carousel-item" style="max-height: 500px;" data-bs-interval="5000">
        <img src="https://www.phoenixnext.com/pub/media/brand/tmp/_LN_Spy_KVEC-min_1_.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
      <div class="carousel-item" style="max-height: 500px;" data-bs-interval="9000">
        <img src="https://www.phoenixnext.com/pub/media/banner/tmp/_LN_Kanojo_NTR_Vol.2_EC.jpg" class="d-block w-100" alt="...">
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

export default {
name: 'EventBar',
}
</script>
