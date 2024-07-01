import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Admin Number', accessor: 'adminNumber' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Date of Birth', accessor: 'dob' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'Phone Number', accessor: 'phoneNumber' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Institution Name', accessor: 'institutionName' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Award Level', accessor: 'awardLevel' },
  { Header: 'Award Leader', accessor: 'awardLeader' },
];

const ParticipantTable = ({ participants, openEditModal, deleteParticipant }) => {
  const renderRowActions = ({ adminNumber }) => (
    <div>
      <button
        onClick={() => openEditModal({ adminNumber })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteParticipant(adminNumber)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={participants}
      renderRowActions={renderRowActions}
    />
  );
};

export default ParticipantTable;
