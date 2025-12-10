import { createRouter, createWebHistory } from "vue-router";
const routes = [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: () => import('../pages/TaskList.vue') },
    { path: '/tasks/add', component: () => import('../pages/TaskAdd.vue') },
    { path: '/tasks/:id', component: () => import('../pages/TaskDetail.vue') },
    { path: '/tasks/:id/edit', component: () => import('../pages/TaskEdit.vue') },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});