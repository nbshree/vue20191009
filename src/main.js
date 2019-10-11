import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Element, {
  size: 'medium'
  // i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
