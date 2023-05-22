<template>
  <div>
    <!-- component -->
    <div class="flex items-center h-screen w-full justify-center">
      <div class="max-w-xs">
        <form class="bg-white shadow-xl rounded-lg py-3">

          <label class="flex photo-wrapper p-2" for="file-upload">
            <img class="w-32 h-32 rounded-full mx-auto "  :class="(isEditing) ? '': 'hover:opacity-50'"
              :src="(userinfo.user_pic) ? 'http://localhost:3001/uploads/'+userinfo.user_pic : 'https://img1.ak.crunchyroll.com/i/spire2/12e982651bf610db59f37f2f8c60f0851669241499_main.jpg'">
          </label>
          <input id="file-upload" ref="file" type="file" @change="handleFileUpload()" class="hidden" :disabled="isEditing">
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
                    <input v-model="userinfo.user_first_name" class="border border-gray-400 px-2 py-1 rounded"
                      :disabled="isEditing">
                    <input v-model="userinfo.user_last_name" class="border border-gray-400 px-2 py-1 rounded"
                      :disabled="isEditing">
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td class="px-2 py-2">
                    <input v-model="userinfo.user_phone" class="border border-gray-400 px-2 py-1 rounded"
                      :disabled="isEditing">
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">
                    <input v-model="userinfo.user_email" class="border border-gray-400 px-2 py-1 rounded"
                      :disabled="isEditing">
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center my-3 flex-col">
              <div class="grid gap-x-3">
                <button v-if="!isEditing" @click="saveProfile()"
                  class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium">
                  Save Profile
                </button>
                <button v-if="!isEditing" @click="cancleEdit()"
                  class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium">
                  Cancle Edit
                </button>
                <button v-else @click="editProfile()"
                  class="text-xl text-indigo-500 hover:underline hover:text-indigo-600 font-medium">
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
      isEditing: true,
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
        if(this.file){
          formData.append('user_pic', this.file);
        }
        await axios.put(`/user/update/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$store.dispatch('updateProfile', {
          user_first_name: this.userinfo.user_first_name,
          user_last_name: this.userinfo.user_last_name,
          user_phone: this.userinfo.user_phone,
          user_email: this.userinfo.user_email,
          user_role: this.userinfo.user_role,
          //ชื่อไฟล์รูป
          user_pic: this.file.name,

        });
        alert('Profile saved successfully.');
        this.isEditing = false;
      } catch (err) {
        console.log(err);
        alert('Failed to save profile.');
      }
    },
    editProfile() {
      this.isEditing = !this.isEditing;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    cancleEdit(){
      this.isEditing = false;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
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
