<template>
  <div>
    <!-- component -->
    <div class="flex items-center h-screen w-full justify-center">

      <div class="max-w-xs">
        <form class="bg-white shadow-xl rounded-lg py-3">


          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{{ userinfo.user_first_name }}</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
              <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Fullname</td>
                  <td class="px-2 py-2">
                    <input v-model="userinfo.user_first_name" class="border border-gray-400 px-2 py-1 rounded">
                    <input v-model="userinfo.user_last_name" class="border border-gray-400 px-2 py-1 rounded">
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td class="px-2 py-2">
                    <input v-model="userinfo.user_phone" class="border border-gray-400 px-2 py-1 rounded">
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">
                    <input v-model="userinfo.user_email" class="border border-gray-400 px-2 py-1 rounded">
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3 flex-col">
              <div>
                <button @click="saveProfile()"
                  class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium">
                  Save Profile
                </button>
              </div>
              <div>
                <button class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium"
                  @click="logout()">
                  Logout
                </button>
              </div>
              <!-- <button @click="get()">get</button> -->
            </div>
          </div>
        </form>
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
      file: null,
    };
  },
  methods: {

    async saveProfile() {
      try {
        const formData = new FormData();
        formData.append('user_first_name', this.userinfo.user_first_name);
        formData.append('user_last_name', this.userinfo.user_last_name);
        formData.append('user_phone', this.userinfo.user_phone);
        formData.append('user_email', this.userinfo.user_email);
        await axios.put(`/user/update/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Profile saved successfully.');
      } catch (err) {
        console.log(err);
        alert('Failed to save profile.');
      }
    },



    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    get() {
      alert(JSON.stringify(this.userinfo))
    }

  },
  async created() {
    try {
      this.userinfo = { ...this.$store.getters.getUserInfo };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style>
</style>


