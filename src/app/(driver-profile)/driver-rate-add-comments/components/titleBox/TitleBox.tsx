"use client";

import React from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_REVIEWS_BY_DRIVER_ID } from 'apollo/queries/review';

import StarsBox from 'app/(driver-profile)/components/starsBox/StarsBox';

import { IReview } from 'types/reviewTypes';
import { IUser } from 'types/userTypes';

import styles from './titleBox.module.scss';

const TitleBox: React.FC<{ user?: IUser }> = ({ user }) => {

    const { data }: { data: { getReviewsByDriverId: [IReview] } } = useSuspenseQuery(GET_REVIEWS_BY_DRIVER_ID, {
        variables: {
            getReviewsByDriverIdInput: {
                driverId: user?._id,
            }
        }
    });

    return (
        <div className={styles.title_container}>
            <div className={styles.title_box}>
                <h2 className={styles.profile_title}>Rate & comments</h2>
                <div className={styles.review_amount}>{data?.getReviewsByDriverId.filter(item => Boolean(item.text)).length}</div>
            </div>
            <StarsBox />
        </div>
    );
};

export default TitleBox;