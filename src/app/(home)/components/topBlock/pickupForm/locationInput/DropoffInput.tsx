"use client";

import React from 'react';

import Image from "next/image";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Control, Controller } from "react-hook-form";

import styles from './locationInput.module.scss';

interface IDropoffInput {
    control: Control<any>;    
}

const DropoffInput: React.FC<IDropoffInput> = ({ control }) => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    });

    return (
        <div className={styles.location_box}>
            <Controller
                name='dropoff'
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type='text'
                        placeholder="Dropoff Location"
                        className={styles.location_input}
                    />
                )}
            />
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
    );
};

export default DropoffInput;