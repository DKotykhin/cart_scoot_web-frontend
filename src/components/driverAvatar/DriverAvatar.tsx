import React from 'react';

import Image from "next/image";

import { avatarLetters } from 'utils/avatarLetters';

import styles from './driverAvatar.module.scss';

interface IDriverAvatar {
    driverAvatarURL?: string;
    driverName?: string;
    bigName?: boolean;
    hideName?: boolean;
    reviewName?: boolean;
}

const DriverAvatar: React.FC<IDriverAvatar> = ({ driverAvatarURL, driverName, bigName, hideName, reviewName }) => {
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
            {hideName ? null :
                <span
                    className={bigName ? styles.driver_bigName : reviewName ? styles.review_name : styles.driver_name}>
                    {driverName || "CartScootWeb Driver"}
                </span>
            }
        </div>
    );
};

export default DriverAvatar;