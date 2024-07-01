import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const InstitutionForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="institutionID"
            placeholder="Institution ID"
            value={formValues.institutionID}
            onChange={handleInputChange}
          />
          {errors.institutionID && <p className="text-red-500">{errors.institutionID[0]}</p>}
        </div>
        <div>
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formValues.institutionName}
            onChange={handleInputChange}
          />
          {errors.institutionName && <p className="text-red-500">{errors.institutionName[0]}</p>}
        </div>
        <div>
          <Input
            name="stageID"
            placeholder="Stage ID"
            value={formValues.stageID}
            onChange={handleInputChange}
          />
          {errors.stageID && <p className="text-red-500">{errors.stageID[0]}</p>}
        </div>
        <div>
          <Input
            name="statusID"
            placeholder="Status ID"
            value={formValues.statusID}
            onChange={handleInputChange}
          />
          {errors.statusID && <p className="text-red-500">{errors.statusID[0]}</p>}
        </div>
        <div>
          <Input
            name="institutionEmail"
            placeholder="Institution Email"
            value={formValues.institutionEmail}
            onChange={handleInputChange}
          />
          {errors.institutionEmail && <p className="text-red-500">{errors.institutionEmail[0]}</p>}
        </div>
        <div>
          <Input
            name="institutionContact"
            placeholder="Institution Contact"
            value={formValues.institutionContact}
            onChange={handleInputChange}
          />
          {errors.institutionContact && <p className="text-red-500">{errors.institutionContact[0]}</p>}
        </div>
        <div>
          <Input
            name="subCounty"
            placeholder="Sub County"
            value={formValues.subCounty}
            onChange={handleInputChange}
          />
          {errors.subCounty && <p className="text-red-500">{errors.subCounty[0]}</p>}
        </div>
        <div>
          <Input
            name="countyID"
            placeholder="County ID"
            value={formValues.countyID}
            onChange={handleInputChange}
          />
          {errors.countyID && <p className="text-red-500">{errors.countyID[0]}</p>}
        </div>
        <div>
          <Input
            name="contactPerson"
            placeholder="Contact Person"
            value={formValues.contactPerson}
            onChange={handleInputChange}
          />
          {errors.contactPerson && <p className="text-red-500">{errors.contactPerson[0]}</p>}
        </div>
        <div>
          <Input
            name="contactNumber"
            placeholder="Contact Number"
            value={formValues.contactNumber}
            onChange={handleInputChange}
          />
          {errors.contactNumber && <p className="text-red-500">{errors.contactNumber[0]}</p>}
        </div>

        <div>
          <Input
            name="licenseStartDate"
            placeholder="License Start Date"
            type="date"
            value={formValues.licenseStartDate}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.licenseStartDate && <p className="text-red-500">{errors.licenseStartDate[0]}</p>}
        </div>
        <div>
          <Input
            name="licenseEndDate"
            placeholder="License End Date"
            type="date"
            value={formValues.licenseEndDate}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.licenseEndDate && <p className="text-red-500">{errors.licenseEndDate[0]}</p>}
        </div>
        <div>
          <Input
            name="awardLeader"
            placeholder="Award Leader"
            value={formValues.awardLeader}
            onChange={handleInputChange}
          />
          {errors.awardLeader && <p className="text-red-500">{errors.awardLeader[0]}</p>}
        </div>
        <div>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formValues.notes}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.notes && <p className="text-red-500">{errors.notes[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default InstitutionForm;
