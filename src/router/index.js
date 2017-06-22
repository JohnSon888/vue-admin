import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/home'
import Order from '@/page/order/order'
import OrderAdd from '@/page/order/orderAdd'
import Goods from '@/page/goods/goods'
import Client from '@/page/client/client'
import Money from '@/page/money/money'
import Marketing from '@/page/marketing/marketing'
import Statement from '@/page/statement/statement'

Vue.use(Router)

/**
 * router 
 * 1.路由元信息 meta 定义路由的时候可以配置 meta 字段
 */
export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: 'page/order',
            component: Order,
            meta: ['订单', '订货单']
        },{
            path: '/order',
            component: OrderAdd,
            meta: ['订单', '订货单','新增订货单']
        }, {
            path: 'page/goods',
            component: Goods,
            meta: ['商品', '商品列表']
        }, {
            path: 'page/client',
            component: Client,
            meta: ['客户', '客户列表']
        }, {
            path: 'page/money',
            component: Money,
            meta: ['资金', '收款确认']
        }, {
            path: 'page/marketing',
            component: Marketing,
            meta: ['营销', '商品促销']
        }, {
            path: 'page/statement',
            component: Statement,
            meta: ['报表', '订单统计报表']
        }]
    }]
})
