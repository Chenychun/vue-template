import '@babel/polyfill'
import Vue from 'vue'
import axios from './network/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 日期转换插件
import moment from 'moment'
import Vuex from 'vuex'
/* ---iview4.0---*/
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import util from './utils'
import Vab from './utils/vab'
import './styles/index.scss'
import 'animate.css'
// 引入echarts
import * as echarts from 'echarts'

/* ------------挂---------- */
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Vuex) // 注入 Vuex
Vue.use(ViewUI)
Vue.use(Vab)
Vue.prototype.$moment = moment
Vue.prototype.$util = util
Vue.prototype.$BAIDU_URL = process.env.VUE_APP_BAIDU_URL
// 将i18n挂载在vue实例下
Vue.locale = () => {}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
