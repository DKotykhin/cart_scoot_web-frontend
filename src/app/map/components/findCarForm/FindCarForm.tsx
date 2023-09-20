"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { useLoadScript } from '@react-google-maps/api';

import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';
import TimePickerInput from 'components/inputs/dateTimePickers/TimePickerInput';
import PickupInput from 'components/inputs/locationInput/PickupInput';

import styles from './findCarForm.module.scss';
import DropoffInput from 'components/inputs/locationInput/DropoffInput';

interface ISearchData {
    pickup: any,
    date: Date,
    time: Date,
    dropoff: any,
}

const libraries: any = ['places'];

const FindCarForm = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries,
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<ISearchData>({
        defaultValues: {
            pickup: '',
            date: undefined,
            time: undefined,
            dropoff: '',
        }
    });

    const onSubmit = async (data: ISearchData): Promise<void> => {
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
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_box}>
                <PickupInput
                    control={control}
                    isLoaded={isLoaded}
                />
                <DatePickerInput
                    name='date'
                    placeholder='Pickup Date'
                    control={control}
                    minDate={true}
                />
                <TimePickerInput
                    control={control}
                />
                <DropoffInput
                    control={control}
                    isLoaded={isLoaded}
                />
                <button
                    type='submit'
                    className={styles.submit_button}
                >
                    Find Car
                </button>
            </div>
        </form>
    );
};

export default FindCarForm;