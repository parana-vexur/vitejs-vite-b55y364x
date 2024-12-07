<script setup>
import { ref, onMounted } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RequestLogger from './components/RequestLogger.vue';
import { setRequestLogger } from './services/api';

const requestLoggerRef = ref(null);

onMounted(() => {
  if (requestLoggerRef.value) {
    setRequestLogger(requestLoggerRef.value);
  }
});
</script>

<template>
  <LoginForm />
  <RequestLogger ref="requestLoggerRef" />
</template>