import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import axios from 'axios'
import hljs from 'highlight.js'

import Message from './components/baseComponents/Message/index.js'

import '@/assets/main.scss'

axios.defaults.baseURL = 'http://www.yanfenghua.cn:4000'

Vue.config.productionTip = false

Vue.use(Message)
Vue.use(hljs.vuePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
