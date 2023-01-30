import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Listings from '@/views/listings.vue'
import About from '@/views/about.vue'
import ListingDetail from '@/views/listingDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Inzeráty',
    component: Listings,
    beforeEnter(to, from, next) {
      if (to.query.id) {
        next({ path: `listing/${to.query.id}` });
      } else {
        next();
      }
    }
  },
  {
    path: '/about',
    name: 'O stránce',
    component: About
  },
  {
    path: '/listing/:id',
    name: 'Inzerát',
    component: ListingDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
