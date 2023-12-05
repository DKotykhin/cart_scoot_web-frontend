"use client";

import React from 'react';

import DatePicker from 'react-datepicker';

import styles from './datePickerInput.module.scss';

interface IDatePickerInput {
    pickupDate: Date,
    setPickupDate: (arg0: Date | null) => void,
}

const DatePickerInput: React.FC<IDatePickerInput> = ({ pickupDate, setPickupDate }) => {
    return (
        <div className={styles.picker_wrapper}>
            <DatePicker
                selected={pickupDate}
                placeholderText={'Pickup Date'}
                onChange={(date) => setPickupDate(date)}
                minDate={new Date()}
                className={styles.picker_input}
            />
        </div>
    );
};

export default DatePickerInput;