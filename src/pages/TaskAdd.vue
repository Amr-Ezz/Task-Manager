<script setup>
import {  onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../stores/taskStore';
import { useCategoryStore } from '../stores/categoryStore';
import TaskForm from "../components/TaskForm.vue";

const router = useRouter();
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.fetchCategories();
});

const handleFormSubmit = async (taskData) => {
    try {
        await taskStore.createTask(taskData);
        router.push('/tasks');
    } catch (error) {
        console.error('Failed to create task:', error);
    }
};

const handleFormCancel = () => {
    router.push('/tasks');
};
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div class="my-8">
            <TaskForm @submit="handleFormSubmit" @cancel="handleFormCancel" />
        </div>
    </div>
</template> 