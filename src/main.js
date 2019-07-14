import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入elementUI的样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局的axios不用每次都要引入
import axios from 'axios'
// 给Vue原型上绑定方法
Vue.prototype.axios = axios
// 设置base地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// axios的配置
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log('请求到了哟', config.headers.Authorization)
    // 统一的给config设置 token
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器 返回的数据中直接返回data
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // console.log(response)
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 使用elementUI插件
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
