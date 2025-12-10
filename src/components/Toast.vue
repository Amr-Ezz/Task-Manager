<template>
  <div v-if="show" class="fixed top-4 right-4 z-50 animate-fade-in">
    <div class="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: String,
  show: Boolean
});

const emit = defineEmits(['close']);

watch(() => props.show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      emit('close');
    }, 3000);
  }
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
