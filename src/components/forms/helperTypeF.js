import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const HelperTypesForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="typeID"
            placeholder="Level ID"
            value={formValues.typeID}
            onChange={handleInputChange}
          />
          {errors.typeID && <p className="text-red-500">{errors.typeID[0]}</p>}
        </div>
        <div>
          <Input
            name="typeName"
            placeholder="Level Name"
            value={formValues.typeName}
            onChange={handleInputChange}
          />
          {errors.typeName && <p className="text-red-500">{errors.typeName[0]}</p>}
        </div>
        <div>
          <Input
            name="notes"
            placeholder="Notes"
            value={formValues.notes}
            onChange={handleInputChange}
          />
          {errors.notes && <p className="text-red-500">{errors.notes[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default HelperTypesForm;
