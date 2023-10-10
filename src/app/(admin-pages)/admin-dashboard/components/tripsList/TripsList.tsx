import React from 'react';

import Image from "next/image";

import TripsTable from '../tripsTable/TripsTable';
import { IRequest } from 'types/requestTypes';

import styles from './tripsList.module.scss';
import EmptyList from 'components/emptyList/EmptyList';

const TripsList: React.FC<{ requests?: [IRequest] }> = ({ requests }) => {

    return (
        <div className={styles.trips_list}>
            <p className={styles.trips_list_title}>Recent Trips</p>
            {requests?.length ?
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