"use client";

import React from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ADVERTISEMENT_BY_ID } from 'apollo/queries/admin';

import TitleWithBackButton from 'components/titleWithBackButton/TitleWithBackButton';
import { IAdvertisement } from 'types/advertisementTypes';

import styles from './adsDetail.module.scss';

const AdsDetail: React.FC<{ _id: string }> = ({ _id }) => {

    const { data }: { data: { getAdvertisementById: IAdvertisement } } = useSuspenseQuery(GET_ADVERTISEMENT_BY_ID, {
        variables: {
            adsId: _id,
        }
    });

    return (
        <div className={styles.ads_detail_container}>
            <TitleWithBackButton title='Back to Advertisements' pageURL='/admin-advertisement' />
            <div className={styles.ads_detail}>
                Advertisement Details
            </div>
        </div>
    );
};

export default AdsDetail;