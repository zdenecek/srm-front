import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import router from './router'
import { Chart, registerables } from 'chart.js';

export const firefoxUrl = process.env.VUE_APP_FIREFOX_EXTENSION_DOWNLOAD_URI;
export const chromeUrl = process.env.VUE_APP_CHROME_EXTENSION_DOWNLOAD_URI;

Chart.register(...registerables);

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

createApp(App).use(router)
    .use(VueAwesomePaginate)
    .mount("#app");
