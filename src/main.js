import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import apiUrls from './assets/apiUrls.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$http = axios

Vue.prototype.$apiUrls = apiUrls

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    // 请求头统一添加token
    const userInfo = sessionStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : router.push('/')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
  // 设置页面标题
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
