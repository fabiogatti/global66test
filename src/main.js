import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import router from "./router";
import axios from "axios";
import VueAxios from 'vue-axios'

library.add(fas);

createApp(App)
  .use(router)
  .use(VueAxios,axios)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .mount("#app");
