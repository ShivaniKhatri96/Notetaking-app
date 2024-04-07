import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import { useAuthStore } from '@/stores/auth'

// temporary
const isAuthenticated = false
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: isAuthenticated ? HomeView : WelcomeView
    },
    {
      path: '/my-notes',
      name: 'myNotes',
      // route level code-splitting
      // this generates a separate chunk (myNotes.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyNotesView.vue'),
      meta: { requiresAuth: true } // protected route
    }
  ]
})

//Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && authStore.token === null) {
    next('/')
  } else {
    next()
  }
})

export default router
