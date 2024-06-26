import React, { useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout'

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '',
    institution: '',
    startDate: '',
    endDate: '',
    cost: '',
    subCounty: '',
    county: '',
    description: '',
    coordinatorName: '',
    notes: '',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewProject({
      projectName: '',
      institution: '',
      startDate: '',
      endDate: '',
      cost: '',
      subCounty: '',
      county: '',
      description: '',
      coordinatorName: '',
      notes: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const addProject = () => {
    setProjects([...projects, newProject]);
    closeModal();
  };

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
    <div className="p-5">
      <h1 className="text-2xl mb-4">Projects</h1>
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
          Add Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Project Name</th>
              <th className="px-4 py-2 border">Institution</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Cost</th>
              <th className="px-4 py-2 border">Sub County</th>
              <th className="px-4 py-2 border">County</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Coordinator's Name</th>
              <th className="px-4 py-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{project.projectName}</td>
                <td className="px-4 py-2 border">{project.institution}</td>
                <td className="px-4 py-2 border">{project.startDate}</td>
                <td className="px-4 py-2 border">{project.endDate}</td>
                <td className="px-4 py-2 border">{project.cost}</td>
                <td className="px-4 py-2 border">{project.subCounty}</td>
                <td className="px-4 py-2 border">{project.county}</td>
                <td className="px-4 py-2 border">{project.description}</td>
                <td className="px-4 py-2 border">{project.coordinatorName}</td>
                <td className="px-4 py-2 border">{project.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Project"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Add Project</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={newProject.projectName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={newProject.institution}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={newProject.startDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            value={newProject.endDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cost"
            placeholder="Cost"
            value={newProject.cost}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="subCounty"
            placeholder="Sub County"
            value={newProject.subCounty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="county"
            placeholder="County"
            value={newProject.county}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProject.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="coordinatorName"
            placeholder="Coordinator's Name"
            value={newProject.coordinatorName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={newProject.notes}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addProject}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Add
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

export default Project;

