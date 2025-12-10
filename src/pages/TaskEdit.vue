<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTaskById, updateTask } from '../api/tasks';
import { useCategoryStore } from '../stores/categoryStore';
import TaskForm from '../components/TaskForm.vue';
import BaseSpinner from '../components/BaseSpinner.vue';
import Toast from '../components/Toast.vue';

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const loading = ref(true);
const error = ref(null);
const taskData = ref(null);
const showToast = ref(false);
const toastMessage = ref('');

onMounted(async () => {
  await categoryStore.fetchCategories();
  
  try {
    const data = await getTaskById(route.params.id);
    
    if (Array.isArray(data) && data[0]) {
      taskData.value = data[0];
    } else {
      error.value = "Task not found";
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async (formData) => {
  try {
    await updateTask(route.params.id, formData);
    toastMessage.value = 'Task updated successfully!';
    showToast.value = true;
    setTimeout(() => {
      router.push(`/tasks/${route.params.id}`);
    }, 1000);
  } catch (err) {
    error.value = err.message || 'Failed to update task';
  }
};

const handleCancel = () => {
  router.push(`/tasks/${route.params.id}`);
};
</script>

<template>
  <div class="w-full p-6 max-w-4xl mx-auto">
    <Toast :show="showToast" :message="toastMessage" @close="showToast = false" />
    
    <div v-if="loading" class="flex justify-center">
      <BaseSpinner />
    </div>

    <div v-else-if="error">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <TaskForm
      v-else
      :initial-data="taskData"
      title="Edit Task"
      button-text="Update Task"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>