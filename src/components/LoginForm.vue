<script setup>
import { ref } from 'vue';
import { authenticate } from '../services/api';
import { useToast } from 'vue-toastification';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const toast = useToast();
const login = ref('');
const password = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleSubmit = async () => {
  if (!login.value || !password.value) {
    toast.error('Por favor, preencha todos os campos');
    return;
  }

  loading.value = true;
  try {
    const response = await authenticate(login.value, password.value);
    toast.success('Login realizado com sucesso!');
    console.log('Authentication successful:', response);
  } catch (error) {
    toast.error(error.message || 'Erro ao realizar login');
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 bg-[#36393f]">
    <div class="w-full max-w-[480px] p-8 discord-card">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
        <p class="text-[#b9bbbe]">Estamos muito animados em te ver novamente!</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-[#b9bbbe] uppercase mb-2">
            Email
          </label>
          <input
            type="email"
            v-model="login"
            required
            class="discord-input"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-[#b9bbbe] uppercase mb-2">
            Senha
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              class="discord-input pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-[#b9bbbe] hover:text-white transition-colors"
            >
              <FontAwesomeIcon :icon="showPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>

        <a href="#" class="block text-sm text-[#00aff4] hover:underline mb-4">
          Esqueceu sua senha?
        </a>

        <button
          type="submit"
          :disabled="loading"
          class="discord-button"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <FontAwesomeIcon icon="spinner" spin class="mr-2" />
            Entrando...
          </span>
          <span v-else>Entrar</span>
        </button>

        <p class="mt-4 text-sm text-[#b9bbbe]">
          Precisando de uma conta?
          <a href="#" class="text-[#00aff4] hover:underline">Registre-se</a>
        </p>
      </form>
    </div>
  </div>
</template>