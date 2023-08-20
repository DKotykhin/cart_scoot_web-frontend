"use client";

import React from 'react';

import Image from "next/image";

import { StandaloneSearchBox } from '@react-google-maps/api';
import { Control, Controller } from "react-hook-form";

import styles from './locationInput.module.scss';

interface IDropoffInput {
    control: Control<any>;
    isLoaded: boolean;
}

const DropoffInput: React.FC<IDropoffInput> = ({ control, isLoaded }) => {

    return (
        <div className={styles.location_box}>
            {isLoaded ?
                <Controller
                    name='dropoff'
                    control={control}
                    render={({ field }) => (
                        <StandaloneSearchBox
                            onLoad={(data) => field.onChange(data)}
                        >
                            <input
                                type="text"
                                placeholder="Pickup Location"
                            />
                        </StandaloneSearchBox>
                    )}
                />
                : <input
                    type='text'
                    placeholder="Pickup Location"
                />
            }
            <Image
                src={'/icons/flag.svg'}
                alt={'flag icon'}
                width={24}
                height={24}
                className={styles.start_icon}
            />            
        </div>
    );
};

export default DropoffInput;