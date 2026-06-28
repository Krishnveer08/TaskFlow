import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export const updateTaskStatus = async (id, status) => {
  const { data } = await API.put(`/tasks/${id}`, {
    status,
  });

  return data.task;
};
export const clearAllTasks = async () => {
  const { data } = await API.delete("/tasks/clear");
  return data;
};
export default API;