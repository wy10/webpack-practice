import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../page/login.vue'
import Detail from '../page/detail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            label: '登录',
            component: Login,
        },
        {
            path: '/detail',
            name: 'detail',
            label: '详情',
            component: Detail,
        },
        {
            path:'*',
            redirect:'/login'
        }
    ]
})


export default router