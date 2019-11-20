import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import { mockXHR } from '../mock'

import * as filters from './filters' // global filters

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
Vue.use(Element, {
  size: 'medium'
  // i18n: (key, value) => i18n.t(key, value)
})

// 全局添加格式化规则
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
