import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '@/views/login'
import Detail from '@/views/detail'
import Test from '@/views/test'
Vue.use(VueRouter)




const router = new VueRouter({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }, {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
export default router
