import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVICE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getAllProducts: async () => {
    const response = await apiClient.get('/products');
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
};

export default apiClient;

