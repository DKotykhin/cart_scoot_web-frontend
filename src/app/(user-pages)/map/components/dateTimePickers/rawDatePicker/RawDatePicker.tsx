import React from 'react';

import DatePicker from 'react-datepicker';

import styles from './rawDatePicker.module.scss';

interface IRawDatePicker {
    pickupDate: Date,
    setPickupDate: (arg0: Date | null) => void,
}

const RawDatePicker: React.FC<IRawDatePicker> = ({ pickupDate, setPickupDate }) => {
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

export default RawDatePicker;