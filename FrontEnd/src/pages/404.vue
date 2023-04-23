<template>
    <!--
      This example requires updating your template:

      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
    <!-- <main class="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
          <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </main> -->
    <div class="relative w-60 h-60"> 
<img  class="absolute top-0 left-0 z-50 opacity-1 transition-opacity hover:opacity-50" src="https://images.unsplash.com/photo-1620862657788-a403bdf6dd63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"/>

  <img  @click = 'clickgo' class="absolute top-0 left-0" src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"/>
</div>
  </template>
<script>
export default{
  methods : {
    clickgo(){
      this.$router.push('/sign')
    }
  }
}

</script>
