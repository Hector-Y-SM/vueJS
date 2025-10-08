<template>
  <div class="post-list">
    <h2>Lista de Posts</h2>
    <div class="filters">
      <input 
        v-model="filters.search" 
        @input="updateQueryParams"
        placeholder="Buscar..."
      >
      <select 
        v-model="filters.category" 
        @change="updateQueryParams"
      >
        <option value="">Todas las categorías</option>
        <option value="vue">Vue</option>
        <option value="router">Router</option>
      </select>
      <select 
        v-model="filters.author" 
        @change="updateQueryParams"
      >
        <option value="">Todos los autores</option>
        <option value="juan">Juan</option>
        <option value="maria">María</option>
        <option value="pedro">Pedro</option>
      </select>
    </div>

    <div v-for="post in filteredPosts" :key="post.id" class="post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <div class="post-meta">
        <span>{{ post.author }}</span>
        <span>{{ post.category }}</span>
      </div>
      <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
        Leer más
      </router-link>
    </div>
    <button @click="()=> router.push('/')">Inicio</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const posts = ref([
  { 
    id: 1, 
    title: 'Introducción a Vue 3', 
    excerpt: 'Aprende los básicos...', 
    author: 'juan',
    category: 'vue',
  },
  { 
    id: 2, 
    title: 'Composition API', 
    excerpt: 'Nueva forma de escribir...', 
    author: 'maria',
    category: 'vue',
  },
  { 
    id: 3, 
    title: 'Vue Router 4', 
    excerpt: 'Navegación en Vue...', 
    author: 'pedro',
    category: 'router',
  },
])

const filters = ref({
  category: '',
  author: '',
  search: '',
  sort: 'reciente'
})

// Posts filtrados
const filteredPosts = computed(() => {
  let result = posts.value

  if (filters.value.category) {
    result = result.filter(post => 
      post.category === filters.value.category
    )
  }

  if (filters.value.author) {
    result = result.filter(post => 
      post.author === filters.value.author
    )
  }

  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower)
    )
  }

  return result
})

// leer query params al cargar
const readQueryParams = () => {
  filters.value.category = route.query.category || ''
  filters.value.author = route.query.author || ''
  filters.value.search = route.query.search || ''
  filters.value.sort = route.query.sort || 'reciente'
}

// actualizar URL cuando cambian los filtros
const updateQueryParams = () => {
  const query = {}
  
  if (filters.value.category) query.category = filters.value.category
  if (filters.value.author) query.author = filters.value.author
  if (filters.value.search) query.search = filters.value.search
  if (filters.value.sort && filters.value.sort !== 'reciente') query.sort = filters.value.sort

  router.push({ name: 'Posts', query })
}

// watch para detectar cambios en la URL
watch(() => route.query, () => {
  readQueryParams()
}, { deep: true })

onMounted(() => {
  readQueryParams()
})
</script>

<style scoped>
.filters {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.filters select,
.filters input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.post-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}

.post-meta {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9em;
  margin: 10px 0;
}
</style>