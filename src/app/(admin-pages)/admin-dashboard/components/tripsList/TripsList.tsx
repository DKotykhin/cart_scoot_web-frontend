import React from 'react';

import EmptyList from 'components/emptyList/EmptyList';
import TripsTable from '../tripsTable/TripsTable';

import styles from './tripsList.module.scss';

const TripsList: React.FC<{ totalTrips?: number }> = ({ totalTrips }) => {

    return (
        <div className={styles.trips_list}>
            <p className={styles.trips_list_title}>Recent Trips</p>
            {totalTrips ?
                <TripsTable />
                :
                <EmptyList
                    title='Trips List is Empty!'
                    subtitle='You didn&apos;t get any trip yet.'
                />
            }
        </div>
    );
};

export default TripsList;