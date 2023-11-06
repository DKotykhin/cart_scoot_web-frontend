import React from 'react';

import { format } from 'date-fns';

import StarsBox from 'components/starsBox/StarsBox';
import DriverAvatar from 'components/driverAvatar/DriverAvatar';

import { IReview } from 'types/reviewTypes';

import styles from './reviewMobile.module.scss';

const ReviewMobile: React.FC<{ review?: IReview }> = ({ review }) => {
    return (
        <div className={styles.mobile_container}>
            <div className={styles.avatar_box}>
                <DriverAvatar
                    driverAvatarURL={review?.createdBy?.avatarURL}
                    hideName={true}
                />
                <div className={styles.avatar_text}>
                    <p>{review?.createdBy.userName}</p>
                    <p>Request Code: {review?.requestCode}</p>
                </div>
                <div className={styles.review_tablet_view}>
                    <StarsBox rating={review?.rating} />
                </div>
            </div>
            <div className={styles.review_line} />
            <div className={styles.review_date}>
                {review ? format(new Date(review.createdAt), "d LLL h:mm a") : ''}
            </div>
            <div className={styles.review_text}>
                {review?.text}
            </div>
            <div className={styles.review_mobile_view}>
                <StarsBox rating={review?.rating} />
            </div>
        </div>
    );
};

export default ReviewMobile;