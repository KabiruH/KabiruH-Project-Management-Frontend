import apiClient from './apiClient';

const addHelper = async (HelperData) => {
  try {
    const response = await apiClient.post('/api/Helpers', HelperData);
    return response.data;
  } catch (error) {
    console.error('Error in addHelpers:', error.response.data);
    throw error;
  }
};

const getHelperById = async (helperID) => {
  try {
    const response = await apiClient.get(`/api/Helpers/${helperID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Helpers with ID ${helperID}:`, error.response.data);
    throw error;
  }
};

const updateHelper = async (helperID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Helpers/${helperID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Helpers with ID ${helperID}:`, error.response.data);
    throw error;
  }
};

const deleteHelper = async (helperID) => {
  try {
    await apiClient.delete(`/api/Helpers/${helperID}`);
  } catch (error) {
    console.error(`Error deleting Helpers with ID ${helperID}:`, error.response.data);
    throw error;
  }
};

const getHelper = async () => {
  try {
    const response = await apiClient.get('/api/Helpers');
    return response.data;
  } catch (error) {
    console.error('Error fetching Helpers:', error.response.data);
    throw error;
  }
};

export { addHelper, getHelperById, updateHelper, deleteHelper, getHelper };
