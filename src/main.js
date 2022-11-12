import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/assets/css/app.css'
import format from 'date-fns/format'
import '@/permission'
import relativeTime from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;

Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})

Vue.use(ElementUI);
Vue.use(Buefy);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
