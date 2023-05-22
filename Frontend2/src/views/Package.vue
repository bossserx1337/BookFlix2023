<template>
  <div v-if="userinfo.user_status == 'WT'">
    <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg></div>
        <div>
          <p class="font-bold">Wait for Admin to Approve your paymenmt</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
      <h1 class="text-3xl font-bold mb-4">Buy Package</h1>
      <form @submit.prevent="submitForm" class="w-full max-w-md">
        <div class="mb-4">
          <label for="idcard" class="block text-gray-700 font-bold mb-2">Choose a Package</label>
          <select id="package" v-model="packaged" required
            class="block w-full border border-gray-400 p-2 rounded mb-4 text-black">
            <option value="">Select a package</option>
            <option v-for="pkg in packages" :value="pkg.pack_id" :key="pkg.pack_id">{{ pkg.pack_name }}</option>
          </select>
          <div v-if="packaged == 1">
            <img src="https://media.discordapp.net/attachments/1071329877887815690/1096003157215154266/image.png">
            <div class="text-xl text-red-500"> โปรดโอนเงินมาที่ QR CODE ข้างต้น ราคา : 600 บาท</div>
          </div>
          <div v-else-if="packaged == 2">
            <img src="https://media.discordapp.net/attachments/1071329877887815690/1096003157215154266/image.png">
            <div class="text-xl text-red-500"> โปรดโอนเงินมาที่ QR CODE ข้างต้น ราคา : 1050 บาท</div>
          </div>
          <div v-else-if="packaged == 3">
            <img src="https://media.discordapp.net/attachments/1071329877887815690/1096003157215154266/image.png">
            <div class="text-xl text-red-500"> โปรดโอนเงินมาที่ QR CODE ข้างต้น ราคา : 1500 บาท</div>
          </div>
        </div>

        <div class="mb-4">
          <label for="ccnum" class="block text-gray-700 font-bold mb-2">Reciept Image</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" id="file" ref="file" @change="handleFileUpload()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose an image…
                </span>
              </span>
            </label>
          </div>
        </div>

        <div class="field is-grouped mt-3">
          <div class="control">
            <input type="button" class="button is-link" value="submit" @click="submit()">
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '/plugins/axios'
export default {
  data() {
    return {
      idcard: '',
      name: '',
      ccnum: '',
      expdate: '',
      packages: '',
      packaged: '',
      userid: '',
      file: null,
      userinfo: null
    };
  },
  methods: {
    submitForm() {
      // handle form submission here, e.g. send data to server or process locally
      console.log('Submitted:', this.idcard, this.name, this.ccnum, this.expdate);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file)
    },
    submit() {
      var formData = new FormData();
      formData.append("packid", this.packaged);
      formData.append("userid", this.userinfo.user_id)
      formData.append("bill_image", this.file)
      // console.log(this.packaged);

      // console.log(this.file);
      axios.post('/buypackage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then( (response)=> {
        this.$store.dispatch('logout');
        this.$router.push({ path: '/login' })
      })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  },
  // updateUserInfo() {
  //   this.$store.dispatch('updateProfile', {
  //     user_first_name: this.userinfo.user_first_name,
  //     user_last_name: this.userinfo.user_last_name,
  //     user_phone: this.userinfo.user_phone,
  //     user_email: this.userinfo.user_email,
  //     //ชื่อไฟล์รูป
  //     user_pic: this.userinfo.user_pic,
  //     user_role: this.userinfo.user_role,

  //   });

  // },
  async created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.userinfo = { ...this.$store.getters.getUserInfo }
    }
    const packages = await axios.get('/packages');
    console.log(packages.data)
    this.packages = packages.data.packages
  }

};
</script>
