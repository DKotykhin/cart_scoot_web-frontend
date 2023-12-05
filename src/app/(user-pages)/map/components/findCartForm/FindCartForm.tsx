"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import Select from 'react-select';

import Image from "next/image";

import RawDatePicker from '../dateTimePickers/rawDatePicker/RawDatePicker';
import RawTimePicker from '../dateTimePickers/rawTimePicker/RawTimePicker';

import { useFormDataStore } from 'stores/findCarFormStore';
import { googleDirection } from 'utils/googleDirection';

import styles from './findCartForm.module.scss';

interface IFindCartForm {
    closeDriverDetails: () => void;
}

const options = [
    { value: 4, label: '4-seats Cart' },
    { value: 6, label: '6-seats Cart' },
];

const stylesOptions = {
    control: (styles: any) => ({
        ...styles,
        width: '100%',
        height: '48px',
        border: '1px solid #afb2be',
        borderRadius: '20px',
        paddingLeft: '44px',
        fontWeight: 600,
        cursor: 'pointer',
        backgroundImage: "url('../../../../../../icons/carSimple-grey.svg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left 16px center',
    }),
    option: (styles: any) => {
        return { ...styles };
    }
};

const libraries: Libraries = ['places'];

const FindCartForm: React.FC<IFindCartForm> = ({ closeDriverDetails }) => {

    const pickupRef = useRef<any>();
    const dropoffRef = useRef<any>();

    const [pickupDate, setPickupDate] = useState<any>(null);
    const [pickupTime, setPickupTime] = useState<any>(null);
    const [carType, setCarType] = useState<number>(4);

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
            // console.log(locationData);

            if (requestedTime && locationData) {
                addFindCarFormData({ requestedTime, pickupDate, pickupTime, locationData, carType });
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
                <div className={styles.select_input_box}>
                    <Select
                        options={options}
                        onChange={(value) => setCarType(value?.value || 4)}
                        placeholder="Cart Type"
                        styles={stylesOptions}
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
