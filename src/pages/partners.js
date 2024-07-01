import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout';
import { addPartnerships, getPartnerships, updatePartnership, deletePartnership } from '../services/partnershipS';
import PartnersForm from '../components/forms/partnersForm'; // Adjust the path as necessary
import useForm from '../hooks/useForm';
import useModal from '../hooks/useModal';

const Partnership = () => {
  const { formValues, handleInputChange, resetForm, setFormValues } = useForm({
    partnerID: '',
    partnerName: '',
    partnerEmail: '',
    phoneNo: '',
    partnerType: '',
  });

  const { isOpen, openModal, closeModal } = useModal();
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const fetchedPartners = await getPartnerships();
        setPartners(fetchedPartners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  const addOrUpdatePartner = async (e) => {
    e.preventDefault(); // Prevents default form submission

    try {
      if (isEditMode) {
        await updatePartnership(editingPartner.partnerID, formValues);
        setPartners(partners.map((partner) => (partner.partnerID === editingPartner.partnerID ? formValues : partner)));
      } else {
        const addedPartner = await addPartnerships(formValues);
        setPartners([...partners, addedPartner]);
      }
      closeModal();
      resetForm();
      setEditingPartner(null);
    } catch (error) {
      console.error('Error adding/updating partner:', error);
    }
  };

  const openEditModal = (partner) => {
    setFormValues(partner); // Corrected: Use setFormValues to populate the form
    setEditingPartner(partner);
    setIsEditMode(true);
    openModal();
  };

  const deletePartner = async (partnerID) => {
    try {
      await deletePartnership(partnerID);
      setPartners(partners.filter((partner) => partner.partnerID !== partnerID));
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  const filteredPartners = partners.filter((partner) =>
    partner.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-5">
        <h1 className="text-2xl mb-4">Partners</h1>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded p-2 w-1/3"
          />
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Partner ID</th>
                <th className="px-4 py-2 border">Partner Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone Number</th>
                <th className="px-4 py-2 border">Partner Type</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{partner.partnerID}</td>
                  <td className="px-4 py-2 border">{partner.partnerName}</td>
                  <td className="px-4 py-2 border">{partner.partnerEmail}</td>
                  <td className="px-4 py-2 border">{partner.phoneNo}</td>
                  <td className="px-4 py-2 border">{partner.partnerType}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openEditModal(partner)}
                      className="bg-yellow-500 text-white p-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePartner(partner.partnerID)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={isOpen} // Corrected: Use isOpen to control modal visibility
          onRequestClose={closeModal}
          contentLabel="Add/Edit Partner"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl mb-4">{isEditMode ? 'Edit' : 'Add'} Partner</h2>
          <PartnersForm
            formValues={formValues}
            onSubmit={addOrUpdatePartner}
            handleInputChange={handleInputChange}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={addOrUpdatePartner}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              {isEditMode ? 'Update' : 'Add'}
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Partnership;
