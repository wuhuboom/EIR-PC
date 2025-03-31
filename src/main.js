import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './locale';
import dayjs from 'dayjs';
Vue.config.productionTip = false;
import util from '@/plugins/util';
// import element from "./plugins/element";
// Vue.use(element);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import vant from './plugins/vant';
Vue.use(vant);
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);
import '@/assets/page.css';
import '@/assets/base.scss';
import '@/assets/resVant.scss';
const num = process.env.VUE_APP_UNIFIED_NUMBER || 100;
Vue.prototype.divide = (v, fix = true) => {
  if (!fix) {
    return (Math.trunc(v * 100) / 100).toFixed(2); // 始终保留两位小数
  }
  return (Math.trunc((v * 100) / num) / 100).toFixed(2); // 始终保留两位小数
};
Vue.prototype.$betPrice = 2;
Vue.prototype.$dayjsTime = (time = new Date(), f = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(f);
};
Vue.prototype.sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
Vue.prototype.$util = util;
Vue.prototype.$baseURL =
  process.env.NODE_ENV === 'production'
    ? window.BASEPATH
    : process.env.VUE_APP_API;
const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
export default app;
