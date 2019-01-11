/*import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)*/

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/view/index'], resolve),
      redirect: "/indexPage",
      children: [
        {
          path: 'indexPage',
          name: 'index-page',
          component: resolve => require(['@/view/indexPage'], resolve),
        }, {
          path: 'forOurs',
          name: 'for-ours',
          component: resolve => require(['@/view/forOurs'], resolve),
        }, {
          path: 'someNote',
          name: 'some-note',
          component: resolve => require(['@/view/someNote'], resolve),
        }, {
          path: 'myIntroduce',
          name: 'my-introduce',
          component: resolve => require(['@/view/myIntroduce'], resolve),
        }, {
          path: 'messTome',
          name: 'mess-tome',
          component: resolve => require(['@/view/messTome'], resolve),
        }, {
          path: 'selfDetail',
          name: 'self-detail',
          component: resolve => require(['@/view/selfDetail'], resolve),
        }
      ]
    }
  ]
})
