import { createRouter, createWebHistory } from 'vue-router'
import PostDetail from '../views/PostDetail.vue'
import NotFound from '../views/NotFound.vue'
import UserProfile from '@/views/UserProfile.vue'
import { supabase } from '@/supabase'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
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
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
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
  const { data: { user } } = await supabase.auth.getUser()

  if (to.meta.requiresAuth && !user) {
    console.log('aqui');
    next('/login')
  } else if (to.path === '/login' && user) {
    console.log('noo');
    next('/dashboard')
  } else {
    console.log('???');
    next()
  }
})

export default router