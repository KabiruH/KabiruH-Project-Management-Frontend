import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'Level ID', accessor: 'levelID' },
  { Header: 'Level Name', accessor: 'levelName' },
  { Header: 'Notes', accessor: 'notes' },
];

const LevelsTable = ({ levels, openEditModal, deleteLevels }) => {
  const renderRowActions = ({ levelID }) => (
    <div>
      <button
        onClick={() => openEditModal({ levelID })}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      
      <button
        onClick={() => deleteLevels(levelID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={levels}
      renderRowActions={renderRowActions}
    />
  );
};

export default LevelsTable;
