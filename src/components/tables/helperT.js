import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Helper ID', accessor: 'helperID' },
  { Header: 'Helper Name', accessor: 'helperName' },
  { Header: 'Institution Name', accessor: 'institutionName' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'ID Number', accessor: 'idNo' },
  { Header: 'Phone Number', accessor: 'phoneNo' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Type', accessor: 'helperType' },
  { Header: 'Coordinator', accessor: 'coordinator' },
];

const HelpersTable = ({ Helpers, openEditModal, deleteHelper }) => {
  const renderRowActions = ({ helperID }) => (
    <div>
      <button
        onClick={() => openEditModal({ helperID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteHelper(helperID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={Helpers}
      renderRowActions={renderRowActions}
    />
  );
};

export default HelpersTable;
