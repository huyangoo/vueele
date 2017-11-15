import Vue from 'vue'
import App from '../App.vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 顶层路由对应index.html
      component: App,
      redirect: '/index',
      children: [ //二级路由。对应App.vue
        {
          path: '/index',
          component: () => import('@/page/index'),
          children: [
            {
              path: 'person/table',
              component: () => import('@/page/person/table')
            }
          ]
        },
        {
          path: '/person/edit/:id?',
          props: true,
          component: () => import('@/page/person/edit')
        }
      ]
    }
  ]
})
