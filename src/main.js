import Vue from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import Icon from "vue-svg-icon/Icon.vue";
import scroll from 'vue-seamless-scroll';
import App from './App.vue'
import router from '@/router'
import '@/router/routerControl';
import store from './store'
import '@/assets/theme/element-#41B883/index.css'
import '@/assets/styl/index'
// import { mockXHR } from '../mock'

import * as filters from './filters' // global filters
import i18n from '@/lang'

Vue.component("icon", Icon);

if (process.env.NODE_ENV === 'production') {
  // mockXHR()
}
Vue.use(scroll);
Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

// 全局添加格式化规则
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
