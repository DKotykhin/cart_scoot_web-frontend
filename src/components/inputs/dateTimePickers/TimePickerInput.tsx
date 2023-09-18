import React from 'react';

import Image from 'next/image';

import DatePicker from 'react-datepicker';
import { Controller, Control } from "react-hook-form";
import { setHours, setMinutes } from "date-fns";

import styles from './datePickerInput.module.scss';

interface IDatePickerInput {
    control: Control<any>;
}

const TimePickerInput: React.FC<IDatePickerInput> = ({ control }) => {
    return (
        <div className={styles.picker_box}>
            <Controller
                name="time"
                control={control}
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        placeholderText="Pickup Time"
                        onChange={(date) => field.onChange(date)}
                        className={styles.picker_input}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        minTime={setHours(setMinutes(new Date(), 0), 6)}
                        maxTime={setHours(setMinutes(new Date(), 0), 23)}
                    />
                )}
            />
            <Image
                src={'/icons/clock.svg'}
                alt={'clock icon'}
                width={24}
                height={24}
                className={styles.start_icon}
            />
            <Image
                src={'/icons/bxs-chevron-down.svg'}
                alt={'arrow icon'}
                width={24}
                height={24}
                className={styles.arrow_icon}
            />
        </div>
    );
};

export default TimePickerInput;