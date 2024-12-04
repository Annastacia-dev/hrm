import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('zuri_token')}`,
  },
});

export default api;
