import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'

// temporary
const isLoggedIn = false
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: isLoggedIn ? HomeView : WelcomeView,
    },
    {
      path: '/my-notes',
      name: 'myNotes',
      // route level code-splitting
      // this generates a separate chunk (myNotes.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyNotesView.vue')
    }
  ]
})

export default router
