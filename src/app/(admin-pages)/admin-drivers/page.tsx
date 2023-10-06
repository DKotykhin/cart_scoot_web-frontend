import React from 'react';

import { getAllDrivers } from 'apollo/services/getAllDrivers';

import TitleWithAmount from 'components/titleWithAmount/TitleWithAmount';

import styles from './adminDrivers.module.scss';

const AdminDriversPage = async () => {

    const data = await getAllDrivers();

    return (
        <div className={styles.wrapper}>
            <TitleWithAmount title='Drivers' amount={data?.getAllDrivers.length} />

        </div>
    );
};

export default AdminDriversPage;