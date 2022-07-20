import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'

Vue.use(VueRouter)
Vue.use(ViewUI)
// 路由懒加载

const routes = [
  {
    path: '/',
    redirect: 'HelloWorld',
    meta: '首页',
    component: () => import('views/HelloWorld.vue')
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    meta: '首页',
    component: () => import('views/HelloWorld.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: '首页',
    component: () => import('views/test.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta
  // iview顶部loading
  // ViewUI.LoadingBar.start();
  next()
})
// eslint-disable-next-line no-unused-vars
router.afterEach(route => {
  // ViewUI.LoadingBar.finish();
})

export default router
