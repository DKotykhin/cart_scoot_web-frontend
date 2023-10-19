import React from 'react';

import Image from "next/image";

import styles from './statisticBox.module.scss';

interface IStatisticBox {
    statisticData?: {
        totalDrivers: number,
        totalRiders: number,
        totalTrips: number,
    }
}

const StatisticBox: React.FC<IStatisticBox> = async ({ statisticData }) => {

    return (
        <div className={styles.statistic_wrapper}>
            <div className={`${styles.statistic_box} ${styles.blue_back}`}>
                <Image
                    src={'/avatars/driver-card.svg'}
                    alt={'card'}
                    width={64}
                    height={64}
                />
                <p className={styles.statistic_amount}>{statisticData?.totalDrivers}</p>
                <p className={styles.statistic_text}>Total Drivers</p>
            </div>
            <div className={`${styles.statistic_box} ${styles.green_back}`}>
                <Image
                    src={'/avatars/rider-card.svg'}
                    alt={'card'}
                    width={64}
                    height={64}
                />
                <p className={styles.statistic_amount}>{statisticData?.totalRiders}</p>
                <p className={styles.statistic_text}>Total Riders</p>
            </div>
            <div className={`${styles.statistic_box} ${styles.orange_back}`}>
                <Image
                    src={'/avatars/trip-card.svg'}
                    alt={'card'}
                    width={64}
                    height={64}
                />
                <p className={styles.statistic_amount}>{statisticData?.totalTrips}</p>
                <p className={styles.statistic_text}>Total Trips</p>
            </div>
        </div>
    );
};

export default StatisticBox;