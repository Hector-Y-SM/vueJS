import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'
import UserProfile from '@/views/UserProfile.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostList.vue'),
    meta: { requiresAuth: true }
  },
  /*{
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { 
      requiresAuth: true,
      requiresRole: ['admin']
    }
  }*/,
  {
    // Ruta dinámica con parámetro :id
    path: '/posts/:id',
    name: 'post-detail',
    component: PostDetail,
    // Guard: Requiere autenticación para ver detalles
    meta: { requiresAuth: true },
    // Pasar el id como prop al componente
    props: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    // Guard: Solo administradores
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    // Ruta catch-all para 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Verificar autenticación al iniciar
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresRole = to.meta.requiresRole

  if (requiresAuth && !authStore.isAuthenticated) {
    // Guardar la ruta a la que intentaba acceder
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else if (requiresRole && !requiresRole.includes(authStore.userRole)) {
    // Usuario no tiene el rol necesario
    next({ name: 'Home' })
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    // Si ya está autenticado y va a login, redirigir a home
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router