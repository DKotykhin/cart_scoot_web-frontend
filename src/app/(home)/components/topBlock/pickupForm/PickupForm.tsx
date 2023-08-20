"use client";

import React from 'react';

import Image from 'next/image';

import { setHours, setMinutes } from "date-fns";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { useForm, Controller } from "react-hook-form";

import styles from './pickupForm.module.scss';

interface IPickupData {
    date: Date,
    time: Date,
}

const PickupForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPickupData>({
        // defaultValues: {
        //     date: undefined,
        //     time: undefined,
        // }
    });

    const onSubmit = (data: IPickupData): void => {
        console.log(data);
        // const { date, time } = data;
        // console.log(date.toJSON());
        // console.log(time.toJSON());
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.location_box}>
                <Image
                    src={'/icons/mapPin.svg'}
                    alt={'map pin icon'}
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
            <div className={styles.date_time_box}>
                <div className={styles.picker_box}>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                minDate={new Date()}
                                placeholderText="Pickup Date"
                                onChange={(date) => field.onChange(date)}
                                className={styles.date_time_input}
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
                <div className={styles.picker_box}>
                    <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                placeholderText="Pickup Time"
                                onChange={(date) => field.onChange(date)}
                                className={styles.date_time_input}
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
            </div>
            <div className={styles.location_box}>
                <Image
                    src={'/icons/flag.svg'}
                    alt={'flag icon'}
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
            <button
                type='submit'
                className={styles.button}
            >
                Find Car
            </button>
        </form>
    );
};

export default PickupForm;