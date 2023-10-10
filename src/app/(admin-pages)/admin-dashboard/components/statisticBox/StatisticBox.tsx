import React from 'react';

import Image from "next/image";

import { getAllDrivers } from 'apollo/services/getAllDrivers';
import { getAllRiders } from 'apollo/services/getAllRiders';

import styles from './statisticBox.module.scss';

const StatisticBox: React.FC<{totalCount?: number}> = async ({totalCount}) => {

    const driverData = await getAllDrivers();
    const riderData = await getAllRiders();

    return (
        <div className={styles.statistic_wrapper}>
            <div className={`${styles.statistic_box} ${styles.blue_back}`}>
                <Image
                    src={'/avatars/driver-card.svg'}
                    alt={'card'}
                    width={64}
                    height={64}
                />
                <p className={styles.statistic_amount}>{driverData?.getAllDrivers.totalCount}</p>
                <p className={styles.statistic_text}>Total Drivers</p>
            </div>
            <div className={`${styles.statistic_box} ${styles.green_back}`}>
                <Image
                    src={'/avatars/rider-card.svg'}
                    alt={'card'}
                    width={64}
                    height={64}
                />
                <p className={styles.statistic_amount}>{riderData?.getAllRiders.totalCount}</p>
                <p className={styles.statistic_text}>Total Riders</p>
            </div>
            <div className={`${styles.statistic_box} ${styles.orange_back}`}>
                <Image
                    src={'/avatars/trip-card.svg'}
                    alt={'card'}
                    width={64}
                    height={64}
                />
                <p className={styles.statistic_amount}>{totalCount}</p>
                <p className={styles.statistic_text}>Total Trips</p>
            </div>
        </div>
    );
};

export default StatisticBox;