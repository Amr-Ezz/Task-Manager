<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTaskById, deleteTask } from "../api/tasks";
import CategoryBadge from "../components/CategoryBadge.vue";
import BaseSpinner from "../components/BaseSpinner.vue";
import Toast from "../components/Toast.vue";
import { useCategoryStore } from "../stores/categoryStore";

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const task = ref(null);
const loading = ref(true);
const error = ref(null);
const toggling = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const fallbackImage = "https://via.placeholder.com/150";

onMounted(async () => {
  await categoryStore.fetchCategories();

  try {
    const data = await getTaskById(route.params.id);

    if (Array.isArray(data) && data[0]) {
      task.value = data[0];
    } else {
      error.value = "Task not found";
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const category = computed(() => {
  return categoryStore.getById(task.value?.category_id);
});

const toggleComplete = async () => {
  toggling.value = true;
  try {
    const { updateTask } = await import('../api/tasks');
    await updateTask(task.value.id, { completed: !task.value.completed });
    task.value.completed = !task.value.completed;
    toastMessage.value = task.value.completed ? 'Task marked as complete!' : 'Task marked as pending!';
    showToast.value = true;
  } catch (err) {
    error.value = "Failed to update task";
  } finally {
    toggling.value = false;
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this task?")) return;

  await deleteTask(task.value.id);
  router.push("/tasks");
};

const goToEdit = () => {
  router.push(`/tasks/${task.value.id}/edit`);
};
</script>

<template>
  <div class="w-full p-4 sm:p-6 max-w-4xl mx-auto">
    <Toast :show="showToast" :message="toastMessage" @close="showToast = false" />

    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>

    <div v-else-if="error">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <img
        :src="task.image_url || fallbackImage"
        class="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-md"
      />

      <div class="space-y-3">
        <h1 class="text-2xl sm:text-3xl font-bold text-white">{{ task.title }}</h1>
        
        <CategoryBadge
          v-if="category"
          :category="category"
        />
      </div>

      <p class="text-gray-200 text-base leading-relaxed">{{ task.description }}</p>

      <div class="bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
        <div class="flex items-center gap-2">
          <strong class="text-gray-200">Priority:</strong>
          <span class="text-gray-300">{{ task.priority || 'Not set' }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <strong class="text-gray-200">Due date:</strong>
          <span class="text-gray-300">{{ task.due_date || "No due date" }}</span>
        </div>

        <div class="flex items-center gap-2">
          <strong class="text-gray-200">Status:</strong>
          <span
            class="px-2 py-1 rounded text-xs font-semibold"
            :class="task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
          >
            {{ task.completed ? "Completed" : "Pending" }}
          </span>
        </div>
      </div>

      <div>
        <button
          @click="toggleComplete"
          :disabled="toggling"
          class="w-full sm:w-auto px-6 py-2.5 font-semibold rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          :class="task.completed ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'bg-green-600 text-white hover:bg-green-700'"
        >
          {{ toggling ? 'Updating...' : (task.completed ? 'Mark as Pending' : 'Mark as Complete') }}
        </button>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <button 
          @click="goToEdit" 
          class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Edit Task
        </button>

        <button 
          @click="handleDelete" 
          class="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition cursor-pointer"
        >
          Delete Task
        </button>
      </div>
    </div>
  </div>
</template>
