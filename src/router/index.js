import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/home'
import Order from '@/page/order/order'
import Goods from '@/page/goods/goods'
import Client from '@/page/client/client'
import Money from '@/page/money/money'
import Marketing from '@/page/marketing/marketing'
import Statement from '@/page/statement/statement'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/page',
        name: 'Home',
        component: Home,
    }, {
        path: '/order',
        component: Order
    }, {
        path: '/page/goods',
        component: Goods
    }, {
        path: '/page/client',
        component: Client
    }, {
        path: '/page/money',
        component: Money
    }, {
        path: '/page/marketing',
        component: Marketing
    }, {
        path: '/page/statement',
        component: Statement
    }]
})
