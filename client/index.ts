import Vue from "vue";
import App from "@/App.vue";
import axios from '@/lib/axiosInterceptors';
import createRouter from "@/config/router";
import createStore from "@/config/store";
import AtComponents from "at-ui";
import { Base64 } from "js-base64";

Vue.use(AtComponents);

Vue.prototype.axios = axios;

// 引入js-base64对url加密
Vue.prototype.$Base64 = Base64;
// 引入过滤器
import './lib/dateFormat.ts';
import './lib/textFilter.ts';

const router = createRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
