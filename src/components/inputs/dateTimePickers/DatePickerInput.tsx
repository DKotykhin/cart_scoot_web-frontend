"use client";

import React from 'react';

import Image from 'next/image';

import DatePicker from 'react-datepicker';
import { Controller, Control } from "react-hook-form";

import styles from './datePickerInput.module.scss';

interface IDatePickerInput {
    control: Control<any>;
    placeholder: string;
    name: string;
    minDate?: boolean;
}

const DatePickerInput: React.FC<IDatePickerInput> = ({ control, placeholder, name, minDate }) => {
    return (
        <div className={styles.picker_box}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        placeholderText={placeholder}
                        onChange={(date) => field.onChange(date)}
                        minDate={minDate ? new Date() : null}
                        className={styles.picker_input}
                    />
                )}
            />
            <Image
                src={'/icons/calendarBlank.svg'}
                alt={'calendar icon'}
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

export default DatePickerInput;