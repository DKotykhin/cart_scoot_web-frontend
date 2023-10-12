import React from 'react';

import Image from "next/image";
import { avatarLetters } from 'utils/avatarLetters';

import styles from './driverAvatarGreen.module.scss';

interface IDriverAvatar {
    driverAvatarURL?: string;
    driverName?: string;
    hideName?: boolean;
}

const DriverAvatarGreen: React.FC<IDriverAvatar> = ({ driverAvatarURL, driverName, hideName }) => {
    return (
        <div className={hideName ? styles.driver_box : `${styles.driver_box} ${styles.driver_green_box}`}>
            {driverAvatarURL ?
                <Image
                    src={driverAvatarURL}
                    alt={'avatar'}
                    width={48}
                    height={48}
                    loader={({ src, width: w, quality }) => {
                        const q = quality || 75;
                        return `${src}?w=${w}&q=${q}`;
                    }}
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