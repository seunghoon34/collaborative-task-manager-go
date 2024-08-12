import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signup = (userData) => api.post('/signup', userData);
export const signin = (userData) => api.post('/signin', userData);
export const getTodos = (filters) => api.get('/todos', { params: filters });
export const createTodo = (todoData) => api.post('/todos', todoData);
export const updateTodo = (id, todoData) => api.put(`/todos/${id}`, todoData);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const createTeam = (teamData) => api.post('/teams', teamData);
export const joinTeam = (joinCode) => api.post(`/teams/join/${joinCode}`);
export const getTeam = (teamId) => api.get(`/teams/${teamId}`);
export const listUserTeams = () => api.get('/teams');
export const logout = () => {
  localStorage.removeItem('token');
};

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;