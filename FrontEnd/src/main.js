import { createApp } from 'vue'

import App from './pages/App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
createApp(App).use(store).use(router).mount('#app')
Vue.use(Vuelidate)
