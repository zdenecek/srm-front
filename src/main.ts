import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
// import VueAwesomePaginate from "vue-awesome-paginate";
// import "vue-awesome-paginate/dist/style.css";
import router from "./router";
import { Chart, registerables } from "chart.js";
import tippy from "tippy.js";
import { createHead } from "@unhead/vue";

const head = createHead();

export const firefoxUrl = process.env.VUE_APP_FIREFOX_EXTENSION_DOWNLOAD_URI;
export const chromeUrl = process.env.VUE_APP_CHROME_EXTENSION_DOWNLOAD_URI;

Chart.register(...registerables);

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

window.addEventListener("load", function () {
    // @ts-ignore
    tippy("[data-tooltip]", {
        allowHTML: true,
        content: (reference) => reference.getAttribute("data-tooltip"),
        onMount(instance) {
            // @ts-ignore

            instance.popperInstance.setOptions({
                // @ts-ignore
                trigger:  instance.reference.getAttribute("data-trigger") ?? "focus",
                // @ts-ignore
                placement: instance.reference.getAttribute("data-placement") ?? "bottom",
            });
        },
    });
});

createApp(App)
.use(router)
.use(head)
.mount("#app");
