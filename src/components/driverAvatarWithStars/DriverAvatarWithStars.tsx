import React from 'react';

import Image from "next/image";

import { avatarLetters } from 'utils/avatarLetters';

import styles from './driverAvatarWithStars.module.scss';

interface IDriverAvatar {
    driverAvatarURL?: string;
    driverName?: string;
    bigName?: boolean;
    reviewName?: boolean;
    rating?: number;
}

const starArray = [1, 2, 3, 4, 5];

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
                <div className={styles.star_box}>
                    {starArray.map(star => (
                        <div key={star}>
                            {Math.round(rating || 0) >= star ?
                                <Image
                                    src={'/icons/star-green.svg'}
                                    alt={'star'}
                                    width={20}
                                    height={20}
                                /> :
                                <Image
                                    src={'/icons/star-empty.svg'}
                                    alt={'star'}
                                    width={20}
                                    height={20}
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DriverAvatarWithStars;