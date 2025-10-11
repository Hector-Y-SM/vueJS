<template>
  <div class="dashboard">
    <h2>Panel de Administración</h2>
    <p>Solo administradores pueden ver esto</p>
    <ul>
      <li>Total de posts: 3</li>
      <li>Usuarios registrados: 10</li>
      <li>Comentarios pendientes: 5</li>
    </ul>
    <button @click="handleLogout">volver al inicio</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  router.push('/')
}
</script>