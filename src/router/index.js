import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import View404 from "@/views/404/View404";
import Authentic from "@/views/authentic/Authentic";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/authentic',
    name: 'Authentic',
    component: Authentic,
    meta: {
      title : '欢迎加入福云',
      keepAlive: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: View404,
    meta: {
      title: '你迷路啦',
      keepAlive: true
    }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  routes
})

export default router
