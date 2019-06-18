import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import companyList from './views/companyList.vue'
import detailPage from './views/detail.vue'
import Register from './views/register.vue'
import main from './views/main.vue'
import userPage from './views/user.vue'
import login from './views/login.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            component: userPage,
            children: [{
                    path: '',
                    name: "login",
                    component: login
                },
                {
                    path: '/register',
                    name: 'register',
                    component: Register
                }
            ]
        },
        {
            path: '/',
            name: 'login',
            redirect: '/login'
        },
        {
            path: '/home',
            component: main,
            children: [{
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

        },
    ]
})