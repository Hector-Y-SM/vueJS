<template>
  <div class="profile">
    <div v-if="!isSettingsRoute">
      <div v-if="currentUser">
        <h1>perfil de</h1>
        <h1>{{ currentUser.email }}</h1>
        <router-link to="/profile/settings" class="settings-button">
          Ir a Configuración
        </router-link>
        <router-link to="/" class="settings-button">
          volver al inicio
        </router-link>
      </div>
      <div v-else>
        Cargando...
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
    import { useAuth } from '@/services/useAuth'
    import { computed, onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'

    const { getUser } = useAuth()
    const currentUser = ref(null)
    
    const route = useRoute()
    const isSettingsRoute = computed(() => {
      return route.path === '/profile/settings'
    })

    onMounted(async () => {
      currentUser.value = await getUser()
    })    
</script>