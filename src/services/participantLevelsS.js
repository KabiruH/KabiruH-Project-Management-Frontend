import apiClient from './apiClient';

const addLevels = async (levelData) => {
  try {
    const response = await apiClient.post('/api/Levels', levelData);
    return response.data;
  } catch (error) {
    console.error('Error in addLevels:', error.response.data);
    throw error;
  }
};

const getLevelsById = async (levelId) => {
  try {
    const response = await apiClient.get(`/api/Levels/${levelId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching institution with ID ${levelId}:`, error.response.data);
    throw error;
  }
};

const updateLevels = async (levelId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Levels/${levelId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating institution with ID ${levelId}:`, error.response.data);
    throw error;
  }
};

const deleteLevels = async (levelId) => {
  try {
    await apiClient.delete(`/api/Levels/${levelId}`);
  } catch (error) {
    console.error(`Error deleting institution with ID ${levelId}:`, error.response.data);
    throw error;
  }
};

const getLevels = async () => {
  try {
    const response = await apiClient.get('/api/Levels');
    return response.data;
  } catch (error) {
    console.error('Error fetching institutions:', error.response.data);
    throw error;
  }
};

export { addLevels, getLevelsById, updateLevels, deleteLevels, getLevels };
