import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const LevelsForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="levelID"
            placeholder="Level ID"
            value={formValues.levelID}
            onChange={handleInputChange}
          />
          {errors.levelID && <p className="text-red-500">{errors.levelID[0]}</p>}
        </div>
        <div>
          <Input
            name="levelName"
            placeholder="Level Name"
            value={formValues.levelName}
            onChange={handleInputChange}
          />
          {errors.levelName && <p className="text-red-500">{errors.levelName[0]}</p>}
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

export default LevelsForm;
