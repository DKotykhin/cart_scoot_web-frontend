"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { Libraries, useLoadScript } from '@react-google-maps/api';
import { toast } from 'react-toastify';

import Image from "next/image";

import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';
import TimePickerInput from 'components/inputs/dateTimePickers/TimePickerInput';
import PickupInput from 'components/inputs/locationInput/PickupInput';
import DropoffInput from 'components/inputs/locationInput/DropoffInput';

import { useFormDataStore } from 'stores/findCarFormStore';

import styles from './findCarForm.module.scss';

interface ISearchData {
    pickup: any,
    date: Date,
    time: Date,
    dropoff: any,
}

interface IFindCarForm {
    closeDriverDetails: () => void;
}

const libraries: Libraries = ['places'];

const FindCarForm: React.FC<IFindCarForm> = ({ closeDriverDetails }) => {

    const { addFindCarFormData } = useFormDataStore();

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
            pickup: {},
            date: undefined,
            time: undefined,
            dropoff: {},
        }
    });

    const onSubmit = async (data: ISearchData): Promise<void> => {
        const { date, time, pickup, dropoff } = data;

        let requestedTime;
        if (date && time) {
            const requestHours = new Date(time).getHours();
            const requestMinutes = new Date(time).getMinutes();
            requestedTime = new Date(new Date(date).setHours(requestHours, requestMinutes)).toJSON();
        }

        let locationData;
        if (pickup.getPlaces() && dropoff.getPlaces()) {
            const [pickupPlace] = pickup.getPlaces();
            const [dropoffPlace] = dropoff.getPlaces();
            locationData = {
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
        }

        if (requestedTime && locationData) {
            addFindCarFormData({ requestedTime, locationData });
            closeDriverDetails();
        } else {
            toast.warn("Please fill out this form!", {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        };
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    return (
        <form
            className={styles.wrapper}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
        >
            <div className={styles.form_box}>
                <div className={styles.pickup_input_box}>
                    <PickupInput
                        control={control}
                        isLoaded={isLoaded}
                    />
                </div>
                <div className={styles.date_input_box}>
                    <DatePickerInput
                        name='date'
                        placeholder='Pickup Date'
                        control={control}
                        minDate={true}
                    />
                </div>
                <div className={styles.time_input_box}>
                    <TimePickerInput
                        control={control}
                        name='time'
                        placeholder='Pickup Time'
                    />
                </div>
                <div className={styles.dropoff_input_box}>
                    <DropoffInput
                        control={control}
                        isLoaded={isLoaded}
                    />
                </div>
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