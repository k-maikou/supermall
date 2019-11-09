import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端3000ms的延迟
FastClick.attach(document.body)

// 图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
