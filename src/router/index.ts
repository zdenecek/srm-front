import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Listings from '@/views/listings.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Listings',
    component: Listings
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
