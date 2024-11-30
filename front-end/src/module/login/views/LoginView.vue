<script setup lang="ts">
import { ref } from 'vue';
import apilogin from '../apiLogin'
import { useRouter } from 'vue-router';
import apiLogin from '../apiLogin';

const route = useRouter()

const visible = ref(false);
const email = ref<string | null>(null);
const password = ref<string | null>(null);

const submitLogin = async () => {

try {
    const payload = {
        email: email.value,
        senha: password.value
    };

    const response = await apiLogin.post('/auth/login', payload);
    console.log(response.data);
    route.push('/dashboard')
} catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || 'Ocorreu um erro ao tentar logar.');
}
}
  

</script>

<template>
    <div>
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>
  
        <v-text-field
          v-model="email"
          density="compact"
          placeholder="E-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>
  
        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="submitLogin"
        >
          Login
        </v-btn>
  
        <v-card-text class="text-center">
          <router-link
            to="/cadastro"
            class="text-blue text-decoration-none"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </div>
  </template>