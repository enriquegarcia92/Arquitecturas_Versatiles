import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Taskboard from '@/views/Taskboard.vue'
import PasswordRecovery from '@/views/PasswordRecovery.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/board',
      name: 'board',
      component: Taskboard
    }, 
    {
      path: '/passwordRecovery', 
      name: 'passwordRecovery', 
      component: PasswordRecovery
    }
  ]
})

export default router
