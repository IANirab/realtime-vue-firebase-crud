import Vue from "vue";
import App from "./App.vue";
import VueFire from "vuefire";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";

Vue.use(VuejsDialog);
Vue.use(VueFire);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
