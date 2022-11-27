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
import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import {MessageBox} from "element-ui";
import 'dayjs/locale/zh-cn'
import Icon from 'vue-awesome/components/Icon'
const dayjs = require('dayjs');

dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;
Vue.prototype.$confirm = MessageBox.confirm

Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})

Vue.use(ElementUI);
Vue.use(Buefy);

Vue.config.productionTip = false
Vue.component('v-icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
