<template>
  <div>
    <!-- component -->
    <div class="flex items-center h-screen w-full justify-center">

      <div class="max-w-xs">
        <div class="bg-white shadow-xl rounded-lg py-3">

          <label class="flex photo-wrapper p-2" for="file-upload">
            <img class="w-32 h-32 rounded-full mx-auto hover:opacity-50"
              :src="(userinfo.user_pic) ? userinfo.user_pic : 'https://pbs.twimg.com/profile_images/1545631138953437184/Bky7FePS_400x400.jpg'"
              alt="John Doe">
          </label>
          <input id="file-upload" type="file" @change="handleFileUpload()" class="hidden">

          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{{ userinfo.user_first_name }}</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
              <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Fullname</td>
                  <td class="px-2 py-2">{{ userinfo.user_first_name }} {{ userinfo.user_last_name }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td class="px-2 py-2">+66 {{ userinfo.user_phone }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">{{ userinfo.user_email }}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3 flex-col">
              <div>
                <button class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium">
                  Edit Profile
                </button>
              </div>
              <div>
                <button class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium"
                  @click="logout()">
                  Logout
                </button>
              </div>
              <button @click="get()">get</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '/plugins/axios';

export default {
  data() {
    return {
      userinfo: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login')
    },

  },
  async created() {
    try {
      this.userinfo = this.$store.getters.getUserInfo;
    } catch (err) {
      console.log(err);
    }
  }


}

</script>

<style></style>
