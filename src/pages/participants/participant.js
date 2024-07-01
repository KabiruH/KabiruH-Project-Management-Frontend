import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ParticipantForm from '../../components/forms/participantF';
import ParticipantTable from '../../components/tables/participantT';
import { addParticipant as addParticipantService, getParticipantById, updateParticipant, deleteParticipant, getParticipant } from '../../services/participantS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddParticipant = () => {
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState({ 
      
      adminNumber: '',
      name: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      email: '',
      institutionName: '',
      subCounty: '',
      county: '',
      awardLevel: '',
      awardLeader: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const fetchedParticipants = await getParticipant();
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error('Error fetching participants:', error.response.data);
      }
    };

    fetchParticipants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewParticipant = async () => {
    try {
      const participantPayload = { ...newParticipant };

      console.log('New Participant Payload:', participantPayload);
      const addedParticipant = await addParticipantService(participantPayload);
      setParticipants((prev) => [...prev, addedParticipant]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding participant:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add participant: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddParticipantModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewParticipant({
      adminNumber: '',
      name: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      email: '',
      institutionName: '',
      subCounty: '',
      county: '',
      awardLevel: '',
      awardLeader: '',
    });
  };

  const openEditParticipantModal = async (participant) => {
    try {
      console.log('Fetching participant with ID:', participant.adminNumber);
      const fetchedParticipant = await getParticipantById(participant.adminNumber);
      console.log('Fetched Participant:', fetchedParticipant);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedParticipantId(participant.adminNumber);
      setNewParticipant({
        ...fetchedParticipant,
        dateOfBirth: fetchedParticipant.dateOfBirth,
       
      });
    } catch (error) {
      console.error(`Error fetching participant with ID ${participant.adminNumber}:`, error.response.data);
    }
  };
  
  const updateExistingParticipant = async () => {
    try {
      const participantPayload = { ...newParticipant };
  
      console.log('Updated Participant Payload:', participantPayload);
  
      const updatedParticipant = await updateParticipant(selectedParticipantId, participantPayload);
      setParticipants((prev) => prev.map(inst => (inst.adminNumber === selectedParticipantId ? updatedParticipant : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating participant with ID ${selectedParticipantId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update participant: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingParticipant = async (adminNumber) => {
    try {
      await deleteParticipant(adminNumber);
      setParticipants((prev) => prev.filter(inst => inst.adminNumber !== adminNumber));
    } catch (error) {
      console.error(`Error deleting participant with ID ${adminNumber}:`, error.response.data);
      alert(`Failed to delete participant: ${error.response.data.title}`);
    }
  };

  const closeAddParticipantModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteParticipantHandler = (adminNumber) => {
    if (window.confirm(`Are you sure you want to delete participant with ID ${adminNumber}?`)) {
      deleteExistingParticipant(adminNumber);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Participants</h1>
      <div className="p-4">
        <button
          onClick={openAddParticipantModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Participant
        </button>
        <ParticipantTable
          participants={participants}
          openEditModal={openEditParticipantModal}
          deleteParticipant={deleteParticipantHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddParticipantModal} contentLabel={editMode ? "Edit Participant" : "Add Participant"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Participant' : 'Add Participant'}</h2>
        <ParticipantForm 
          formValues={newParticipant} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingParticipant : addNewParticipant} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddParticipantModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddParticipant;
