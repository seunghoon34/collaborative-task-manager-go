import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
});

export const signup = (userData) => api.post('/signup', userData);
export const signin = (userData) => api.post('/signin', userData);
export const getTodos = () => api.get('/todos');
export const createTodo = (todoData) => api.post('/todos', todoData);
export const updateTodo = (id, todoData) => api.put(`/todos/${id}`, todoData);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;