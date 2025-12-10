<script setup>
import { useTaskStore } from "../stores/taskStore";
import {onMounted} from "vue";
import TaskCard from "../components/TaskCard.vue";
import EmptyState from "../components/EmptyState.vue";
import { useCategoryStore } from "../stores/categoryStore";
import TaskForm from "../components/TaskForm.vue";
import TaskCardSkeleton from "../components/TaskCardSkeleton.vue";
import Toast from "../components/Toast.vue";
import { ref } from "vue";

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();
onMounted(() => {
    taskStore.fetchTasks();
    categoryStore.fetchCategories();
})

const showForm = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

const handleFormSubmit = async (taskData) => {
    try {
        await taskStore.createTask(taskData);
        showForm.value = false;
        toastMessage.value = 'task created successfully';
        showToast.value = true;
    } catch (error) {
        console.error('failed to create task:', error);
    }
};

const handleFormCancel = () => {
    showForm.value = false;
};
</script>
<template>
    <div class="w-full p-4 sm:p-6 max-w-7xl mx-auto">
        <Toast :show="showToast" :message="toastMessage" @close="showToast = false" />
        
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-white">Tasks</h1>
            <button
                @click="showForm = true"
                class="w-full sm:w-auto bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition cursor-pointer appearance-none border-0"
            >
                + Add Task
            </button>
        </div>
        <div class="mb-6">
            <select class="w-full sm:w-auto px-3 py-2 text-md rounded-lg border border-gray-600 bg-gray-800 
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         transition text-white"
            v-model="taskStore.selectedCategory"
            @change="taskStore.setCategory(taskStore.selectedCategory)">
                <option v-for="category in categoryStore.categoryOptions" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
        </div>
        <div v-if="taskStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TaskCardSkeleton v-for="n in 6" :key="n" />
        </div>
        <div v-else-if="taskStore.error">
            <p class="text-red-400">{{ taskStore.error }}</p>
        </div>
        <div v-else-if="!taskStore.loading && taskStore.filteredTasks.length === 0">
            <EmptyState message="No tasks found" />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TaskCard v-for="task in taskStore.filteredTasks" :key="task.id" :task="task" />
        </div>
        
        <div
            v-if="showForm"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            @click.self="handleFormCancel"
        >
            <TaskForm @submit="handleFormSubmit" @cancel="handleFormCancel" />
        </div>
    </div>
</template>


    