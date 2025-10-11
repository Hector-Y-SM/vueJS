<template>
    <h1>registroo</h1>

    <form @submit.prevent="handleSignUp">
        <div>
            <input 
            v-model="displayName"
            type="text"
            placeholder="Name"            
            required
            />
        </div>
        <div>
            <input 
            v-model="email"
            type="email"
            placeholder="Email"            
            required
            />
        </div>
        <div>
            <input 
            v-model="password"
            type="password"
            placeholder="******"            
            required
            />
        </div>

        <router-link to="/login">volver al login</router-link>
        <button type="submit" :disabled="isLoading">
            {{ isLoading?  'Cargando...' : 'Registrarse'}}
        </button>
    </form>
</template>

<script setup>
  import { useAuth } from '@/services/useAuth';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const { signUp } = useAuth();
  const router = useRouter();
  const displayName = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref(null);
  const isLoading = ref(false);

  const handleSignUp = async () => {
    error.value = null;
    isLoading.value = true;

    const {data, err: signUpError} = await signUp(
      email.value, displayName.value, password.value);
      
    isLoading.value = false;

    if(signUpError){
      error.value = signUpError.message;
    } else {
      router.push('/login');
    }

    console.log('creacion ',data);
  }
</script>