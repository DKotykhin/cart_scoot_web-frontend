"use client";

import React, { useState } from 'react';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_ADVERTISEMENTS } from 'apollo/queries/admin';

import LoadMoreButton from 'components/loadMoreButton/LoadMoreButton';
import AdsTable from '../adsTable/AdsTable';
import { IAdvertisement } from 'types/advertisementTypes';

import styles from './adsPanel.module.scss';

const AdsPanel = () => {

    const [page, setPage] = useState(1);

    const router = useRouter();

    const { data }: { data: { getAllAdvertisements: { advertisements: IAdvertisement[], totalCount: number } } } = useSuspenseQuery(GET_ALL_ADVERTISEMENTS, {
        variables: {
            pageNumber: page,
        }
    });

    const loadMoreClick = () => setPage(page + 1);

    return (
        <div className={styles.ads_panel}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>Advertisement</h2>
                <div className={styles.amount_box}>
                    <div className={styles.amount}>
                        {data?.getAllAdvertisements.totalCount || 0}
                    </div>
                </div>
                <button onClick={() => router.push('/admin-advertisement/add')}>
                    <Image
                        src={'/icons/plus.svg'}
                        alt={'plus'}
                        width={24}
                        height={24}
                    />
                    <span>New Advertisement</span>
                </button>
            </div>
            <div className={styles.table_box}>
                <AdsTable ads={data?.getAllAdvertisements.advertisements} />
            </div>
            {(data?.getAllAdvertisements.totalCount > 6 && data?.getAllAdvertisements.totalCount !== data?.getAllAdvertisements.advertisements.length) &&
                <LoadMoreButton loadMoreClick={loadMoreClick} />}
        </div>
    );
};

export default AdsPanel;