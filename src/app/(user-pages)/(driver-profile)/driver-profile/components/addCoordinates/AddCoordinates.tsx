"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { UPDATE_COORDINATES } from 'apollo/mutations/user';

import { useUserStore } from 'stores/userStore';
import { IUser } from 'types/userTypes';

import styles from './addCoordinates.module.scss';

const AddCoordinates = () => {

    const [location, setLocation] = useState<{ latitude: number, longitude: number }>();

    const [updateCoordinates] = useMutation(UPDATE_COORDINATES);
    const { addUser } = useUserStore();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    const addCoordinatesClick = async () => {
        // console.log('add Coordinates', location);
        if (location?.latitude && location?.longitude) {
            try {
                const { data }: { data?: { addCoordinates: IUser } } = await updateCoordinates({
                    variables: {
                        updateCoordinatesInput: {
                            coordinates: {
                                lat: location.latitude,
                                lon: location.longitude,
                            }
                        }
                    },
                });
                if (data?.addCoordinates._id) {
                    toast.success('Your coordinates added successfully', {
                        bodyClassName: "right-toast",
                        icon: <Image
                            src={'/icons/right-code.svg'}
                            alt='icon'
                            width={56}
                            height={56}
                        />
                    });
                    addUser(data?.addCoordinates!);
                }
            } catch (err: any) {
                toast.warn(err.message, {
                    bodyClassName: "wrong-toast",
                    icon: <Image
                        src={'/icons/wrong-code.svg'}
                        alt='icon'
                        width={56}
                        height={56}
                    />
                });
            }
        } else toast.warn("Can't define your current coordinates", {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        });
    };

    return (
        <div className={styles.add_coordinates}>
            <div className={styles.line} />
            <div className={styles.add_coordinates_box}>
                <p className={styles.add_coordinates_title}>Coordinates</p>
                <button
                    className='button-green-outlined'
                    onClick={addCoordinatesClick}
                >
                    Add Coordinates
                </button>
            </div>
        </div>
    );
};

export default AddCoordinates;