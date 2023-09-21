"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { Libraries, useLoadScript } from '@react-google-maps/api';

import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';
import TimePickerInput from 'components/inputs/dateTimePickers/TimePickerInput';
import PickupInput from 'components/inputs/locationInput/PickupInput';
import DropoffInput from 'components/inputs/locationInput/DropoffInput';

import { useUserStore } from 'stores/userStore';

import styles from './findCarForm.module.scss';

interface ISearchData {
    pickup: any,
    date: Date,
    time: Date,
    dropoff: any,
}

interface IFindCarForm {
    openLoginModal: () => void;
    closeDriverDetails: () => void;
    formData: (arg0: IFormData) => void;
}
export interface IFormData {
    timeData: {
        date?: string,
        time?: string,
    },
    locationData?: {
        pickup: {
            address: string,
            lat: number,
            lon: number,
        },
        dropoff: {
            address: string,
            lat: number,
            lon: number,
        },
    };
}

const libraries: Libraries = ['places'];

const FindCarForm: React.FC<IFindCarForm> = ({ openLoginModal, formData, closeDriverDetails }) => {

    const { userData } = useUserStore();

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
        const timeData = {
            date: date?.toJSON(),
            time: time?.toJSON(),
        };
        // console.log(timeData);
        let locationData;
        if (pickup.gm_accessors_.places.Hi.formattedPrediction &&
            dropoff.gm_accessors_.places.Hi.formattedPrediction) {
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
            // console.log(locationData);
        }
        if (userData._id) {
            formData({ timeData, locationData });
            closeDriverDetails();
        } else {
            openLoginModal();
            formData({ timeData, locationData });
        }
    };

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
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