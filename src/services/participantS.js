import apiClient from './apiClient';

const addParticipant = async (ParticipantData) => {
  try {
    const response = await apiClient.post('/api/Participants', ParticipantData);
    return response.data;
  } catch (error) {
    console.error('Error in addParticipants:', error.response.data);
    throw error;
  }
};

const getParticipantById = async (adminNumber) => {
  try {
    const response = await apiClient.get(`/api/Participants/${adminNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Participants with ID ${adminNumber}:`, error.response.data);
    throw error;
  }
};

const updateParticipant = async (adminNumber, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Participants/${adminNumber}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Participants with ID ${adminNumber}:`, error.response.data);
    throw error;
  }
};

const deleteParticipant = async (adminNumber) => {
  try {
    await apiClient.delete(`/api/Participants/${adminNumber}`);
  } catch (error) {
    console.error(`Error deleting Participants with ID ${adminNumber}:`, error.response.data);
    throw error;
  }
};

const getParticipant = async () => {
  try {
    const response = await apiClient.get('/api/Participants');
    return response.data;
  } catch (error) {
    console.error('Error fetching Participants:', error.response.data);
    throw error;
  }
};

export { addParticipant, getParticipantById, updateParticipant, deleteParticipant, getParticipant };
