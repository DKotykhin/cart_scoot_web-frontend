"use client";

import React from 'react';

import { useForm } from "react-hook-form";
import { useLoadScript } from '@react-google-maps/api';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { toast } from 'react-toastify';

import PickupInput from 'components/inputs/locationInput/PickupInput';
import DropoffInput from 'components/inputs/locationInput/DropoffInput';
import DatePickerInput from 'components/inputs/dateTimePickers/DatePickerInput';
import TimePickerInput from 'components/inputs/dateTimePickers/TimePickerInput';

import { useFormDataStore } from 'stores/findCarFormStore';

import styles from './pickupForm.module.scss';

interface IPickupData {
    date: Date,
    time: Date,
    pickup: any,
    dropoff: any,
}

const libraries: any = ['places'];

const PickupForm = () => {

    const router = useRouter();
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
        // console.log('requestedTime: ', requestedTime);
        // console.log('locationData: ', locationData);
        if (requestedTime && locationData) {
            addFindCarFormData({ requestedTime, locationData });
            router.push('/map');
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <PickupInput
                control={control}
                isLoaded={isLoaded}
            />
            <div className={styles.date_time_box}>
                <DatePickerInput
                    control={control}
                    placeholder='Pickup Date'
                    name='date'
                    minDate={true}
                />
                <TimePickerInput
                    control={control}
                />
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