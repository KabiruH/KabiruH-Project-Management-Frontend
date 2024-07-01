import apiClient from './apiClient';

const addProject = async (projectData) => {
    try {
        const response = await apiClient.post('/api/Projects', projectData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error in addProject:', error.response.data); // Log detailed error
            console.error('Validation Errors:', error.response.data.errors); // Log validation errors
        } else {
            console.error('Error in addProject:', error.message); // Log generic error
        }
        throw error;
    }
};

const updateProject = async (projectId, projectData) => {
    try {
        const response = await apiClient.put(`/api/Projects/${projectId}`, projectData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error in updateProject:', error.response.data); // Log detailed error
            console.error('Validation Errors:', error.response.data.errors); // Log validation errors
        } else {
            console.error('Error in updateProject:', error.message); // Log generic error
        }
        throw error;
    }
};

const getProjects = async () => {
    try {
        const response = await apiClient.get('/api/Projects');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error in getProjects:', error.response.data); // Log detailed error
            console.error('Validation Errors:', error.response.data.errors); // Log validation errors
        } else {
            console.error('Error in getProjects:', error.message); // Log generic error
        }
        throw error;
    }
};

const deleteProject = async (projectId) => {
    try {
        const response = await apiClient.delete(`/api/Projects/${projectId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error in deleteProject:', error.response.data); // Log detailed error
            console.error('Validation Errors:', error.response.data.errors); // Log validation errors
        } else {
            console.error('Error in deleteProject:', error.message); // Log generic error
        }
        throw error;
    }
};

export { addProject, updateProject, getProjects, deleteProject };
