<script setup>
import { ref, computed } from 'vue';
import { useCategoryStore } from '../stores/categoryStore';

const categoryStore = useCategoryStore();

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      category_id: '',
      image_url: '',
      priority: '',
      due_date: '',
      completed: false
    })
  },
  title: { type: String, default: 'Add New Task' },
  buttonText: { type: String, default: 'Create Task' }
});


const emit = defineEmits(['submit', 'cancel']);


const formData = ref({ ...props.initialData });
const errors = ref({});
const isSubmitting = ref(false);

function validate() {
  const e = {};

  if (!formData.value.title?.trim()) e.title = 'Title is required';
  if (!formData.value.description?.trim()) e.description = 'Description is required';
  if (!formData.value.category_id) e.category_id = 'Category is required';

  errors.value = e;
  return Object.keys(e).length === 0;
}

const handleSubmit = () => {
  if (validate()) {
    isSubmitting.value = true;
    emit('submit', { ...formData.value });
  }
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto">
    <h2 class="text-2xl font-bold text-white mb-6">{{ title }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label for="title" class="block text-sm font-semibold text-gray-200 mb-2">
          Title <span class="text-red-400">*</span>
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          :class="{ 'border-red-500': errors.title }"
          placeholder="Enter task title"
        />
        <p v-if="errors.title" class="text-red-400 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-200 mb-2">
          Description <span class="text-red-400">*</span>
        </label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          :class="{ 'border-red-500': errors.description }"
          placeholder="Enter task description"
        ></textarea>
        <p v-if="errors.description" class="text-red-400 text-sm mt-1">{{ errors.description }}</p>
      </div>

      <div>
        <label for="category" class="block text-sm font-semibold text-gray-200 mb-2">
          Category <span class="text-red-400">*</span>
        </label>
        <select
          id="category"
          v-model="formData.category_id"
          class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          :class="{ 'border-red-500': errors.category_id }"
        >
          <option value="" disabled>Select a category</option>
          <option 
            v-for="category in categoryStore.categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <p v-if="errors.category_id" class="text-red-400 text-sm mt-1">{{ errors.category_id }}</p>
      </div>

      <div>
        <label for="priority" class="block text-sm font-semibold text-gray-200 mb-2">
          Priority
        </label>
        <select
          id="priority"
          v-model="formData.priority"
          class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">Not set</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label for="due_date" class="block text-sm font-semibold text-gray-200 mb-2">
          Due Date
        </label>
        <input
          id="due_date"
          v-model="formData.due_date"
          type="date"
          class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label for="image_url" class="block text-sm font-semibold text-gray-200 mb-2">
          Image URL
        </label>
        <input
          id="image_url"
          v-model="formData.image_url"
          type="url"
          class="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div class="flex items-center">
        <input
          id="completed"
          v-model="formData.completed"
          type="checkbox"
          class="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label for="completed" class="ml-2 text-sm font-medium text-gray-200 cursor-pointer">
          Mark as completed
        </label>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full sm:flex-1 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Saving...' : buttonText }}
        </button>
        <button
          type="button"
          @click="handleCancel"
          :disabled="isSubmitting"
          class="w-full sm:flex-1 bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
