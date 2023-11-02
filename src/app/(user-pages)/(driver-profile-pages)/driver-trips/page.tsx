import React from 'react';

import TripsPanel from './components/tripsPanel/TripsPanel';

import styles from './trips.module.scss';

const DriverTripsPage = () => {

    return (
        <div className={styles.wrapper}>
            <TripsPanel />
        </div>
    );
};

export default DriverTripsPage;