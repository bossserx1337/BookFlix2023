<template>
<!-- component -->
<form >
  <div class="mb-4 ml-20">
    <label class="block text-md font-light mb-2" for="username">Username</label>
    <input  v-model = "username" class="w-60 bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="" placeholder="Username">
  </div>
  <div class="mb-4 ml-20">
    <label class="block text-md font-light mb-2" for="password">Password</label>
    <input v-model = "password" class="w-60 bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="Password">
  </div>

  <div class="flex items-center justify-between mb-5 ml-20">
    <button class="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="button" @click="Login()">
      LOGIN
    </button>
    <a class="inline-block align-baseline font-light text-sm text-indigo-600 hover:text-indigo-500" href="#">
      Forgot Password?
    </a>
  </div>
  <p class="text-center text-md font-light">Don't have an account? <a class="font-light text-md text-indigo-600">Create</a></p>
</form>
</template>

<script>
import userdata from "../data/user.json";
export default {
  name: 'Sign',
  components: {
  },
  data() {
    return {
    userdata : userdata,
     username : "",
     password : ""

    }

},
methods : {
      Login(){
        if (this.username === "Lnwboss" && this.password === "1234" ) {
          alert("Welcome " + this.username)
          localStorage.setItem("userdata", JSON.stringify(this.userdata[0]))
          window.location.href = "/" }
          else if (this.username === "admin" && this.password === "admin") {
            alert("Welcome " + this.username)
            localStorage.setItem("userdata", JSON.stringify(this.userdata[1]))
            window.location.href = "/"
          }
        else{
          alert("Incorrect password")
        }
      }
    }}
</script>

<style>

</style>
