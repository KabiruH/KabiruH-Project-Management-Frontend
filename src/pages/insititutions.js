import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    InstitutionName: '',
    InstitutionEmail: '',
    InstitutionContact: '',
    SubCounty: '',
    CountyID: '',
    ContactPerson: '',
    ContactNumber: '',
    AwardLeader: '',
    StageID: '',
    StatusID: '',
    LicenseStartDate: '',
    LicenseEndDate: '',
    Notes: ''
  });
  const [currentInstitution, setCurrentInstitution] = useState(null);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await fetch('http://localhost:5248/api/Institutions');
      const data = await response.json();
      setInstitutions(data);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const addInstitution = async () => {
    try {
      const response = await fetch('http://localhost:5248/api/Institutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInstitution),
      });
      if (response.ok) {
        fetchInstitutions(); // Refresh the list after adding
        closeModal();
      } else {
        console.error('Error adding institution');
      }
    } catch (error) {
      console.error('Error adding institution:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    resetNewInstitution();
  };

  const openEditModal = (institution) => {
    setCurrentInstitution(institution);
    setNewInstitution(institution);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    resetNewInstitution();
    setCurrentInstitution(null);
  };

  const resetNewInstitution = () => {
    setNewInstitution({
      InstitutionName: '',
      InstitutionEmail: '',
      InstitutionContact: '',
      SubCounty: '',
      CountyID: '',
      ContactPerson: '',
      ContactNumber: '',
      AwardLeader: '',
      StageID: '',
      StatusID: '',
      LicenseStartDate: '',
      LicenseEndDate: '',
      Notes: ''
    });
  };

  const filteredInstitutions = institutions.filter((institution) =>
    institution.InstitutionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-5">
        <h1 className="text-2xl mb-4">Institutions</h1>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded p-2 w-1/3"
          />
          <button
            onClick={openModal}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Institution
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Stage</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Subcounty</th>
                <th className="px-4 py-2 border">County</th>
                <th className="px-4 py-2 border">Contact Person</th>
                <th className="px-4 py-2 border">Contact Number</th>
                <th className="px-4 py-2 border">License Start</th>
                <th className="px-4 py-2 border">License End</th>
                <th className="px-4 py-2 border">Award Leader</th>
                <th className="px-4 py-2 border">Notes</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutions.map((institution, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{institution.InstitutionName}</td>
                  <td className="px-4 py-2 border">{institution.StageID}</td>
                  <td className="px-4 py-2 border">{institution.StatusID}</td>
                  <td className="px-4 py-2 border">{institution.InstitutionEmail}</td>
                  <td className="px-4 py-2 border">{institution.InstitutionContact}</td>
                  <td className="px-4 py-2 border">{institution.SubCounty}</td>
                  <td className="px-4 py-2 border">{institution.CountyID}</td>
                  <td className="px-4 py-2 border">{institution.ContactPerson}</td>
                  <td className="px-4 py-2 border">{institution.ContactNumber}</td>
                  <td className="px-4 py-2 border">{new Date(institution.LicenseStartDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{new Date(institution.LicenseEndDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{institution.AwardLeader}</td>
                  <td className="px-4 py-2 border">{institution.Notes}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openEditModal(institution)}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Institution"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl mb-4">Add Institution</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="InstitutionName"
              placeholder="Institution Name"
              value={newInstitution.InstitutionName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="InstitutionEmail"
              placeholder="Institution Email"
              value={newInstitution.InstitutionEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="InstitutionContact"
              placeholder="Institution Contact"
              value={newInstitution.InstitutionContact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="SubCounty"
              placeholder="Subcounty"
              value={newInstitution.SubCounty}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="CountyID"
              placeholder="County"
              value={newInstitution.CountyID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="ContactPerson"
              placeholder="Contact Person"
              value={newInstitution.ContactPerson}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="ContactNumber"
              placeholder="Contact Number"
              value={newInstitution.ContactNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="AwardLeader"
              placeholder="Award Leader"
              value={newInstitution.AwardLeader}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="StageID"
              placeholder="Stage ID"
              value={newInstitution.StageID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="StatusID"
              placeholder="Status ID"
              value={newInstitution.StatusID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="LicenseStartDate"
              placeholder="License Start Date"
              value={newInstitution.LicenseStartDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="LicenseEndDate"
              placeholder="License End Date"
              value={newInstitution.LicenseEndDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="Notes"
              placeholder="Notes"
              value={newInstitution.Notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={addInstitution}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Institution"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl mb-4">Edit Institution</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="InstitutionName"
              placeholder="Institution Name"
              value={newInstitution.InstitutionName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="InstitutionEmail"
              placeholder="Institution Email"
              value={newInstitution.InstitutionEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="InstitutionContact"
              placeholder="Institution Contact"
              value={newInstitution.InstitutionContact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="SubCounty"
              placeholder="Subcounty"
              value={newInstitution.SubCounty}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="CountyID"
              placeholder="County"
              value={newInstitution.CountyID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="ContactPerson"
              placeholder="Contact Person"
              value={newInstitution.ContactPerson}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="ContactNumber"
              placeholder="Contact Number"
              value={newInstitution.ContactNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="AwardLeader"
              placeholder="Award Leader"
              value={newInstitution.AwardLeader}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="StageID"
              placeholder="Stage ID"
              value={newInstitution.StageID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="StatusID"
              placeholder="Status ID"
              value={newInstitution.StatusID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="LicenseStartDate"
              placeholder="License Start Date"
              value={newInstitution.LicenseStartDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="LicenseEndDate"
              placeholder="License End Date"
              value={newInstitution.LicenseEndDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="Notes"
              placeholder="Notes"
              value={newInstitution.Notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  // You should add an update function similar to addInstitution
                  // updateInstitution(currentInstitution.id);
                  closeEditModal();
                }}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeEditModal}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Institutions;
