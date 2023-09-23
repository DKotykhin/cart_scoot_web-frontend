import React from 'react';

import Image from "next/image";

import styles from './driverAvatarGreen.module.scss';

interface IDriverAvatar {
    driverAvatarURL: string;
    driverName: string;
    hideName?: boolean;
}

const avatarLetters = (name: string) => {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
        const letters = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return letters.toUpperCase();
    } else return nameArray[0].charAt(0).toUpperCase();
};

const DriverAvatarGreen: React.FC<IDriverAvatar> = ({ driverAvatarURL, driverName, hideName }) => {
    return (
        <div className={hideName ? styles.driver_box : `${styles.driver_box} ${styles.driver_green_box}`}>
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
                    className={styles.driver_bigName}>
                    {driverName || "CartScootWeb Driver"}
                </span>
            }
        </div>
    );
};

export default DriverAvatarGreen;