import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import router from './router'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

console.log(process.env.VUE_APP_BASE_URL);

createApp(App).use(router)
    .use(VueAwesomePaginate)
    .mount("#app");
