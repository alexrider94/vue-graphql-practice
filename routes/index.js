import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../src/components/Login.vue'
import Body from '../src/components/Body.vue'
import NotFound from '../src/components/NotFound.vue'
import Menu from '../src/components/Menu.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Menu,
        },
        {
            path: '/Search',
            component: Body
        },
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/Login',
            component: Login
        }
    ]
})  