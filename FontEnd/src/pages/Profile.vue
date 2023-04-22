<template>
  <div v-for="user in userinfo" :key="(user.customer_displayname) ? user.customer_displayname : user.admin_username">
    <!-- component -->
    <div class="flex items-center h-screen w-full justify-center">

      <div class="max-w-xs">
        <div class="bg-white shadow-xl rounded-lg py-3">

          <label class="flex photo-wrapper p-2" for="file-upload">
            <img class="w-32 h-32 rounded-full mx-auto hover:opacity-50"
              :src="(user.customer_pic) ? user.customer_pic : 'https://pbs.twimg.com/profile_images/1545631138953437184/Bky7FePS_400x400.jpg'"
              alt="John Doe">
          </label>
          <input id="file-upload" type="file" @change="handleFileUpload()" class="hidden">

          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{{ user.customer_firstN }}</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
              <p>Web Developer</p>
            </div>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Fullname</td>
                  <td class="px-2 py-2">{{ user.customer_firstN }} {{ user.customer_lastN }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td class="px-2 py-2">+66 {{ user.customer_phone }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">{{ user.customer_email }}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3 flex-col">
              <div>
                <button class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium"
                  @click="editProfile()">
                  Edit Profile
                </button>
              </div>
              <div>
                <button class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium"
                  @click="logout()">
                  Logout
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userinfo: null,
      customer_pic: null,
      isEditing: false,
      updatedUserInfo: {},
      errors: {},
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/sign');
    },
    handleFileUpload() {
      this.customer_pic = this.$refs.file.files[0];
    },
    async editProfile() {
      // Set isEditing to true to display the form for editing
      this.isEditing = true;
      // Set the updatedUserInfo object to the current user information
      this.updatedUserInfo = { ...this.userinfo[0] };
    },

  },
  async created() {
    try {
      this.email = localStorage.getItem("email");
      const response = await axios.get(`http://localhost:3001/userinfo/${this.email}`);
      this.userinfo = response.data.userinfo;
      console.log(this.email);
      console.log(this.userinfo);
    } catch (err) {
      console.log(err);
    }
  }


}

</script>

<style>
</style>
