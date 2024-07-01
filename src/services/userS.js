// apiService.js
import apiClient from './apiClient';

const loginUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/User/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error in loginUser:', error.response?.data);
    throw error;
  }
};



export { loginUser /* , other functions */ };
