import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/rollercoasters',
        name: 'RollerCoasterOverview',
        component: () => import(/* webpackChunkName: "rollercoaster" */ '@/views/RollerCoasters/Overview.vue')
    },
    {
        path: '/rollercoasters/:id',
        name: 'ManageRollerCoaster',
        component: () => import(/* webpackChunkName: "rollercoaster" */ '@/views/RollerCoasters/Manage.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
