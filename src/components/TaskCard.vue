<script setup>
import { useRouter } from "vue-router";
import CategoryBadge from "./CategoryBadge.vue";
import { useCategoryStore } from "../stores/categoryStore";
import { computed } from "vue";

const router = useRouter();
const categoryStore = useCategoryStore();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});


const goToDetail = () => {
  router.push(`/tasks/${props.task.id}`);
};

const fallbackImage = "https://via.placeholder.com/600x400";

const category = computed(() => {
    return categoryStore.getById(props.task.category_id);
});
</script>

<template>
  <div
    @click="goToDetail"
    class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200 border border-gray-100 flex flex-col cursor-pointer"
  >
    <div class="w-full h-48 bg-gray-100">
      <img
        :src="task.image_url || fallbackImage"
        alt="Task image"
        class="w-full h-full object-cover"
        @error="$event.target.src = fallbackImage"
      />
    </div>

    <div class="flex flex-col flex-1 p-4 gap-3">
      <div class="flex justify-between items-start gap-3">
        <h3 class="text-lg font-semibold text-gray-900 leading-tight">
          {{ task.title }}
        </h3>
        <CategoryBadge :category="category"  />
      </div>

      <p class="text-sm text-gray-600 line-clamp-3">
        {{ task.description }}
      </p>

      <div class="flex justify-between items-center mt-auto pt-2">
        <span
          class="text-xs font-semibold px-2 py-1 rounded-md"
          :class="
            task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          "
        >
          {{ task.completed ? 'Completed' : 'Pending' }}
        </span>

        <button
          class="bg-white border border-blue-600 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded hover:bg-blue-50 transition cursor-pointer"
          @click="goToDetail"
        >
          View
        </button>
      </div>
    </div>
  </div>
</template>
