<template>
  <div class="post-detail" v-if="post">
    <h2>{{ post.title }}</h2>
    <p class="author">Por: {{ post.author }}</p>
    <div class="content">{{ post.content }}</div>
    <button @click="$router.back()">Volver</button>
  </div>
  <div v-else>
    <p>Post no encontrado</p>
  </div>
</template>

<script setup>

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

// Recibir el id como prop (configurado en router con props: true)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

let startTime;

onMounted(() => {
  loadPost()
  startTime = Date.now() 
})

onBeforeRouteLeave((to, from) => {
  const timeSpent = Date.now() - startTime
  
  if (timeSpent <= 5000) { 
    const answer = window.confirm('realmente quieres salir de la página?')
    if (!answer) return false
  }
})

const post = ref(null)

const postsDB = {
  '1': { id: 1, title: 'Introducción a Vue 3', author: 'Juan', content: 'Contenido completo del post 1...' },
  '2': { id: 2, title: 'Composition API', author: 'María', content: 'Contenido completo del post 2...' },
  '3': { id: 3, title: 'Vue Router 4', author: 'Pedro', content: 'Contenido completo del post 3...' },
}

const loadPost = () => {
  // Obtener post según el ID de la ruta
  post.value = postsDB[props.id] || null
}

//Watch para cuando cambie el parámetro de la ruta
watch(() => props.id, loadPost)
</script>