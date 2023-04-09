<template>
  <div class="flex justify-center">
    <div v-for="(book, index) in fav" :key="index"
          class="flex basis-1/4 flex-col h-full scroll-smooth shadow-md rounded-md mr-15 cursor-pointer hover:shadow-lg bg-stone-100 ">

          <div class="h-50 w-full rounded-lg shadow-md items-center justify-center overflow-hidden">
              <img :src='book.image'>
          </div>
          <div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="addtofav(book)">
favorite
</button>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="removefav(book)">
delete
</button>
          </div>

      </div>
</div>
</template>

<script>

export default {
name: 'Fav',
data(){
  return {
          fav : []
      }

},
methods : {
removefav(item){
                  this.fav.splice(this.fav.indexOf(item), 1)
                  localStorage.setItem("book", JSON.stringify(this.fav))

              },
},
components: {

},
created(){
              this.fav=  JSON.parse(localStorage.getItem("book"))


          }

}
</script>

<style>

</style>
