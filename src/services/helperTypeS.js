import apiClient from './apiClient';

const addHelperTypes = async (levelData) => {
  try {
    const response = await apiClient.post('/api/HelperTypes', levelData);
    return response.data;
  } catch (error) {
    console.error('Error in addHelperTypes:', error.response.data);
    throw error;
  }
};

const getHelperTypesById = async (typeId) => {
  try {
    const response = await apiClient.get(`/api/HelperTypes/${typeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching HelperTypes with ID ${typeId}:`, error.response.data);
    throw error;
  }
};

const updateHelperTypes = async (typeId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/HelperTypes/${typeId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating HelperTypes with ID ${typeId}:`, error.response.data);
    throw error;
  }
};

const deleteHelperTypes = async (typeId) => {
  try {
    await apiClient.delete(`/api/HelperTypes/${typeId}`);
  } catch (error) {
    console.error(`Error deleting HelperTypes with ID ${typeId}:`, error.response.data);
    throw error;
  }
};

const getHelperTypes = async () => {
  try {
    const response = await apiClient.get('/api/HelperTypes');
    return response.data;
  } catch (error) {
    console.error('Error fetching HelperTypes:', error.response.data);
    throw error;
  }
};

export { addHelperTypes, getHelperTypesById, updateHelperTypes, deleteHelperTypes, getHelperTypes };
