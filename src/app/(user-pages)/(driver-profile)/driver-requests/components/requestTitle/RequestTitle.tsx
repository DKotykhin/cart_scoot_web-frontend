"use client";

import React from 'react';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_PENDING_REQUESTS_BY_DRIVER } from 'apollo/queries/request';

import { IRequestWithRiderPopulatedFields } from 'types/requestTypes';

import styles from './requestTitle.module.scss';

const RequestTitle = () => {

    const { data }: { data: { getPendingRequestsByDriver: [IRequestWithRiderPopulatedFields] } } = useSuspenseQuery(GET_PENDING_REQUESTS_BY_DRIVER);

    return (
        <div className={styles.title_box}>
            <h2 className={styles.title}>Requests</h2>
            <div className={styles.amount}>{data.getPendingRequestsByDriver.length || 0}</div>
        </div>
    );
};

export default RequestTitle;