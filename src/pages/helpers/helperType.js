import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import HelperTypesForm from '../../components/forms/helperTypeF';
import HelperTypesTable from '../../components/tables/helperTypeT';
import { addHelperTypes as addHelperTypesService, getHelperTypesById, updateHelperTypes, deleteHelperTypes, getHelperTypes } from '../../services/helperTypeS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddHelperTypes = () => {
  const [helpertypes, setHelperTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHelperTypes, setNewHelperTypes] = useState({
    typeID: '',
    typeName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedHelperTypesID, setSelectedHelperTypesID] = useState(null);

  useEffect(() => {
    const fetchedhelpertypes = async () => {
      try {
        const fetchedHelperTypes = await getHelperTypes();
        setHelperTypes(fetchedHelperTypes);
      } catch (error) {
        console.error('Error fetching helpertypes:', error.response.data);
      }
    };

    fetchedhelpertypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHelperTypes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewHelperTypes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewHelperTypes = async () => {
    try {
      const helpertypesPayload = {
        typeID: String(newHelperTypes.typeID), // Ensure HelperTypesID is a string
        typeName: newHelperTypes.typeName,
        notes: newHelperTypes.notes,
      };
  
      console.log('New helpertypes Payload:', helpertypesPayload);
      const addedhelpertypes = await addHelperTypesService(helpertypesPayload);
      setHelperTypes((prev) => [...prev, addedhelpertypes]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding helpertypes:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add helpertypes: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddHelperTypesModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewHelperTypes({
      typeID: '',
      typeName: '',
      notes: '',
    });
  };

  const openEditHelperTypesModal = async (helpertypes) => {
    try {
      const fetchedHelperTypes = await getHelperTypesById(String(helpertypes.typeID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedHelperTypesID(helpertypes.typeID);
      setNewHelperTypes({
        ...fetchedHelperTypes,
      });
    } catch (error) {
      console.error(`Error fetching helpertypes with ID ${helpertypes.typeID}:`, error.response.data);
    }
  };

  const updateExistingHelperTypes = async () => {
    try {
      const helpertypesPayload = { ...newHelperTypes };

      console.log('Updated helpertypes Payload:', helpertypesPayload);

      const updatedHelperTypes = await updateHelperTypes(selectedHelperTypesID, helpertypesPayload);
      setHelperTypes((prev) => prev.map(inst => (inst.typeID === selectedHelperTypesID ? updatedHelperTypes : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating helpertypes with ID ${selectedHelperTypesID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update helpertypes: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingHelperTypes = async (typeID) => {
    try {
      await deleteHelperTypes(typeID);
      setHelperTypes((prev) => prev.filter(inst => inst.typeID !== typeID));
    } catch (error) {
      console.error(`Error deleting helpertypes with ID ${typeID}:`, error.response.data);
      alert(`Failed to delete helpertypes: ${error.response.data.title}`);
    }
  };

  const closeAddHelperTypesModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteHelperTypesHandler = (typeID) => {
    if (window.confirm(`Are you sure you want to delete helpertypes with ID ${typeID}?`)) {
      deleteExistingHelperTypes(typeID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Helper Types</h1>
      <div className="p-4">
        <button
          onClick={openAddHelperTypesModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Helper Types
        </button>
        <HelperTypesTable
          helpertypes={helpertypes}
          openEditModal={openEditHelperTypesModal}
          deleteHelperTypes={deleteHelperTypesHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddHelperTypesModal} contentLabel={editMode ? "Edit Helper Types" : "Add helpertypes"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Helper Types' : 'Add Helper Types'}</h2>
        <HelperTypesForm 
          formValues={newHelperTypes} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingHelperTypes : addNewHelperTypes} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddHelperTypesModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddHelperTypes;
