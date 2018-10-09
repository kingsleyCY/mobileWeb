import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/view/index'),
      redirect: "/indexPage",
      children: [
        {
          path: 'indexPage',
          name: 'index-page',
          component: () => import('@/view/indexPage'),
        },{
          path: 'forOurs',
          name: 'for-ours',
          component: () => import('@/view/forOurs'),
        },{
          path: 'someNote',
          name: 'some-note',
          component: () => import('@/view/someNote'),
        },{
          path: 'myIntroduce',
          name: 'my-introduce',
          component: () => import('@/view/myIntroduce'),
        },{
          path: 'messTome',
          name: 'mess-tome',
          component: () => import('@/view/messTome'),
        }
      ]
    }
  ]
})
