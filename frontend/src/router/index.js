
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import CheckoutView from '@/pages/CheckoutView.vue'
import HomeView from '@/pages/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    path: '/',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.addRoute({
  path: '/checkout',
  component: CheckoutView
})

export default router
