import React from 'react';
import Table from '../common/Table';

const columns = [
  { Header: 'ID', accessor: 'institutionID' },
  { Header: 'Name', accessor: 'institutionName' },
  { Header: 'Stage', accessor: 'stageID' },
  { Header: 'Status', accessor: 'statusID' },
  { Header: 'Email', accessor: 'institutionEmail' },
  { Header: 'Contact', accessor: 'institutionContact' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'County', accessor: 'county' },
  { Header: 'Contact Person', accessor: 'contactPerson' },
  { Header: 'Contact Number', accessor: 'contactNumber' },
  { Header: 'Lincense Startdate', accessor: 'licenseStartDate' },
  { Header: 'Lincense Enddate', accessor: 'licenseEndDate' },
  { Header: 'Award Leader', accessor: 'AwardLeader' },
  { Header: 'Notes', accessor: 'notes' },

];

const InstitutionTable = ({ institutions, openEditModal, deleteInstitution }) => {
  const renderRowActions = (institution) => (
    <div>
      <button
        onClick={() => openEditModal(institution)}
        className="bg-yellow-500 text-white p-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => deleteInstitution(institution.institutionID)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );

  return (
    <Table
      columns={columns}
      data={institutions}
      renderRowActions={renderRowActions}
    />
  );
};

export default InstitutionTable;
