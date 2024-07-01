import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import useForm from '../../hooks/useForm';

const PartnerForm = ({ formValues, onSubmit, handleInputChange }) => {
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className="space-y-4">
                <Input
                    name="partnerID"
                    placeholder="Partner ID"
                    value={formValues.partnerID}
                    onChange={handleInputChange}
                />
                <Input
                    name="partnerName"
                    placeholder="Partner Name"
                    value={formValues.partnerName}
                    onChange={handleInputChange}
                />
                <Input
                    name="partnerEmail"
                    placeholder="Email"
                    value={formValues.partnerEmail}
                    onChange={handleInputChange}
                />
                <Input
                    name="phoneNo"
                    placeholder="Phone Number"
                    value={formValues.phoneNo}
                    onChange={handleInputChange}
                />
                <select
                    name="partnerType"
                    value={formValues.partnerType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select Partner Type</option>
                    <option value="current">Current</option>
                    <option value="upcoming">Upcoming</option>
                </select>

            </div>
        </form>
    );
};

export default PartnerForm;
