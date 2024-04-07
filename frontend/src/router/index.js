import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import { useAuthStore } from '@/stores/auth'
import MyNotesView from '@/views/MyNotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}, // protected route
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
      meta: {requiresAuth: false}, // public route
    },
    {
      path: '/my-notes',
      name: 'myNotes',
      component: MyNotesView,
      meta: { requiresAuth: true } // protected route
    }
  ]
})

//Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && authStore.token === null) {
    next('/welcome')
  } else {
    next()
  }
})

export default router
