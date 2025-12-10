import api from "./client";

export const getTasks = async () => {
    const { data } = await api.get("/tasks?order=created_at.desc");
    return data;
};

export const getTaskById = async (id) => {
    const { data } = await api.get(`/tasks?id=eq.${id}`);
    return data;
};

export const createTask = async (taskData) => {
    const cleanData = {};
    for (const key in taskData) {
        const value = taskData[key];
        if (value !== '' && value !== undefined && value !== null) {
            cleanData[key] = value;
        }
    }
    // console.log('creating task with data:', cleanData);
    const { data } = await api.post("/tasks", cleanData);
    return data?.[0];
};
export const updateTask = async (id, taskData) => {
    const cleanData = {};
    for (const key in taskData) {
        const value = taskData[key];
        if (value !== '' && value !== undefined && value !== null) {
            cleanData[key] = value;
        }
    }
    const { data } = await api.patch(`/tasks?id=eq.${id}`, cleanData);
    return data?.[0];
};
export const deleteTask = async (id) => {
    await api.delete(`/tasks?id=eq.${id}`);
    return true;
};
export const getCategories = async () => {
    const { data } = await api.get("/categories?order=name.asc");
    return data;
}

