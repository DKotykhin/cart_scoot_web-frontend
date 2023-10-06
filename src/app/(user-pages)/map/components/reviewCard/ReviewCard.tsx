import React from 'react';

import Image from "next/image";

import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { IReview } from 'types/reviewTypes';

import styles from './reviewCard.module.scss';

const ReviewCard: React.FC<{ reviewData: IReview }> = ({ reviewData }) => {

    return (
        <div className={styles.container}>
            <div className={styles.user_box}>
                <DriverAvatar
                    driverAvatarURL={reviewData.createdBy?.avatarURL || ""}
                    driverName={reviewData.createdBy?.userName}
                    reviewName={true}
                />
                <Image
                    src={'/icons/star-green.svg'}
                    alt={'star'}
                    width={20}
                    height={20}
                />
                <p className={styles.rating}>{reviewData?.rating}</p>
            </div>
            <div className={styles.text}>
                <p>{reviewData?.text}</p>
            </div>
        </div>
    );
};

export default ReviewCard;