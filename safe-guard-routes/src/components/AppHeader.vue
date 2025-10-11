<template>
  <header v-if="user && !isRestrictedRoute" class="app-header">
    <div class="header-content">
      <h1>Mi Aplicación</h1>
      <div class="user-info">
        <router-link to="/profile">
          <span class="user-name">{{ user.email }}</span>
        </router-link>
        <span class="user-role" :class="`role-admin`">
          {{ roleLabel }}
        </span>

        <button @click="handleLogout" class="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/services/useAuth'

const { user, signOut } = useAuth()
const router = useRouter()
const route = useRoute()

const restrictedRoutes = [
  '/forgot-password',
  '/reset-password',
  '/login'
]

const isRestrictedRoute = computed(() => {
  return restrictedRoutes.includes(route.path)
})

const roleLabel = computed(() => {
  const roles = {
    admin: 'Administrador',
    user: 'Usuario',
    moderator: 'Moderador'
  }

  return 'Moderador' //añadirles roles a la db
})

const handleLogout = async () => {
    const {data, err} = await signOut();
  if(!err){
    router.push('/')
  }
}


</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.user-role {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.role-admin {
  background: #fee;
  color: #c33;
}

.role-user {
  background: #efe;
  color: #3c3;
}

.role-moderator {
  background: #eef;
  color: #33c;
}

.logout-button {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.logout-button:hover {
  background: #5568d3;
}
</style>