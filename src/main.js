import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/assets/css/app.css'

Vue.use(ElementUI);
Vue.use(Buefy);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title === undefined?'福云':to.meta.title
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
