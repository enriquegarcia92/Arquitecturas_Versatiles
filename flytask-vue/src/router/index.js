import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Taskboard from '@/views/Taskboard.vue';
import PasswordRecovery from '@/views/PasswordRecovery.vue';

const BASE_PATH = '/'
console.log(BASE_PATH);
const routes = [
  {
    path: `${BASE_PATH}login`,
    name: 'login',
    component: Login
  },
  {
    path: `${BASE_PATH}register`,
    name: 'register',
    component: Register
  },
  {
    path: `${BASE_PATH}board`,
    name: 'board',
    component: Taskboard,
    meta: { requiresAuth: true } // Example of meta field for private routes
  },
  {
    path: `${BASE_PATH}passwordRecovery`,
    name: 'passwordRecovery',
    component: PasswordRecovery
  },
  {
    path: `${BASE_PATH}`, // Default route, e.g., `${BASE_PATH}/`
    name: 'emptyUrl',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*', // Catch all route for 404 Not Found
    name: 'NotFound',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
