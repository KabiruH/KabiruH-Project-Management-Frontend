import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import LevelsForm from '../../components/forms/participantLevelsF';
import LevelsTable from '../../components/tables/participantLevelT';
import { addLevels as addLevelsService, getLevelsById, updateLevels, deleteLevels, getLevels } from '../../services/participantLevelsS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddLevels = () => {
  const [levels, setLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLevels, setNewLevels] = useState({
    levelID: '',
    levelName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedLevelsID, setSelectedLevelsID] = useState(null);

  useEffect(() => {
    const fetchedlevels = async () => {
      try {
        const fetchedLevels = await getLevels();
        setLevels(fetchedLevels);
      } catch (error) {
        console.error('Error fetching levels:', error.response.data);
      }
    };

    fetchedlevels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLevels((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewLevels((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewLevels = async () => {
    try {
      const levelsPayload = {
        levelID: String(newLevels.levelID), // Ensure LevelsID is a string
        levelName: newLevels.levelName,
        notes: newLevels.notes,
      };
  
      console.log('New levels Payload:', levelsPayload);
      const addedlevels = await addLevelsService(levelsPayload);
      setLevels((prev) => [...prev, addedlevels]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding levels:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add levels: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddLevelsModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewLevels({
      levelID: '',
      levelName: '',
      notes: '',
    });
  };

  const openEditLevelsModal = async (levels) => {
    try {
      const fetchedLevels = await getLevelsById(String(levels.levelID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedLevelsID(levels.levelID);
      setNewLevels({
        ...fetchedLevels,
      });
    } catch (error) {
      console.error(`Error fetching levels with ID ${levels.levelID}:`, error.response.data);
    }
  };

  const updateExistingLevels = async () => {
    try {
      const levelsPayload = { ...newLevels };

      console.log('Updated levels Payload:', levelsPayload);

      const updatedLevels = await updateLevels(selectedLevelsID, levelsPayload);
      setLevels((prev) => prev.map(inst => (inst.levelID === selectedLevelsID ? updatedLevels : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating levels with ID ${selectedLevelsID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update levels: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingLevels = async (levelID) => {
    try {
      await deleteLevels(levelID);
      setLevels((prev) => prev.filter(inst => inst.levelID !== levelID));
    } catch (error) {
      console.error(`Error deleting levels with ID ${levelID}:`, error.response.data);
      alert(`Failed to delete levels: ${error.response.data.title}`);
    }
  };

  const closeAddLevelsModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteLevelsHandler = (levelID) => {
    if (window.confirm(`Are you sure you want to delete levels with ID ${levelID}?`)) {
      deleteExistingLevels(levelID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Levels</h1>
      <div className="p-4">
        <button
          onClick={openAddLevelsModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Levels
        </button>
        <LevelsTable
          levels={levels}
          openEditModal={openEditLevelsModal}
          deleteLevels={deleteLevelsHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddLevelsModal} contentLabel={editMode ? "Edit Levels" : "Add levels"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Levels' : 'Add Levels'}</h2>
        <LevelsForm 
          formValues={newLevels} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingLevels : addNewLevels} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddLevelsModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddLevels;
