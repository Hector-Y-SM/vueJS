<template>
  <div id="app">
    <AppHeader v-if="authStore.isAuthenticated" />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AppHeader from './components/AppHeader.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.checkAuth()
})
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
}
</style>