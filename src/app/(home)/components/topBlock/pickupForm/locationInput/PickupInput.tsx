"use client";

import React from 'react';

import Image from "next/image";

import { StandaloneSearchBox } from '@react-google-maps/api';
import { Control, Controller } from "react-hook-form";

import styles from './locationInput.module.scss';

interface IPickupInput {
    control: Control<any>;
    isLoaded: boolean;
}

const libraries: any = ['places'];

const PickupInput: React.FC<IPickupInput> = ({ control, isLoaded }) => {

    return (
        <div className={styles.location_box}>
            {isLoaded ?
                <Controller
                    name='pickup'
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
                src={'/icons/mapPin.svg'}
                alt={'map pin icon'}
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

export default PickupInput;