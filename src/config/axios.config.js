import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

console.log(API_URL)
const axiosInstance = axios.create({
  baseURL: API_URL, // Thay bằng URL API của bạn, ví dụ: 'http://localhost:5000/api'
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;