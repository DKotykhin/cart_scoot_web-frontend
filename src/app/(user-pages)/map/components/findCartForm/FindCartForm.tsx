"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';
import { toast } from 'react-toastify';

import Image from "next/image";

import RawDatePicker from 'components/inputs/dateTimePickers/rawDatePicker/RawDatePicker';
import RawTimePicker from 'components/inputs/dateTimePickers/rawTimePicker/RawTimePicker';
import { useFormDataStore } from 'stores/findCarFormStore';

import styles from './findCartForm.module.scss';

interface IFindCartForm {
    closeDriverDetails: () => void;
}

const libraries: Libraries = ['places'];

const FindCartForm: React.FC<IFindCartForm> = ({ closeDriverDetails }) => {

    const pickupRef = useRef<any>();
    const dropoffRef = useRef<any>();

    const [pickupDate, setPickupDate] = useState<any>(null);
    const [pickupTime, setPickupTime] = useState<any>(null);

    const { addFindCarFormData, findCarFormData } = useFormDataStore();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries,
    });

    useEffect(() => {
        if (findCarFormData?.pickupDate) setPickupDate(findCarFormData?.pickupDate);
        if (findCarFormData.pickupTime) setPickupTime(findCarFormData.pickupTime);
    }, [findCarFormData?.pickupDate, findCarFormData.pickupTime]);

    const onSubmit = async (event: { preventDefault: () => void; }): Promise<void> => {
        event.preventDefault();
        if (pickupRef.current?.value && dropoffRef.current?.value && pickupDate && pickupTime) {

            let requestedTime;
            const requestHours = new Date(pickupTime).getHours();
            const requestMinutes = new Date(pickupTime).getMinutes();
            requestedTime = new Date(new Date(pickupDate).setHours(requestHours, requestMinutes)).toJSON();
            // console.log(requestedTime);

            const directionService = new google.maps.DirectionsService();
            const result = await directionService.route({
                origin: pickupRef.current?.value,
                destination: dropoffRef.current?.value,
                travelMode: google.maps.TravelMode.DRIVING,
            });

            let locationData;
            locationData = {
                pickup: {
                    address: result.routes[0].legs[0].start_address,
                    lat: result.routes[0].legs[0].start_location.lat(),
                    lon: result.routes[0].legs[0].start_location.lng(),
                },
                dropoff: {
                    address: result.routes[0].legs[0].end_address,
                    lat: result.routes[0].legs[0].end_location.lat(),
                    lon: result.routes[0].legs[0].end_location.lng(),
                },
                distance: result.routes[0].legs[0].distance?.value,
                duration: result.routes[0].legs[0].duration?.value,
            };
            // console.log(locationData);

            if (requestedTime && locationData) {
                addFindCarFormData({ requestedTime, pickupDate, pickupTime, locationData });
                closeDriverDetails();
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
        }
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    return isLoaded ? (
        <form
            className={styles.wrapper}
            onSubmit={onSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
        >
            <p className={styles.form_title}>
                Please check to make sure your destination is reachable by a Golf Cart
            </p>
            <div className={styles.form_box}>
                <div className={styles.pickup_input_box}>
                    <Autocomplete>
                        <input
                            type='text'
                            placeholder='Pickup Location'
                            ref={pickupRef}
                            defaultValue={findCarFormData.locationData?.pickup.address}
                        />
                    </Autocomplete>
                </div>
                <div className={styles.dropoff_input_box}>
                    <Autocomplete>
                        <input
                            type='text'
                            placeholder='Dropoff Location'
                            ref={dropoffRef}
                            defaultValue={findCarFormData.locationData?.dropoff.address}
                        />
                    </Autocomplete>
                </div>
                <div className={styles.date_input_box}>
                    <RawDatePicker
                        pickupDate={pickupDate}
                        setPickupDate={(date) => setPickupDate(date)}
                    />
                </div>
                <div className={styles.time_input_box}>
                    <RawTimePicker
                        pickupTime={pickupTime}
                        setPickupTime={(time) => setPickupTime(time)}
                    />
                </div>
                <button
                    type='submit'
                    className={styles.submit_button}
                >
                    Find Cart
                </button>
            </div>
        </form>
    ) : null;
};

export default FindCartForm;
