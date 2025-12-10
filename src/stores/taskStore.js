import { defineStore } from 'pinia';
import { getTasks, createTask as createTaskAPI } from '../api/tasks';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false,
        error: null,
        selectedCategory: "all"
    }),
    getters: {
        filteredTasks(state) {
            if (state.selectedCategory === "all") {
                return state.tasks;
            }
            return state.tasks.filter(task => task.category_id === state.selectedCategory);
        },
    },
    actions: {
        setCategory(id) {
            this.selectedCategory = id;
        },
        async fetchTasks() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getTasks();
                this.tasks = response;
            } catch (error) {
                this.error = error.message || "failed to fetch tasks";
            } finally {
                this.loading = false;
            }
        },
        async createTask(taskData) {
            this.loading = true;
            this.error = null;
            try {
                const newTask = await createTaskAPI(taskData);
                if (newTask) {
                    this.tasks.unshift(newTask);
                }
                return newTask;
            } catch (error) {
                this.error = error.message || "failed to create task";
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
