"use client";

import React from 'react';

import Image from 'next/image';

import { setHours, setMinutes } from "date-fns";
import DatePicker from 'react-datepicker';

import { useForm, Controller } from "react-hook-form";

import { useLoadScript } from '@react-google-maps/api';

import PickupInput from './locationInput/PickupInput';
import DropoffInput from './locationInput/DropoffInput';

import styles from './pickupForm.module.scss';

interface IPickupData {
    date: Date,
    time: Date,
    pickup: any,
    dropoff: any,
}

const libraries: any = ['places'];

const PickupForm = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries,
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPickupData>({
        defaultValues: {
            date: undefined,
            time: undefined,
            pickup: '',
            dropoff: '',
        }
    });

    const onSubmit = (data: IPickupData): void => {
        // console.log(data);
        const { date, time, pickup, dropoff } = data;
        const [pickupPlace] = pickup.getPlaces();
        const [dropoffPlace] = dropoff.getPlaces();
        if (pickupPlace && dropoffPlace) {
            const newData = {
                date: date?.toJSON(),
                time: time?.toJSON(),
                pickup: {
                    address: pickupPlace.formatted_address,
                    lat: pickupPlace.geometry.location.lat(),
                    lon: pickupPlace.geometry.location.lng(),
                },
                dropoff: {
                    address: dropoffPlace.formatted_address,
                    lat: dropoffPlace.geometry.location.lat(),
                    lon: dropoffPlace.geometry.location.lng(),
                },
            };
            console.log(newData);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <PickupInput
                control={control}
                isLoaded={isLoaded}
            />
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
            <DropoffInput
                control={control}
                isLoaded={isLoaded}
            />
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