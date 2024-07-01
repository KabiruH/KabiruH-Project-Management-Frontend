import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Layout from '../components/layout.js';
import ProjectForm from '../components/forms/projectForm.js';
import ProjectTable from '../components/tables/projectTable.js';
import { getProjects, addProject, updateProject, deleteProject as deleteProjectService } from '../services/projectService.js';
import useForm from '../hooks/useForm';
import useModal from '../hooks/useModal';

const Project = () => {
  const { formValues, handleInputChange, setFormValues } = useForm({
    projectID: '',
    projectName: '',
    institutionName: '',
    startDate: '',
    endDate: '',
    cost: '',
    subCounty: '',
    county: '',
    description: '',
    coordinator: '',
    notes: '',
  });

  const { isOpen, openModal, closeModal } = useModal();
  
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const addNewProject = async () => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, formValues);
        setProjects(projects.map((proj) => (proj._id === editingProject._id ? formValues : proj)));
      } else {
        const newProject = await addProject(formValues);
        setProjects([...projects, newProject]);
      }
      closeModal();
      setFormValues({
        projectID: '',
        projectName: '',
        institutionName: '',
        startDate: '',
        endDate: '',
        cost: '',
        subCounty: '',
        county: '',
        description: '',
        coordinator: '',
        notes: '',
      });
      setEditingProject(null);
    } catch (error) {
      console.error('Error adding/updating project:', error);
    }
  };

  const openEditModal = (project) => {
    setFormValues(project);
    setEditingProject(project);
    openModal();
  };

  const deleteProject = async (projectID) => {
    try {
      await deleteProjectService(projectID);
      setProjects(projects.filter((project) => project._id !== projectID));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <ProjectTable
            projects={filteredProjects}
            openEditModal={openEditModal}
            deleteProject={deleteProject}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Add Project"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl mb-4">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
          <ProjectForm
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange} 
            onSubmit={addNewProject}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Project;
