import React from 'react';

import Image from "next/image";

import styles from './locationCard.module.scss';

interface ILocationCard {
    pickupLocation?: string;
    dropoffLocation?: string;
}

const LocationCard: React.FC<ILocationCard> = ({ pickupLocation, dropoffLocation }) => {

    return (
        <div className={styles.location_wrapper}>
            <div className={styles.location_box}>
                <Image
                    src={'/icons/mapPin-green.svg'}
                    alt={'pin'}
                    width={40}
                    height={40}
                    className={styles.location_image}
                />
                <div className={styles.text_box}>
                    <p className={styles.location_title}>Pickup Location</p>
                    <p className={styles.location_value}>{pickupLocation}</p>
                </div>
            </div>
            <Image
                src={'/icons/line-green.svg'}
                alt={'line'}
                width={40}
                height={40}
            />
            <div className={styles.location_box}>
                <Image
                    src={'/icons/flag-green.svg'}
                    alt={'flag'}
                    width={40}
                    height={40}
                    className={styles.location_image}
                />
                <div className={styles.text_box}>
                    <p className={styles.location_title}>Dropoff</p>
                    <p className={styles.location_value}>{dropoffLocation}</p>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;