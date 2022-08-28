import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Listings from '@/views/listings.vue'
import About from '@/views/about.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Listings',
    component: Listings
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
