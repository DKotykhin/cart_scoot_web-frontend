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
    requestedTime?: string,
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
        // console.log('data: ', data);
        const { date, time, pickup, dropoff } = data;

        let requestedTime;
        if (date && time) {
            const requestHours = new Date(time).getHours();
            const requestMinutes = new Date(time).getMinutes();
            requestedTime = new Date(new Date(date).setHours(requestHours, requestMinutes)).toJSON();
        } else {
            toast.warn("Please, put pickup date and time!", {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        };
        // console.log('requestedTime: ', requestedTime);

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
        } else {
            toast.warn("Please, put pickup and dropoff location!", {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        };
        // console.log('locationData: ', locationData);
        if (userData._id) {
            if (requestedTime && locationData) {
                formData({ requestedTime, locationData });
                closeDriverDetails();
            }
        } else {
            openLoginModal();
            if (requestedTime && locationData) {
                formData({ requestedTime, locationData });
                closeDriverDetails();
            }
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