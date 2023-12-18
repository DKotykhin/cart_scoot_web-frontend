"use client";

import React, { useRef, useState } from 'react';

import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { toast } from 'react-toastify';

import DatePickerInput from '../dateTimePickers/datePickerInput/DatePickerInput';
import TimePickerInput from '../dateTimePickers/timePickerInput/TimePickerInput';

import { useFormDataStore } from 'stores/findCarFormStore';
import { googleDirection } from 'utils/googleDirection';

import styles from './pickupForm.module.scss';

const libraries: Libraries = ['places'];

const PickupForm = () => {

    const pickupRef = useRef<any>();
    const dropoffRef = useRef<any>();

    const [pickupDate, setPickupDate] = useState<any>(null);
    const [pickupTime, setPickupTime] = useState<any>(null);

    const router = useRouter();
    const { addFindCarFormData } = useFormDataStore();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries,
    });


    const onSubmit = async (event: { preventDefault: () => void; }): Promise<void> => {
        event.preventDefault();
        if (pickupRef.current?.value && dropoffRef.current?.value && pickupDate && pickupTime) {

            let requestedTime;
            const requestHours = new Date(pickupTime).getHours();
            const requestMinutes = new Date(pickupTime).getMinutes();
            requestedTime = new Date(new Date(pickupDate).setHours(requestHours, requestMinutes));
            console.log(requestedTime);

            const result = await googleDirection(pickupRef.current?.value, dropoffRef.current?.value);

            let locationData;
            locationData = {
                pickup: {
                    address: result.start_address,
                    lat: result.start_location.lat(),
                    lon: result.start_location.lng(),
                },
                dropoff: {
                    address: result.end_address,
                    lat: result.end_location.lat(),
                    lon: result.end_location.lng(),
                },
                distance: result.distance?.value,
                duration: result.duration?.value,
            };
            console.log(locationData);

            if (requestedTime && locationData) {
                addFindCarFormData({ requestedTime, pickupDate, pickupTime, locationData });
                router.push('/map');
            }
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

    return isLoaded ? (
        <form
            className={styles.container}
            onSubmit={onSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
        >
            <div className={styles.pickup_input_box}>
                <Autocomplete>
                    <input
                        type='text'
                        placeholder='Pickup Location'
                        ref={pickupRef}
                    />
                </Autocomplete>
            </div>
            <div className={styles.date_time_box}>
                <DatePickerInput
                    pickupDate={pickupDate}
                    setPickupDate={(date) => setPickupDate(date)}
                />
                <TimePickerInput
                    pickupTime={pickupTime}
                    setPickupTime={(time) => setPickupTime(time)}
                />
            </div>
            <div className={styles.dropoff_input_box}>
                <Autocomplete>
                    <input
                        type='text'
                        placeholder='Dropoff Location'
                        ref={dropoffRef}
                    />
                </Autocomplete>
            </div>
            <button
                type='submit'
                className={styles.button}
            >
                Find Cart
            </button>
        </form>
    ) : null;
};

export default PickupForm;