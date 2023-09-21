import React from 'react';

import Image from "next/image";

import styles from './driverAvatar.module.scss';

interface IDriverAvatar {
    driverAvatarURL: string;
    driverName: string;
    bigName?: boolean;
    hideName?: boolean;
    reviewName?: boolean;
}

const avatarLetters = (name: string) => {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
        const letters = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return letters.toUpperCase();
    } else return nameArray[0].charAt(0).toUpperCase();
};

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