import React from 'react';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminTrips.module.scss';

const AdminTripsPage = async () => {

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Trips' amount={10} />

        </div>
    );
};

export default AdminTripsPage;