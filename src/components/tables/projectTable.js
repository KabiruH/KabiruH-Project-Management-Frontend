import React from 'react';
import Table from '../common/Table';

const columns = [
    { Header: 'Project ID', accessor: 'projectID' },
  { Header: 'Project Name', accessor: 'projectName' },
  { Header: 'Institution', accessor: 'institutionName' },
  { Header: 'Start Date', accessor: 'startDate' },
  { Header: 'End Date', accessor: 'endDate' },
  { Header: 'Cost', accessor: 'cost' },
  { Header: 'Sub County', accessor: 'subCounty' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Description', accessor: 'description' },
  { Header: "Coordinator's Name", accessor: 'coordinator' },
  { Header: 'Notes', accessor: 'notes' },
];

const ProjectTable = ({ projects, openEditModal, deleteProject }) => {
  const renderRowActions = (project) => (
    <div>
      <button
        onClick={() => openEditModal(project)}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => deleteProject(project.projectID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={projects}
      renderRowActions={renderRowActions}
    />
  );
};

export default ProjectTable;
