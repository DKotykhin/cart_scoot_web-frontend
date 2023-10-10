import React from 'react';

import { getAllRequests } from 'apollo/services/getAllRequests';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminTrips.module.scss';

const AdminTripsPage = async () => {

    const data = await getAllRequests();

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Trips' amount={data?.getAllRequests.totalCount} />

        </div>
    );
};

export default AdminTripsPage;