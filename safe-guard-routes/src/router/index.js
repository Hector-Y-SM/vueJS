import { createRouter, createWebHistory } from 'vue-router'
import PostDetail from '../views/posts/PostDetail.vue'
import NotFound from '../views/NotFound.vue'
import { supabase } from '@/lib/supabase'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/user/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/posts/PostList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/auth/SignUp.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/reset-password',
    name:'resetPassword',
    component: () => import('../views/auth/ResetPassword.vue'),
    meta: { requiresAuth: true }
  },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/auth/ForgotPassword.vue'),
      meta: { requiresAuth: false }
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
    component: () => import('../views/user/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/user/Profile.vue'),
    meta: { requiresAuth: true },

    //ruta anidada
    children: [{
      path: 'settings',
      name: 'ProfileSettings',
      component: () => import('../views/user/ProfileSettings.vue'),
      meta: { requiresAuth: true },

    }]
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
    next('/')
  } else {
    console.log('???');
    next()
  }
})

export default router