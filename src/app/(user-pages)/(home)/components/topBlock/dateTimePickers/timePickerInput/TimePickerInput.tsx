import React from 'react';

import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from "date-fns";

import styles from './timePickerInput.module.scss';

interface ITimePickerInput {
    pickupTime: Date,
    setPickupTime: (arg0: Date | null) => void,
}

const TimePickerInput: React.FC<ITimePickerInput> = ({ pickupTime, setPickupTime }) => {
    return (
        <div className={styles.picker_wrapper}>
            <DatePicker
                selected={pickupTime}
                placeholderText={'Pickup Time'}
                onChange={(time) => setPickupTime(time)}
                className={styles.picker_input}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 59), 23)}
            />
        </div>
    );
};

export default TimePickerInput;