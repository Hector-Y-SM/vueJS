<template>
  <div class="home">
    <h1>Bienvenido al Blog</h1>
    <p v-if="currentUser">
      Hola, {{ currentUser.email }}! 
    </p>
    <p v-else>Por favor, inicia sesión para acceder a todo el contenido</p>
    
    <nav>
      <router-link to="/posts">Ver Posts</router-link> |
      <router-link to="/login" v-if="!currentUser">Login</router-link>
      <router-link to="/dashboard" v-if="currentUser">Dashboard</router-link>
      <button v-if="currentUser" @click="handleLogout">Logout</button>
    </nav>
  </div>
</template>

<script setup>
import { useAuth } from '@/services/useAuth'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const { getUser, signOut } = useAuth()
const currentUser = ref(null)
const router = useRouter()

const handleLogout = async () => {
  const {data, err} = await signOut();
  if(!err){
    currentUser.value = null;
      router.push('/')
  }
}

onMounted(async () => {
  currentUser.value = await getUser()
  //console.log('Current user:', currentUser.value.aud)
})

</script>