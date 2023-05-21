import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from './router'
import store from './store'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
createApp(App).use(store).use(router).mount('#app')