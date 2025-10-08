<template>
  <div class="dashboard">
    <h2>Panel de Administración</h2>
    <p>Solo administradores pueden ver esto</p>
    <ul>
      <li>Total de posts: 3</li>
      <li>Usuarios registrados: 10</li>
      <li>Comentarios pendientes: 5</li>
    </ul>
    <button @click="handleLogout">salir</button>
  </div>
</template>

<script setup>
import { useAuth } from '@/services/useAuth'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'


const authStore = useAuthStore()
const user = useAuth()
const router = useRouter()

const handleLogout = () => {
  user.signOut()
  authStore.logout()
  router.push('/')
}
</script>