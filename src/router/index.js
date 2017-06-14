import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TopBar from '@/components/common/topBar'
import LeftNav from '@/components/common/leftNav'
import Home from '@/page/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
