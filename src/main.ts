import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

console.log(process.env.VUE_APP_BASE_URL)

createApp(App).mount('#app')
