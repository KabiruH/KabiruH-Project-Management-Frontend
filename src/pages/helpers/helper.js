import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import HelpersForm from '../../components/forms/helperF';
import HelpersTable from '../../components/tables/helperT';
import { addHelper as addHelperService, getHelperById, updateHelper, deleteHelper, getHelper } from '../../services/helperS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddHelper = () => {
  const [Helpers, setHelpers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHelper, setNewHelper] = useState({ 
      
      helperID: '',
      helperName: '',
      institutionName: '',
      gender: '',
      idNo: '',
      phoneNo: '',
      email: '',
      subCounty: '',
      county: '',
      helperType: '',
      coordinator: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedHelperId, setSelectedHelperId] = useState(null);

  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const fetchedHelpers = await getHelper();
        setHelpers(fetchedHelpers);
      } catch (error) {
        console.error('Error fetching Helpers:', error.response.data);
      }
    };

    fetchHelpers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHelper((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewHelper((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewHelper = async () => {
    try {
      const helperPayload = { ...newHelper };

      console.log('New Helper Payload:', helperPayload);
      const addedHelper = await addHelperService(helperPayload);
      setHelpers((prev) => [...prev, addedHelper]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding helper:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add helper: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddHelperModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewHelper({
      helperID: '',
      helperName: '',
      institutionName: '',
      gender: '',
      idNo: '',
      phoneNo: '',
      email: '',
      subCounty: '',
      county: '',
      helperType: '',
      coordinator: '',
    });
  };

  const openEditHelperModal = async (helper) => {
    try {
      console.log('Fetching helper with ID:', helper.helperID);
      const fetchedHelper = await getHelperById(helper.helperID);
      console.log('Fetched Helper:', fetchedHelper);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedHelperId(helper.helperID);
      setNewHelper({
        ...fetchedHelper,
        licenseStartDate: fetchedHelper.licenseStartDate,
        licenseEndDate: fetchedHelper.licenseEndDate,
      });
    } catch (error) {
      console.error(`Error fetching helper with ID ${helper.helperID}:`, error.response.data);
    }
  };
  
  const updateExistingHelper = async () => {
    try {
      const helperPayload = { ...newHelper };
  
      console.log('Updated Helper Payload:', helperPayload);
  
      const updatedHelper = await updateHelper(selectedHelperId, helperPayload);
      setHelpers((prev) => prev.map(inst => (inst.helperID === selectedHelperId ? updatedHelper : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating helper with ID ${selectedHelperId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update helper: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingHelper = async (helperID) => {
    try {
      await deleteHelper(helperID);
      setHelpers((prev) => prev.filter(inst => inst.helperID !== helperID));
    } catch (error) {
      console.error(`Error deleting helper with ID ${helperID}:`, error.response.data);
      alert(`Failed to delete helper: ${error.response.data.title}`);
    }
  };

  const closeAddHelperModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteHelperHandler = (helperID) => {
    if (window.confirm(`Are you sure you want to delete helper with ID ${helperID}?`)) {
      deleteExistingHelper(helperID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Helpers</h1>
      <div className="p-4">
        <button
          onClick={openAddHelperModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Helper
        </button>
        <HelpersTable
          Helpers={Helpers}
          openEditModal={openEditHelperModal}
          deleteHelper={deleteHelperHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddHelperModal} contentLabel={editMode ? "Edit Helper" : "Add Helper"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Helper' : 'Add Helper'}</h2>
        <HelpersForm
          formValues={newHelper} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingHelper : addNewHelper} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddHelperModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddHelper;
