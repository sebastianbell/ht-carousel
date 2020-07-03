import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

let url = "https://run.mocky.io/v3/6d1e82b6-26e3-4c12-951b-fadbf008cff4";

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
