import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Users from './components/users.vue'
// 只要模块化的环境，vue想要使用插件， 就必须调用vue.use方法
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  // 判断to, to去哪儿
  // to只要不是去login,都应该判断是否有token
  // to如果是去/login, 不管有没有token可以直接 next()
  // to不是去/login， 判断是否有token直接放行， 否则去login

  const token = localStorage.getItem('token')
  // if (to.path === '/login') {
  //   return next()
  // }
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
