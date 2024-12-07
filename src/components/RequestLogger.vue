<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const requests = ref([]);
const isOpen = ref(false);

const addRequest = (request) => {
  requests.value.unshift({
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
    ...request
  });
};

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

defineExpose({ addRequest });
</script>

<template>
  <div>
    <button
      @click="toggleSidebar"
      class="fixed right-0 top-4 bg-[#202225] text-white p-2 rounded-l-lg shadow-lg hover:bg-[#2f3136] transition-all duration-300"
    >
      <FontAwesomeIcon :icon="isOpen ? 'times' : 'clipboard'" />
    </button>

    <div
      class="fixed right-0 top-0 h-full discord-sidebar transition-all duration-300 overflow-y-auto"
      :class="isOpen ? 'w-96' : 'w-0'"
    >
      <div class="p-6">
        <h3 class="text-lg font-bold text-white mb-6 flex items-center">
          <FontAwesomeIcon icon="history" class="mr-2" />
          Registro de Requisições
        </h3>
        <div class="space-y-4">
          <div
            v-for="request in requests"
            :key="request.id"
            class="bg-[#36393f] rounded-lg p-4 hover:bg-[#32353b] transition-colors"
          >
            <div class="flex justify-between items-start">
              <span class="text-sm text-[#b9bbbe]">{{ request.timestamp }}</span>
              <span
                class="px-3 py-1 text-xs rounded-full font-medium"
                :class="{
                  'bg-[#3ba55c] bg-opacity-20 text-[#3ba55c]': request.status >= 200 && request.status < 300,
                  'bg-[#ed4245] bg-opacity-20 text-[#ed4245]': request.status >= 400,
                  'bg-[#faa61a] bg-opacity-20 text-[#faa61a]': request.status >= 300 && request.status < 400
                }"
              >
                Status {{ request.status }}
              </span>
            </div>
            <div class="mt-3">
              <p class="text-sm font-medium text-[#dcddde]">{{ request.method }} {{ request.url }}</p>
              <pre v-if="request.error" class="mt-2 text-xs text-[#ed4245] bg-[#ed4245] bg-opacity-10 p-3 rounded-lg">{{ request.error }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>