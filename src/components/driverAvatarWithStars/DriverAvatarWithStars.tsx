import React from 'react';

import Image from "next/image";

import StarsArray from 'components/starsArray/StarsArray';
import { avatarLetters } from 'utils/avatarLetters';

import styles from './driverAvatarWithStars.module.scss';

interface IDriverAvatar {
    driverAvatarURL?: string;
    driverName?: string;
    bigName?: boolean;
    reviewName?: boolean;
    rating?: number;
}

const DriverAvatarWithStars: React.FC<IDriverAvatar> = ({ driverAvatarURL, driverName, bigName, reviewName, rating }) => {
    return (
        <div className={styles.driver_box}>
            {driverAvatarURL ?
                <Image
                    src={driverAvatarURL}
                    alt={'avatar'}
                    width={48}
                    height={48}
                />
                :
                <div className={styles.empty_avatar}>
                    {avatarLetters(driverName || 'C S')}
                </div>
            }
            <div className={styles.name_box}>
                <span
                    className={bigName ? styles.driver_bigName : reviewName ? styles.review_name : styles.driver_name}>
                    {driverName || "CartScootWeb Driver"}
                </span>
                <StarsArray rating={rating} />
            </div>
        </div>
    );
};

export default DriverAvatarWithStars;