import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import companyList from './views/companyList.vue'
import detailPage from './views/detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: "home",
      component: Home,
    },
    {
      path: '/:companyID',
      name: 'detail',
      component: detailPage
    }
  ]
  // routes: [{
  //     path: '/',
  //     component: Home,
  //     children: [{
  //         path: "",
  //         name: "home",
  //         component: companyList
  //       },
  //       {
  //         path: '/',
  //         name: 'companyList',
  //         component: companyList
  //       }, {
  //         path: '/:companyID',
  //         name: 'detail',
  //         component: detailPage
  //       }
  //     ]
  //   },
  //   // {
  //   //   path: '/about',
  //   //   name: 'about',
  //   //   // route level code-splitting
  //   //   // this generates a separate chunk (about.[hash].js) for this route
  //   //   // which is lazy-loaded when the route is visited.
  //   //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  //   // }
  // ]
})