"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from "next/image";

import { useMutation } from '@apollo/client';
import { UPDATE_COORDINATES } from 'apollo/mutations/user';

import { useUserStore } from 'stores/userStore';
import { IUser } from 'types/userTypes';

import styles from './addCoordinates.module.scss';

const AddCoordinates = () => {

    const [location, setLocation] = useState<{ latitude: number, longitude: number }>();

    const { addUser } = useUserStore();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    const [updateCoordinates, { loading }] = useMutation(UPDATE_COORDINATES, {
        onCompleted: (data?: { addCoordinates: IUser }) => {
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
        },
        onError: (err) => toast.warn(err.message, {
            bodyClassName: "wrong-toast",
            icon: <Image
                src={'/icons/wrong-code.svg'}
                alt='icon'
                width={56}
                height={56}
            />
        }),
    });

    const addCoordinatesClick = async () => {
        if (location?.latitude && location?.longitude) {
            await updateCoordinates({
                variables: {
                    updateCoordinatesInput: {
                        coordinates: {
                            lat: location.latitude,
                            lon: location.longitude,
                        }
                    }
                },
            });
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
                    {loading ?
                        <Image
                            src={'/spinner.svg'}
                            alt={'spinner'}
                            width={48}
                            height={48}
                        />
                        : 'Add Coordinates'
                    }
                </button>
            </div>
        </div>
    );
};

export default AddCoordinates;