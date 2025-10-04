<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="error-alert">
        <span class="error-icon">⚠️</span>
        {{ errorMessage }}
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Campo Usuario -->
        <div class="form-group">
          <label for="username">Usuario</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Ingresa tu usuario"
            required
            :disabled="loading"
            autocomplete="username"
          />
        </div>

        <!-- Campo Contraseña -->
        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="password-input">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Ingresa tu contraseña"
              required
              :disabled="loading"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              :disabled="loading"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <!-- Botón de envío -->
        <button 
          type="submit" 
          class="login-button"
          :disabled="loading || !username || !password"
        >
          <span v-if="!loading">Entrar</span>
          <span v-else class="loading-spinner">Cargando...</span>
        </button>
      </form>

      <!-- Información de usuarios de prueba -->
      <div class="test-users">
        <p class="test-users-title">Usuarios de prueba:</p>
        <ul>
          <li><strong>Admin:</strong> admin / admin123</li>
          <li><strong>Usuario:</strong> usuario1 / user123</li>
          <li><strong>Moderador:</strong> moderador / mod123</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const loading = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Por favor completa todos los campos'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login(username.value, password.value)

    if (result.success) {
      // Redirigir a donde intentaba ir originalmente
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Error al iniciar sesión. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

h2 {
  margin: 0 0 24px 0;
  color: #333;
  text-align: center;
  font-size: 28px;
}

.error-alert {
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 20px;
  color: #c33;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon {
  font-size: 18px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

input {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  flex: 1;
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  transition: opacity 0.2s;
}

.toggle-password:hover:not(:disabled) {
  opacity: 0.7;
}

.toggle-password:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.login-button {
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.test-users {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

.test-users-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  font-weight: 600;
}

.test-users ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.test-users li {
  padding: 8px 0;
  color: #777;
  font-size: 13px;
}

.test-users strong {
  color: #555;
}
</style>
