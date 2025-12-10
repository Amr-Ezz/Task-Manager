import { defineStore } from 'pinia';
import { getCategories } from '../api/tasks';

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categories: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getCategories();
                this.categories = response;
            } catch (error) {
                this.error = error.message || "failed to fetch categories";
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        categoryOptions(state) {
            return [
                { id: "all", name: "All" },
                ...state.categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    color: category.color,
                    icon_url: category.icon_url
                }))
            ]
        },
        getById(state) {
            return (id) => state.categories.find(category => category.id === id);
        }
    }
});